#!/usr/bin/env python3
"""Rebuilds the DATA line inside originle-companion.user.js.

Sources (nothing here is hand-written):
  - Unicode CLDR (pinned version below): which languages each country speaks, the share of the population,
    and official status (territoryInfo.json); ISO 639-1 -> 639-3 codes (aliases.json, "overlong" entries).
  - originle.io's own game script (hush/hush.js): the list of guessable countries and the names its world map uses,
    so the companion map matches the game's map exactly.

Usage: python3 tools/build_companion_data.py
"""
import json
import re
import urllib.request
from pathlib import Path

CLDR = '49.0.0'
BASE = f'https://raw.githubusercontent.com/unicode-org/cldr-json/{CLDR}/cldr-json/cldr-core/supplemental/'
GAME = 'https://originle.io/hush/hush.js'
SCRIPT = Path(__file__).resolve().parent.parent / 'originle-companion.user.js'
STATUS = {'official': 'o', 'de_facto_official': 'o', 'official_regional': 'r'}


def get(url):
    with urllib.request.urlopen(url, timeout=60) as r:
        return r.read().decode('utf-8')


def literal_pairs(text):
    # 'Key':'XX' / "Key":'XX' / Key:'XX' / 'Key':null, as written in the game's object literals
    pairs = re.findall(r"""(?:'([^']+)'|"([^"]+)"|([A-Za-z]+))\s*:\s*(?:'([A-Z]{2})'|(null))""", text)
    return {a or b or c: (d or None) for a, b, c, d, _ in pairs}


def main():
    territories = json.loads(get(BASE + 'territoryInfo.json'))['supplemental']['territoryInfo']
    aliases = json.loads(get(BASE + 'aliases.json'))['supplemental']['metadata']['alias']['languageAlias']
    game = get(GAME)

    codes = re.search(r"const codes='([^']+)'", game).group(1).split()
    fixed = {k: v for k, v in re.findall(r"([A-Z]{2}):'([^']+)'", re.search(r"const fixed=\{([^}]*)\}", game).group(1))}
    feature_aliases = literal_pairs(re.search(r"const featureAliases=\{([^}]*)\}", game).group(1))
    feature_aliases.update(literal_pairs(re.search(r"Object\.assign\(featureAliases,\{([^}]*)\}\)", game).group(1)))

    langs = {}
    for code in codes:
        rows = []
        for lang, info in territories.get(code, {}).get('languagePopulation', {}).items():
            pct = float(info.get('_populationPercent', 0))
            rows.append([lang, round(pct, 3), STATUS.get(info.get('_officialStatus'), '')])
        rows.sort(key=lambda r: -r[1])
        langs[code] = rows

    iso3 = {v['_replacement']: k for k, v in aliases.items()
            if v.get('_reason') == 'overlong' and len(k) == 3 and len(v['_replacement']) == 2}

    data = {'cldr': CLDR, 'codes': codes, 'fixed': fixed, 'featureAliases': feature_aliases,
            'langs': langs, 'iso3': iso3}
    line = 'const DATA = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';'
    src = SCRIPT.read_text(encoding='utf-8')
    src, n = re.subn(r'^const DATA = .*;$', lambda _: line, src, count=1, flags=re.M)
    if n != 1:
        raise SystemExit('DATA line not found in ' + str(SCRIPT))
    SCRIPT.write_text(src, encoding='utf-8')
    print(f'{len(codes)} countries, {sum(map(len, langs.values()))} language rows, {len(iso3)} ISO 639-3 codes')


if __name__ == '__main__':
    main()
