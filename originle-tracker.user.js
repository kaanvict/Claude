// ==UserScript==
// @name         Originle Tracker
// @namespace    https://github.com/kaanvict/claude
// @version      1.2
// @updateURL    https://raw.githubusercontent.com/kaanvict/Claude/claude/happy-mayer-inem0z/originle-tracker.user.js
// @downloadURL  https://raw.githubusercontent.com/kaanvict/Claude/claude/happy-mayer-inem0z/originle-tracker.user.js
// @description  Records your Originle daily results and shows them in a pull-out panel on the site.
// @match        https://originle.io/*
// @match        https://www.originle.io/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  'use strict';

  // The game already saves each finished puzzle in localStorage under this prefix.
  // We copy those results into Tampermonkey's own storage so they survive clearing site data.
  const PREFIX = 'originle:daily:v1:';
  const STORE = 'history';
  const DAY = 86400000;
  const sched = unsafeWindow.ORIGINLE_SCHEDULE;

  const numberOf = id => (sched && Array.isArray(sched.puzzles) ? sched.puzzles.indexOf(id) + 1 : 0);
  const dateOf = n => new Date(Date.parse(sched.launchDate + 'T00:00:00Z') + (n - 1) * DAY).toISOString().slice(0, 10);

  function scan() {
    const history = GM_getValue(STORE, {});
    let changed = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      const id = key.slice(PREFIX.length);
      let result;
      try { result = JSON.parse(localStorage.getItem(key)).result; } catch { continue; }
      if (!result) continue;
      const score = Number.isInteger(result.score) ? result.score : null;
      if (history[id] && (history[id].score !== null || score === null)) continue;
      const guesses = Array.isArray(result.guesses) ? result.guesses : [{country: result.country}];
      const n = numberOf(id);
      history[id] = {
        id, n, date: n ? dateOf(n) : null,
        correct: !!result.correct, gaveUp: !!result.gaveUp, score, hints: result.hints,
        marks: guesses.map((g, j) => (result.correct && j === guesses.length - 1 ? '🟩' : '🟥')).join('') + (result.gaveUp ? '🏳️' : ''),
        countries: guesses.map(g => g.country)
      };
      changed = true;
    }
    if (changed) GM_setValue(STORE, history);
    return changed;
  }

  // The answer country is only in each guest's day.js, so fetch it, but only for puzzles you have finished.
  const tried = new Set();
  async function fillAnswers() {
    const missing = Object.values(GM_getValue(STORE, {})).filter(e => !e.answer && !tried.has(e.id));
    for (const e of missing) {
      tried.add(e.id);
      let answer = null;
      try {
        const day = unsafeWindow.ORIGINLE_DAY, here = unsafeWindow.ORIGINLE_DAILY;
        if (day && here && here.id === e.id && day.country) answer = day.country;
        else {
          const text = await (await fetch(`/${e.id}/day.js`)).text();
          answer = (text.match(/"country"\s*:\s*"([^"]+)"/) || [])[1] || null;
        }
      } catch { /* retry on next page load */ }
      if (!answer) continue;
      const history = GM_getValue(STORE, {});
      if (history[e.id]) { history[e.id].answer = answer; GM_setValue(STORE, history); }
    }
  }

  // Add the answer to finished rows on the Archive page (unfinished rows are left alone: no spoilers).
  function decorateArchive() {
    const history = GM_getValue(STORE, {});
    for (const link of document.querySelectorAll('ol.daily-archive li a')) {
      const entry = history[new URL(link.href).pathname.split('/')[1]];
      const status = link.querySelector('.archive-status');
      if (entry && entry.answer && status && !status.dataset.answer) {
        status.dataset.answer = '1';
        status.textContent += ' · ' + entry.answer;
      }
    }
  }

  function stats(entries) {
    const scored = entries.filter(e => e.score !== null);
    const solved = new Set(entries.filter(e => e.correct && e.n).map(e => e.n));
    const today = unsafeWindow.ORIGINLE_DAILY ? unsafeWindow.ORIGINLE_DAILY.today : 0;
    let current = 0;
    for (let n = solved.has(today) ? today : today - 1; solved.has(n); n--) current++;
    let best = 0, run = 0;
    for (const n of [...solved].sort((a, b) => a - b)) { run = solved.has(n - 1) ? run + 1 : 1; best = Math.max(best, run); }
    return [
      ['Played', entries.length],
      ['Solved', entries.filter(e => e.correct).length],
      ['Avg score', scored.length ? Math.round(scored.reduce((s, e) => s + e.score, 0) / scored.length).toLocaleString() : '–'],
      ['Best score', scored.length ? Math.max(...scored.map(e => e.score)).toLocaleString() : '–'],
      ['Streak', current],
      ['Best streak', best]
    ];
  }

  // --- UI: a shadow-DOM host on <html>, so the game's CSS and body swaps can't touch it ---
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const host = el('div');
  const root = host.attachShadow({mode: 'open'});
  const style = el('style');
  style.textContent = `
    :host { all: initial; position: fixed; left: 0; bottom: 16px; z-index: 2147483647; font: 13px/1.4 system-ui, sans-serif; color: #262a2b; }
    button { font: inherit; cursor: pointer; }
    .tab { background: #262a2b; color: #fff; border: 0; padding: 8px 12px; border-radius: 0 10px 10px 0; box-shadow: 0 2px 8px #0004; }
    .panel { position: absolute; left: 0; bottom: 40px; width: min(340px, 92vw); max-height: 70vh; overflow: auto; background: #f6f6f6; border: 1px solid #0003; border-radius: 0 12px 12px 0; box-shadow: 0 6px 24px #0005; padding: 12px; }
    .panel[hidden] { display: none; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 10px; }
    .grid div { background: #fff; border-radius: 8px; padding: 6px; text-align: center; }
    .grid b { display: block; font-size: 16px; }
    .grid span { font-size: 11px; color: #666; }
    .row { display: grid; grid-template-columns: 42px 1fr auto; gap: 2px 8px; padding: 6px 0; border-top: 1px solid #0001; }
    .row .score { font-weight: 600; text-align: right; }
    .row .sub { grid-column: 2 / 4; color: #666; font-size: 11px; }
    .empty { color: #666; padding: 8px 0; }
    .copy { margin-top: 10px; background: none; border: 1px solid #0003; border-radius: 6px; padding: 4px 8px; }
  `;
  const tab = el('button', 'tab', 'Originle ▸');
  const panel = el('div', 'panel');
  panel.hidden = true;
  root.append(style, panel, tab);

  function render() {
    const history = GM_getValue(STORE, {});
    const entries = Object.values(history).sort((a, b) => (b.n || 0) - (a.n || 0));
    const grid = el('div', 'grid');
    for (const [label, value] of stats(entries)) {
      const cell = el('div');
      cell.append(el('b', '', String(value)), el('span', '', label));
      grid.append(cell);
    }
    const rows = entries.map(e => {
      const row = el('div', 'row');
      const name = e.id.charAt(0).toUpperCase() + e.id.slice(1);
      row.append(
        el('span', '', e.n ? '#' + String(e.n).padStart(3, '0') : '#?'),
        el('span', '', `${name}${e.answer ? ' → ' + e.answer : ''}${e.date ? ' · ' + e.date : ''}`),
        el('span', 'score', e.score === null ? '–' : e.score.toLocaleString()),
        el('span', 'sub', `${e.marks} · ${e.hints}/8 clues · ${e.correct ? 'solved' : e.gaveUp ? 'gave up' : 'missed'} · ${e.countries.join(', ')}`)
      );
      return row;
    });
    const copy = el('button', 'copy', 'Copy JSON');
    copy.onclick = () => navigator.clipboard.writeText(JSON.stringify(history, null, 2)).then(() => { copy.textContent = 'Copied'; });
    panel.replaceChildren(grid, ...(rows.length ? rows : [el('div', 'empty', 'No finished puzzles recorded yet.')]), copy);
  }

  tab.onclick = () => {
    panel.hidden = !panel.hidden;
    tab.textContent = panel.hidden ? 'Originle ▸' : 'Originle ◂';
    if (!panel.hidden) render();
  };

  document.documentElement.append(host);
  const refresh = () => {
    const changed = scan();
    fillAnswers().then(() => { if (!panel.hidden) render(); decorateArchive(); });
    if (changed && !panel.hidden) render();
    decorateArchive();
  };
  refresh();
  setInterval(refresh, 2000);
  window.addEventListener('storage', refresh);
})();
