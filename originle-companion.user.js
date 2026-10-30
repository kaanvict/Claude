// ==UserScript==
// @name         Originle Companion
// @namespace    https://github.com/kaanvict/claude
// @version      1.3.1
// @updateURL    https://raw.githubusercontent.com/kaanvict/Claude/claude/happy-mayer-inem0z/originle-companion.user.js
// @downloadURL  https://raw.githubusercontent.com/kaanvict/Claude/claude/happy-mayer-inem0z/originle-companion.user.js
// @description  Tracker, language map, deduction board and listening tools for Originle. Each feature has its own on/off switch in the Tampermonkey menu.
// @match        https://originle.io/*
// @match        https://www.originle.io/*
// @run-at       document-idle
// @sandbox      JavaScript
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  'use strict';

  // Language data: built by tools/build_companion_data.py from Unicode CLDR and the game's own country list.
const DATA = {"cldr":"49.0.0","glottolog":"v5.3","points":{"vls":[51.075,3.113,"vlaa1240","Western Flemish"],"bug":[-4.47,119.977,"bugi1244","Buginese"],"kam":[-1.608,37.953,"kamb1297","Kamba (Kenya)"],"pcm":[9.659,4.211,"nige1257","Nigerian Pidgin"],"qug":[-1.367,-78.852,"chim1302","Bolivar-North Chimborazo Highland Quichua"],"fi":[64.763,25.558,"finn1318","Finnish"],"leb":[-12.945,30.23,"lala1264","Lala-Bisa"],"ars":[30.337,42.177,"najd1235","Najdi Arabic"],"gan":[27.99,115.166,"ganc1239","Gan Chinese"],"fuv":[10.997,11.119,"nige1253","Hausa States Fulfulde"],"crh":[45.0,34.08,"crim1257","Crimean Tatar"],"fit":[67.253,23.066,"torn1244","Meänkieli"],"hy":[40.0,45.0,"nucl1235","Eastern Armenian"],"jgo":[5.631,10.237,"ngom1272","Ngomba"],"gbm":[30.506,78.72,"garh1243","Garhwali"],"pa":[30.037,75.67,"panj1256","Eastern Panjabi"],"dgr":[63.17,-117.25,"dogr1252","Dogrib"],"ria":[23.68,92.032,"rian1262","Riang (India)"],"pcd":[50.283,3.251,"pica1241","Picard"],"uli":[9.961,139.604,"ulit1238","Ulithian"],"prd":[32.994,58.624,"pars1252","Parsi-Dari"],"bvb":[3.536,8.689,"bube1242","Bube"],"mfv":[12.829,-15.922,"mand1419","Mandjak"],"kiu":[39.164,39.4,"kirm1248","Kirmanjki"],"pnt":[41.266,36.097,"pont1253","Pontic"],"cho":[32.25,-88.5,"choc1276","Choctaw"],"tdd":[21.784,99.722,"tain1252","Tai Nüa"],"myv":[52.855,45.39,"erzy1239","Erzya"],"ig":[4.627,7.234,"nucl1417","Igbo"],"lad":[41.205,28.663,"ladi1251","Ladino"],"lo":[19.0,102.46,"laoo1244","Lao"],"bfq":[11.309,76.597,"bada1257","Badaga"],"unx":[25.039,87.179,"mund1321","Munda"],"lep":[27.087,88.573,"lepc1244","Lepcha"],"cs":[49.873,15.104,"czec1258","Czech"],"pnt_Latn":[41.266,36.097,"pont1253","Pontic"],"de":[48.649,12.468,"stan1295","German"],"bfd":[6.142,10.119,"bafu1246","Bafut"],"bjj":[27.107,79.288,"kana1281","Kanauji"],"dz":[27.411,89.582,"dzon1239","Dzongkha"],"ttj":[0.573,30.639,"toor1238","Tooro"],"hil":[10.402,122.974,"hili1240","Hiligaynon"],"guz":[-0.789,34.768,"gusi1247","Gusii"],"thl":[27.883,81.776,"dang1260","Dangaura Tharu"],"to":[-21.17,-175.25,"tong1325","Tonga (Tonga Islands)"],"saq":[1.607,37.054,"samb1315","Samburu"],"nzi":[5.178,-2.811,"nzim1238","Nzima"],"fuq":[15.091,8.433,"cent2018","Central-Eastern Niger Fulfulde"],"kea":[15.059,-23.615,"kabu1256","Kabuverdianu"],"cpx":[25.37,118.68,"puxi1243","Pu-Xian Chinese"],"sly":[-6.101,120.496,"sela1260","Selayar"],"dak":[45.86,-96.58,"dako1258","Dakota"],"yrl":[1.045,-66.965,"nhen1239","Nhengatu"],"vai_Latn":[7.051,-11.326,"vaii1241","Vai"],"abr":[7.721,-2.503,"abro1238","Abron"],"mgy":[-8.197,36.536,"mbun1248","Mbunga"],"ken":[5.583,9.559,"keny1279","Kenyang"],"tg_Arab":[38.821,68.555,"taji1245","Tajik"],"sma":[62.88,13.701,"sout2674","South Saami"],"lb":[49.684,6.149,"luxe1241","Moselle Franconian"],"zag":[17.484,23.463,"zagh1240","Beria"],"gaa":[5.655,-0.186,"gaaa1244","Ga"],"ru":[59.0,50.0,"russ1263","Russian"],"krl":[65.169,30.866,"kare1335","Karelian"],"bew":[-6.212,107.022,"beta1252","Betawi"],"hrx":[-29.326,-51.722,"riog1239","Hunsrik"],"kxv":[18.883,83.755,"kuvi1243","Kuvi"],"fo":[62.073,-6.885,"faro1244","Faroese"],"trv":[23.903,121.358,"taro1264","Seediq"],"teo":[1.183,33.939,"teso1249","Teso"],"rm":[46.554,9.928,"roma1326","Romansh"],"arn":[-38.739,-71.277,"mapu1245","Mapudungun"],"rug":[-8.205,157.408,"rovi1238","Roviana"],"khn":[21.318,74.142,"khan1272","Khandesi"],"nan":[24.5,118.17,"minn1241","Min Nan Chinese"],"bm_Nkoo":[12.9,-7.65,"bamb1269","Bambara"],"bin":[6.407,5.704,"bini1246","Bini"],"bap":[27.121,87.047,"bant1281","Bantawa"],"nhe":[21.064,-97.908,"east2538","Eastern Huasteca Nahuatl"],"nl":[52.0,5.0,"dutc1256","Dutch"],"pl":[51.844,18.625,"poli1260","Polish"],"my":[20.793,93.966,"nucl1310","Burmese"],"lua":[-5.727,22.442,"luba1249","Luba-Lulua"],"sid":[6.742,38.373,"sida1246","Sidamo"],"lis":[26.91,98.94,"lisu1250","Lisu"],"fr":[48.0,2.0,"stan1290","French"],"gju":[33.7,75.11,"guja1253","Gujari"],"lkt":[46.37,-103.95,"lako1247","Lakota"],"lv":[56.826,24.309,"latv1249","Latvian"],"ckz":[14.647,-90.699,"cakc1235","Kakchikel-K'iche' Mixed Language"],"laj":[2.139,33.055,"lang1324","Lango (Uganda)"],"gl":[42.245,-7.534,"gali1258","Galician"],"af":[-31.633,20.464,"afri1274","Afrikaans"],"gwi":[67.431,-142.963,"gwic1235","Gwich'in"],"mus":[31.0,-87.5,"cree1270","Creek"],"tdg":[28.024,85.056,"west2415","Western Tamang"],"sa":[20.0,77.0,"sans1269","Sanskrit"],"mic":[46.0,-64.0,"mikm1235","Mi'kmaq"],"mca":[-25.012,-57.369,"maca1260","Maká"],"ilo":[15.936,120.993,"ilok1237","Iloko"],"bhi":[22.583,74.59,"bhil1253","Bhilali"],"thr":[28.648,80.442,"rana1246","Rana Tharu"],"zdj":[-11.613,43.36,"ngaz1238","Ngazidja Comorian"],"br":[48.245,-3.789,"bret1244","Breton"],"hsn":[27.668,111.471,"xian1251","Xiang Chinese"],"smn":[69.423,27.866,"inar1241","Inari Saami"],"srn":[5.83,-55.33,"sran1240","Sranan Tongo"],"ttc":[15.46,-92.114,"tekt1235","Tektiteko"],"puu":[-2.674,11.671,"punu1239","Punu"],"lg":[0.669,32.152,"gand1255","Ganda"],"prg":[52.394,14.757,"prus1238","Old Prussian"],"yav":[4.42,11.028,"yang1293","Nuasue"],"tzj":[14.635,-91.201,"tzut1248","Tz'utujil"],"hi_Latn":[25.0,77.0,"hind1269","Hindi"],"mai":[26.382,86.221,"mait1250","Maithili"],"kj":[-17.718,16.58,"kuan1247","Kuanyama"],"srr":[13.894,-16.392,"sere1260","Sereer"],"csw":[56.0,-95.0,"swam1239","Swampy Cree"],"zmi":[2.665,102.291,"nege1240","Negeri Sembilan Malay"],"crl":[55.193,-77.751,"nort1552","Northern East Cree"],"ban_Bali":[-8.357,115.075,"bali1278","Balinese"],"el":[38.36,23.13,"mode1248","Modern Greek"],"lld":[46.607,11.895,"ladi1250","Ladin"],"gvr":[27.417,86.29,"guru1261","Gurung"],"mey_Latn":[18.29,-14.11,"hass1238","Hassaniyya"],"kk":[51.17,71.454,"kaza1248","Kazakh"],"sxn":[3.506,125.565,"sang1336","Sangir"],"knn":[18.404,73.994,"konk1267","Konkan Marathi"],"grt":[25.295,90.462,"garo1247","Garo"],"thq":[26.725,84.63,"koch1247","Kochila Tharu"],"bra":[26.476,78.081,"braj1242","Braj"],"mi":[-38.288,176.541,"maor1246","Maori"],"aro":[-12.424,-67.729,"arao1248","Araona"],"ky_Arab":[42.0,74.0,"kirg1245","Kirghiz"],"ii":[28.195,102.121,"sich1238","Sichuan Yi"],"mxc":[-18.193,32.805,"many1258","Manyika"],"dty":[29.242,80.725,"doty1234","Dotyali"],"ha":[11.151,8.78,"haus1257","Hausa"],"knj":[15.593,-91.842,"west2635","Akateko"],"xog":[0.405,33.394,"soga1242","Soga"],"glk":[37.134,49.836,"gila1241","Gilaki"],"taj":[27.324,87.083,"east2347","Eastern Tamang"],"cag":[-22.856,-61.761,"niva1238","Nivaclé"],"lrc":[32.544,47.916,"nort2645","Northern Luri"],"rue":[48.717,22.958,"rusy1239","Rusyn"],"gmy":[37.73,22.82,"myce1241","Achaean Greek"],"blt":[18.957,102.928,"taid1247","Tai Dam"],"mwk":[13.18,-9.492,"kita1249","Kita Maninkakan"],"gjk":[24.297,69.19,"kach1272","Kachi Koli"],"cak":[14.466,-90.988,"kaqc1270","Kaqchikel"],"mdf":[54.185,42.673,"moks1248","Moksha"],"ppl":[13.893,-89.443,"pipi1250","Pipil"],"mgo":[5.889,9.874,"meta1238","Meta'"],"mgp":[27.414,87.062,"east2352","Eastern Magar"],"moh":[43.72,-74.668,"moha1258","Mohawk"],"arz":[31.0,31.0,"egyp1253","Egyptian Arabic"],"kqn":[-12.413,25.765,"kaon1241","Kaonde"],"apc":[34.171,36.047,"nort3139","Levantine Arabic"],"koi":[59.66,54.796,"komi1269","Komi-Permyak"],"frs":[52.971,8.36,"nort2628","German Northern Low Saxon"],"gun":[-26.019,-52.711,"mbya1239","Mbyá Guaraní"],"fia":[22.814,31.838,"nobi1240","Nobiin"],"vmf":[50.005,8.621,"main1267","Ostfränkisch"],"bas":[3.808,10.421,"basa1284","Basa (Cameroon)"],"iba":[2.09,112.934,"iban1264","Iban"],"cv":[55.487,47.163,"chuv1255","Chuvash"],"ur":[25.0,67.0,"urdu1245","Urdu"],"wal":[6.327,37.754,"wola1242","Wolaytta"],"kaj":[9.831,7.972,"jjuu1238","Jju"],"kvr":[-1.937,101.403,"keri1250","Kerinci"],"pms":[45.463,8.324,"piem1238","Piemontese"],"mni":[24.441,93.343,"mani1292","Manipuri"],"sck":[23.659,84.811,"sadr1248","Sadri"],"pqm":[45.494,-67.408,"male1292","Malecite-Passamaquoddy"],"la":[41.903,12.45,"lati1261","Latin"],"kck":[-21.289,27.401,"kala1384","Kalanga"],"aln":[42.317,21.384,"gheg1238","Gheg Albanian"],"tvl":[-8.521,179.198,"tuva1244","Tuvalu"],"grc":[39.816,21.913,"anci1242","Ionic-Attic Ancient Greek"],"ht":[18.795,-72.136,"hait1244","Haitian"],"mdr":[-3.347,119.068,"mand1442","Mandar"],"yua":[18.776,-88.957,"yuca1254","Yucatec Maya"],"hoj":[24.855,75.837,"hado1235","Hadothi"],"pi_Thai":[24.527,82.251,"pali1273","Pali"],"hno":[34.32,73.384,"nort2662","Northern Hindko"],"bmq":[12.382,-4.538,"bomu1247","Bomu"],"cop":[29.472,31.205,"copt1239","Coptic"],"tn":[-24.368,24.759,"tswa1253","Tswana"],"bez":[-9.267,35.036,"bena1262","Bena (Tanzania)"],"bci":[5.425,-4.766,"baou1238","Baoulé"],"izh":[59.474,29.711,"ingr1248","Ingrian"],"rmu":[62.231,14.404,"tavr1235","Tavringer Romani"],"ary":[32.5,-7.5,"moro1292","Moroccan Arabic"],"co":[41.7,9.255,"cors1241","Corsican"],"ccr":[13.744,-88.113,"caca1247","Cacaopera"],"mhn":[46.106,11.315,"moch1255","Mòcheno"],"ks":[34.167,74.33,"kash1277","Kashmiri"],"kaa":[39.98,63.322,"kara1467","Kara-Kalpak"],"stu_Tale":[22.018,99.258,"samt1238","Samtao"],"efi":[4.894,8.381,"efik1245","Efik"],"dtm":[13.633,-3.822,"tomo1243","Tomo Kan Dogon"],"ixl":[15.457,-90.894,"ixil1251","Ixil"],"wni":[-12.212,44.371,"ndzw1235","Ndzwani Comorian"],"hif":[-17.815,177.772,"fiji1242","Fiji Hindi"],"mer":[0.265,37.74,"meru1245","Meru"],"lbe":[42.133,47.081,"lakk1252","Lak"],"sk":[48.546,18.785,"slov1269","Slovak"],"ceb":[8.388,124.367,"cebu1242","Cebuano"],"tsj":[27.369,91.774,"tsha1245","Tshangla"],"vai":[7.051,-11.326,"vaii1241","Vai"],"vmw":[-14.851,38.805,"makh1264","Makhuwa"],"mag":[25.091,85.334,"maga1260","Magahi"],"lmo":[45.882,9.395,"lomb1257","Lombard"],"gsw":[47.052,8.464,"swis1247","Central Alemannic"],"loz":[-17.705,24.74,"lozi1239","Lozi"],"mtr":[24.57,73.68,"mewa1249","Mewari"],"clc":[51.99,-123.245,"chil1280","Chilcotin-Nicola"],"tsd":[37.141,22.734,"tsak1248","Tsakonian"],"jam":[18.13,-77.261,"jama1262","Jamaican Creole English"],"nod":[18.857,100.207,"nort2740","Northern Thai"],"bi":[-15.4,166.89,"bisl1239","Bislama"],"gbz":[31.816,54.447,"zoro1242","Zoroastrian Yazdi"],"rw":[-1.568,29.644,"kiny1244","Kinyarwanda"],"saf":[8.938,-2.585,"safa1243","Safaliba"],"sg":[6.786,20.17,"sang1328","Sango"],"brx":[26.1,92.0,"bodo1269","Bodo-Mech"],"kos":[5.31,162.98,"kosr1238","Kosraean"],"ta":[10.52,78.826,"tami1289","Tamil"],"pi":[24.527,82.251,"pali1273","Pali"],"os":[42.98,44.61,"iron1242","Iron Ossetian"],"gag":[44.599,28.028,"gaga1249","Gagauz"],"se":[68.725,22.111,"nort2671","North Saami"],"tbw":[9.543,118.497,"tagb1258","Tagbanwa"],"eo":[49.327,2.81,"espe1235","Esperanto"],"kde":[-10.991,39.513,"mako1251","Makonde"],"kac":[25.463,97.328,"kach1280","Southern Jinghpaw"],"kl":[69.376,-52.864,"kala1399","Kalaallisut"],"ngl":[-16.038,37.244,"lomw1241","Mozambique Lomwe"],"tkt":[28.587,80.893,"kath1250","Kathoriya Tharu"],"kdt":[14.67,104.911,"kuyy1240","Kuy"],"ca":[41.453,1.569,"stan1289","Catalan"],"szl":[50.966,16.949,"sile1253","Silesian"],"an":[42.467,-0.009,"arag1245","Aragonese"],"jut":[54.911,9.389,"juti1236","Jutish"],"pis":[-9.567,160.137,"piji1239","Pijin"],"ka":[41.85,43.786,"nucl1302","Georgian"],"mua":[9.832,14.475,"mund1325","Mundang"],"rmo":[48.7,9.4,"sint1235","Sinte-Manus Romani"],"ady":[44.0,39.33,"adyg1241","West Circassian"],"guc":[11.396,-72.2,"wayu1243","Wayuu"],"sus":[10.405,-13.363,"susu1250","Susu"],"gva":[-21.98,-58.065,"guan1268","Guaná (Paraguay)"],"xh":[-31.039,28.077,"xhos1239","Xhosa"],"ky":[42.0,74.0,"kirg1245","Kirghiz"],"lwl":[19.014,98.761,"east2330","Eastern Lawa"],"kfy":[29.562,80.017,"kuma1273","Kumaoni"],"stu":[22.018,99.258,"samt1238","Samtao"],"cic":[34.0,-88.0,"chic1270","Chickasaw"],"ace":[3.908,96.603,"achi1257","Acehnese"],"jml":[29.171,82.437,"juml1238","Jumli"],"crs":[-4.623,55.45,"sese1246","Seselwa Creole French"],"hsb":[51.24,14.41,"uppe1395","Upper Sorbian"],"twq":[16.781,6.92,"tasa1240","Tasawaq"],"ach":[3.577,32.515,"acol1236","Acoli"],"kkj":[3.8,15.628,"kako1242","Kako"],"mrj":[56.22,46.569,"west2392","Western Mari"],"sou":[6.857,99.703,"sout2746","Southern Thai"],"bo":[28.368,90.187,"tibe1272","Tibetan"],"yo":[7.153,3.672,"yoru1245","Yoruba"],"sdc":[40.748,8.393,"sass1235","Sassarese Sardinian"],"mnw":[15.494,98.122,"monn1252","Mon"],"hak":[25.0,116.0,"hakk1236","Hakka Chinese"],"mwv":[-1.411,98.94,"ment1249","Mentawai"],"noe":[22.126,76.126,"nima1243","Nimadi"],"frc":[29.687,-91.613,"caju1236","Louisiana French"],"tig":[17.349,38.223,"tigr1270","Tigre"],"rtm":[-12.501,177.066,"rotu1241","Rotuman"],"kcg":[9.756,8.308,"tyap1238","Tyap"],"ha_Arab":[11.151,8.78,"haus1257","Hausa"],"fvr":[12.046,23.64,"furr1244","Fur"],"bum":[3.161,11.636,"bulu1251","Bulu (Cameroon)"],"maz":[19.736,-100.018,"cent2144","Central Mazahua"],"sbp":[-8.4,33.9,"sang1330","Sangu (Tanzania)"],"rhg":[20.833,92.394,"rohi1238","Rohingya"],"quv":[15.274,-91.109,"saca1238","Sacapulteco"],"ban":[-8.357,115.075,"bali1278","Balinese"],"av":[41.705,46.558,"avar1256","Avar"],"bem":[-10.612,29.299,"bemb1257","Bemba (Zambia)"],"lu":[-8.282,25.892,"luba1250","Luba-Katanga"],"nch":[21.096,-98.436,"cent2134","Central Huasteca Nahuatl"],"bar":[47.923,13.246,"bava1246","Bavarian"],"suk":[-3.161,32.877,"suku1261","Sukuma"],"rkt":[26.383,88.454,"rang1265","Central-Eastern Kamta"],"cab":[15.353,-86.909,"gari1256","Garifuna"],"asa":[-4.18,37.832,"asut1235","Asu (Tanzania)"],"bto":[13.39,123.331,"irig1242","Iriga Bicolano"],"tr":[39.867,32.867,"nucl1301","Turkish"],"oc":[44.142,6.83,"occi1239","Occitan"],"ndc":[-20.124,33.174,"ndau1241","Ndau"],"bzj":[17.394,-88.628,"beli1260","Belize Kriol English"],"es":[40.441,-1.118,"stan1288","Spanish"],"bpy":[24.458,92.016,"bish1244","Bishnupriya Manipuri"],"it":[43.046,12.649,"ital1282","Italian"],"ryu":[26.149,127.782,"cent2126","Central Okinawan"],"wo":[15.253,-15.383,"nucl1347","Wolof"],"umb":[-12.476,14.415,"umbu1257","Umbundu"],"vot":[59.38,28.623,"voti1245","Votic"],"eu":[43.279,-1.316,"basq1248","Basque"],"ro":[46.391,24.226,"roma1327","Romanian"],"haz":[33.371,64.51,"haza1239","Hazaragi"],"kri":[10.881,-14.32,"krio1253","Krio"],"te":[16.453,78.702,"telu1262","Telugu"],"mdh":[6.945,124.509,"magu1243","Maguindanao"],"gil":[0.179,173.64,"gilb1244","Gilbertese"],"am":[11.708,39.543,"amha1245","Amharic"],"nso":[-24.799,29.472,"pedi1238","Pedi"],"st":[-28.78,27.89,"sout2807","Southern Sotho"],"sah":[61.697,133.98,"yaku1245","Sakha"],"trw":[35.31,72.532,"torw1241","Torwali"],"nij":[-1.585,112.794,"ngaj1237","Ngaju"],"ckb":[35.654,45.808,"cent1972","Central Kurdish"],"tmf":[-21.547,-58.016,"toba1268","Toba-Enenlhet"],"bax":[5.49,10.848,"bamu1253","Bamun"],"tly":[38.455,48.635,"taly1247","North-Central Talysh"],"vun":[-3.425,37.585,"vunj1238","Vunjo"],"pam":[14.96,120.502,"pamp1243","Pampanga"],"rn":[-2.94,29.97,"rund1242","Rundi"],"ayo":[-19.22,-60.217,"ayor1240","Ayoreo"],"cjm":[11.285,108.49,"east2563","Eastern Cham"],"tiv":[6.88,9.263,"tivv1240","Tiv"],"aoz":[-9.773,124.144,"uabm1237","Uab Meto"],"he":[31.106,35.018,"hebr1245","Modern Hebrew"],"zu":[-28.9,30.2,"zulu1248","Zulu"],"agu":[15.331,-91.315,"agua1252","Aguacateco"],"kfo":[8.12,-5.736,"koro1306","Koro (Côte d'Ivoire)"],"skr":[29.553,71.906,"sera1259","Saraiki"],"lez":[41.516,47.895,"lezg1247","Lezgian"],"ann":[4.629,7.82,"obol1243","Obolo"],"swg":[48.387,9.987,"swab1242","Swabian"],"mey":[18.29,-14.11,"hass1238","Hassaniyya"],"ada":[5.944,0.132,"adan1247","Adangme"],"bg":[43.365,25.047,"bulg1262","Bulgarian"],"nxq":[27.5,100.0,"naxi1245","Naxi"],"moe":[49.053,-68.738,"mont1268","Montagnais"],"fj":[-18.0,178.33,"fiji1243","Fijian"],"gay":[4.373,97.346,"gayo1244","Gayo"],"th":[14.192,100.671,"thai1261","Thai"],"ho":[-9.333,147.083,"hiri1237","Hiri Motu"],"dua":[4.102,9.619,"dual1243","Duala"],"itz":[17.027,-89.873,"itza1241","Itza'"],"tru":[37.227,42.145,"turo1239","Turoyo"],"sli":[50.696,15.967,"lowe1388","Lower Silesian"],"ffm":[11.132,-3.648,"maas1239","Maasina Fulfulde"],"ksb":[-4.8,38.29,"sham1280","Shambala"],"gu":[22.687,71.096,"guja1252","Gujarati"],"ssy":[14.75,39.75,"saho1246","Saho"],"ast":[42.418,-6.022,"astu1245","Asturian-Leonese-Cantabrian"],"crk":[51.244,-110.463,"plai1258","Plains Cree"],"ba":[53.597,56.559,"bash1264","Bashkir"],"ab":[43.056,41.159,"abkh1244","Abkhaz"],"frp":[45.805,6.482,"fran1260","Arpitan"],"kaw":[-7.0,111.0,"kawi1241","Kawi"],"tum":[-11.33,33.374,"tumb1250","Tumbuka"],"xdq":[42.052,47.777,"kajt1238","Kajtak"],"jmc":[-3.294,37.07,"mach1266","Machame"],"sv":[59.801,17.39,"swed1254","Swedish"],"tpi":[-9.42,147.303,"tokp1240","Tok Pisin"],"pau":[7.341,134.477,"pala1344","Palauan"],"dv":[1.928,73.544,"dhiv1236","Dhivehi"],"dsb":[51.662,13.941,"lowe1385","Lower Sorbian"],"yue":[23.0,113.0,"yuec1235","Yue Chinese"],"ko":[37.54,126.98,"kore1280","Korean"],"sat":[25.032,87.819,"sant1410","Santali"],"mzn":[36.241,52.301,"maza1291","Mazanderani"],"tnr":[12.753,-12.48,"bedi1235","Bedik"],"chr":[35.466,-83.163,"cher1273","Cherokee"],"so":[4.779,45.153,"soma1255","Somali"],"yao":[-13.612,35.239,"yaoo1241","Yao"],"pi_Sinh":[24.527,82.251,"pali1273","Pali"],"mgh":[-11.955,38.687,"makh1261","Makhuwa-Meetto"],"rjs":[26.522,88.039,"rajb1243","Rajbanshi"],"lif":[27.27,87.886,"limb1266","Limbu"],"li":[51.015,5.877,"limb1263","Limburgan"],"gos":[53.284,6.698,"gron1242","Gronings"],"jv":[-7.001,109.287,"java1254","Javanese"],"sms":[68.833,29.72,"skol1241","Skolt Saami"],"sav":[14.625,-17.057,"saaf1238","Saafi-Saafi"],"arq":[35.421,3.23,"alge1239","Algerian Arabic"],"syl":[24.837,92.253,"sylh1242","Sylheti"],"fan":[1.724,11.615,"fang1246","Fang (Equatorial Guinea)"],"pdc":[40.031,-76.321,"penn1240","Pennsylvania German"],"kgp":[-27.767,-52.539,"kain1272","Kaingang"],"frr":[54.641,8.585,"nort2626","Northern Frisian"],"guq":[-25.587,-56.47,"ache1246","Aché"],"ss":[-26.0,31.5,"swat1243","Swati"],"acr":[15.073,-90.351,"achi1256","Achi"],"krc":[43.565,42.261,"kara1465","Karachay-Balkar"],"aeb":[33.797,9.562,"tuni1259","Tunisian Arabic"],"kmb":[-8.978,14.889,"kimb1241","Kimbundu"],"wuu":[29.862,119.682,"wuch1236","Wu Chinese"],"war":[11.491,125.012,"wara1300","Waray (Philippines)"],"bsq":[7.275,-11.543,"nucl1418","Bassa"],"xal":[46.567,45.317,"kalm1243","Oirad-Kalmyk-Darkhat"],"lzz_Geor":[41.5,41.91,"lazz1240","Laz"],"sd_Deva":[26.0,69.0,"sind1272","Sindhi"],"mnp":[27.05,118.32,"minb1236","Min Bei Chinese"],"dtp":[6.03,116.681,"cent2100","Kadazan Dusun"],"ia":[48.203,2.615,"inte1239","Interlingua (International Auxiliary Language Association)"],"dav":[-3.793,38.573,"tait1250","Taita"],"kjb":[15.685,-91.304,"qanj1241","Q'anjob'al"],"shi_Latn":[29.785,-7.779,"tach1250","Tachelhit"],"pi_Mymr":[24.527,82.251,"pali1273","Pali"],"wa":[50.224,5.145,"wall1255","Walloon"],"kn":[13.588,76.12,"nucl1305","Kannada"],"brh":[29.04,66.56,"brah1256","Brahui"],"xav":[-14.302,-52.437,"xava1240","Xavánte"],"bss":[4.924,9.655,"akoo1248","Akoose"],"ljp":[-5.735,105.037,"lamp1243","Lampung Api"],"bgc":[29.017,76.043,"hary1238","Haryanvi"],"nan_Hant":[24.5,118.17,"minn1241","Min Nan Chinese"],"lki":[34.01,47.94,"laki1244","Laki"],"chp":[58.98,-104.44,"chip1261","Chipewyan"],"rif":[34.917,-3.431,"tari1263","Tarifiyt-Beni-Iznasen-Eastern Middle Atlas Berber"],"toi":[-17.422,27.103,"tong1318","Tonga (Zambia)"],"rmf":[60.45,24.43,"kalo1256","Kalo Finnish Romani"],"nnh":[5.568,10.127,"ngie1241","Ngiemboon"],"rof":[-3.078,37.538,"romb1244","Rombo"],"rej":[-3.331,102.434,"reja1240","Rejang"],"smj":[67.276,17.806,"lule1254","Lule Saami"],"ext":[39.193,-6.102,"extr1243","Extremaduran"],"suz":[27.52,86.248,"sunw1242","Sunwar"],"snf":[14.792,-16.921,"noon1242","Noon"],"bft":[34.449,77.286,"balt1258","Balti"],"rgn":[44.235,11.719,"roma1328","Romagnol"],"seh":[-19.793,34.983,"nucl1396","Sena"],"kxm":[14.467,103.863,"nort2684","Northern Khmer"],"nus":[8.139,32.383,"nuer1246","Nuer"],"shn":[21.599,98.034,"shan1277","Shan"],"hnd":[33.212,72.17,"sout2668","Southern Hindko"],"bkm":[6.26,10.335,"komc1235","Kom (Cameroon)"],"lij":[44.082,7.905,"ligu1248","Ligurian"],"pi_Deva":[24.527,82.251,"pali1273","Pali"],"lun":[-11.179,23.866,"lund1266","Lunda"],"swv":[27.34,75.407,"shek1243","Shekhawati"],"lmn":[16.573,76.972,"lamb1269","Lambadi"],"bm":[12.9,-7.65,"bamb1269","Bambara"],"da":[54.865,9.363,"dani1285","Danish"],"chk":[7.347,151.599,"chuu1238","Chuukese"],"ny":[-14.805,32.811,"nyan1308","Nyanja"],"is":[63.484,-19.021,"icel1247","Icelandic"],"gor":[0.627,122.288,"goro1259","Gorontalo"],"sdh":[32.898,46.598,"sout2640","Southern Kurdish"],"xsr":[27.674,86.999,"sher1255","Solu-Khumbu Sherpa"],"mww":[21.546,103.164,"hmon1333","Hmong Daw"],"cgg":[-1.044,29.912,"chig1238","Chiga"],"sei":[28.988,-112.384,"seri1257","Seri"],"mh":[8.72,167.73,"mars1254","Marshallese"],"cu":[43.717,22.844,"chur1257","Church Slavic"],"ky_Latn":[42.0,74.0,"kirg1245","Kirghiz"],"hne":[20.36,82.048,"chha1249","Chhattisgarhi"],"lzz":[41.5,41.91,"lazz1240","Laz"],"hz":[-21.023,20.566,"here1253","Herero"],"tcy":[12.811,75.265,"tulu1258","Tulu"],"mop":[16.353,-89.067,"mopa1243","Mopan"],"pdt":[49.578,-109.354,"plau1238","Plautdietsch"],"kw":[50.523,-4.186,"corn1251","Cornish"],"enx":[-23.428,-57.946,"sout2989","Enxet Sur"],"kao":[14.1,-10.95,"xaas1235","Xaasongaxango"],"mro":[21.472,92.318,"mruu1242","Mru"],"nmg":[2.394,10.081,"kwas1243","Kwasio"],"kum":[43.0,47.0,"kumy1244","Kumyk"],"ve":[-22.188,29.952,"vend1245","Venda"],"stq":[53.117,7.721,"sate1242","Ems-Weser Frisian"],"luz":[30.467,50.838,"sout2647","Southern Luri"],"pt":[39.91,-8.1,"port1283","Portuguese"],"rwk":[-3.429,36.769,"rwaa1238","Rwa"],"vi":[20.681,105.774,"viet1252","Vietnamese"],"dje":[12.855,2.412,"zarm1239","Zarma-Kaado"],"bej":[17.244,36.667,"beja1238","Beja"],"tdh":[27.539,87.606,"thul1246","Thulung"],"gd":[56.757,-5.244,"scot1245","Scottish Gaelic"],"zea":[51.498,3.854,"zeeu1238","Zeeuws"],"wbp":[-20.101,131.05,"warl1254","Warlpiri"],"cad":[33.33,-93.5,"cadd1256","Caddo"],"aqt":[-22.85,-58.45,"anga1316","Angaité"],"snk":[14.76,-12.141,"soni1259","Soninke"],"lcp":[19.868,99.206,"west2396","Western Lawa"],"rng":[-26.733,32.617,"rong1268","Ronga"],"ti":[15.336,38.927,"tigr1271","Tigrinya"],"tts":[16.03,103.67,"nort2741","Northeastern Thai"],"osa":[36.783,-96.295,"osag1243","Osage"],"haw":[19.63,-155.43,"hawa1245","Hawaiian"],"scn":[37.574,14.041,"sici1248","Sicilian"],"kab":[36.41,4.761,"kaby1243","Kabyle"],"krj":[10.813,122.297,"kina1250","Kinaray-a"],"byn":[15.783,38.392,"bili1260","Bilin"],"srx":[31.1,77.17,"sirm1239","Sirmauri"],"ng":[-17.22,17.35,"ndon1254","Ndonga"],"kxp":[26.071,72.131,"wadi1248","Wadiyara Koli"],"xmf":[42.513,41.872,"ming1252","Mingrelian"],"hoc":[23.96,87.119,"hooo1248","Ho"],"hak_Hant":[25.0,116.0,"hakk1236","Hakka Chinese"],"dyu":[9.291,-4.582,"dyul1238","Dyula"],"shi":[29.785,-7.779,"tach1250","Tachelhit"],"sef":[9.508,-6.153,"ceba1235","Senari"],"id":[-7.335,109.716,"indo1316","Standard Indonesian"],"mas":[-3.142,36.457,"masa1300","Masai"],"yap":[9.558,138.125,"yape1248","Yapese"],"wtm":[27.736,76.947,"mewa1250","Mewati"],"kht":[27.665,97.036,"kham1290","Khamti"],"esu":[60.306,-161.486,"cent2127","Central Alaskan Yupik"],"kge":[-3.792,105.107,"kome1238","Komering"],"ses":[16.963,-0.552,"koyr1242","Koyraboro Senni Songhai"],"en_Shaw":[53.0,-1.0,"stan1293","English"],"bza":[8.207,-10.189,"band1352","Bandi"],"dar":[42.426,47.439,"darg1241","North-Central Dargwa"],"ife":[7.636,1.585,"ifee1241","Ifè"],"ksf":[4.726,11.098,"bafi1243","Bafia"],"ee":[6.461,0.815,"ewee1241","Ewe"],"fon":[7.155,1.665,"fonn1241","Fon"],"gez":[10.134,40.682,"geez1241","Geez"],"grr":[29.111,0.02,"tazn1238","Sud Oranais-Gourara"],"bho":[26.458,84.817,"bhoj1244","Bhojpuri"],"agq":[6.39,10.081,"aghe1239","Aghem"],"kru":[24.464,86.466,"kuru1301","Kurukh"],"mad":[-7.0,113.0,"nucl1460","Madurese"],"bbc":[2.355,99.176,"bata1289","Batak Toba"],"sm":[-13.92,-171.83,"samo1305","Samoan"],"be":[53.231,25.604,"bela1254","Belarusian"],"awa":[27.591,82.466,"awad1243","Awadhi"],"nyn":[-0.464,30.548,"nyan1307","Nyankole"],"tkr":[41.592,46.886,"tsak1249","Tsakhur"],"fy":[53.143,5.861,"west2354","Western Frisian"],"su":[-6.897,107.106,"sund1252","Sundanese"],"en":[53.0,-1.0,"stan1293","English"],"crg":[49.168,-99.912,"mich1243","Heritage Michif"],"kha":[24.977,92.0,"khas1269","Khasi"],"mam":[14.803,-91.723,"mamm1241","Mam"],"wae":[46.7,9.183,"wals1238","Walser"],"mt":[35.888,14.451,"malt1254","Maltese"],"bgn":[29.499,66.029,"west2368","Western Balochi"],"xnr":[31.915,76.366,"kang1280","Kangri"],"mfa":[6.381,101.41,"patt1249","Kelantan-Pattani Malay"],"km":[12.052,105.015,"cent1989","Central Khmer"],"na":[-0.53,166.922,"naur1243","Nauru"],"wbr":[23.689,73.902,"wagd1238","Wagdi"],"kek":[15.379,-89.245,"kekc1242","Q'eqchi'"],"yue_Hans":[23.0,113.0,"yuec1235","Yue Chinese"],"bjn":[0.747,115.79,"banj1239","Banjar"],"lt":[55.143,23.96,"lith1251","Lithuanian"],"ojw":[50.566,-102.525,"west1510","Western Ojibwa"],"ln":[-4.409,15.285,"ling1263","Kinshasa Lingala"],"ml":[9.592,76.765,"mala1464","Malayalam"],"mfe":[-20.261,57.552,"mori1278","Morisyen"],"rif_Tfng":[34.917,-3.431,"tari1263","Tarifiyt-Beni-Iznasen-Eastern Middle Atlas Berber"],"kss":[8.324,-10.338,"sout2778","Southern Kisi"],"poc":[14.733,-89.738,"poqo1253","Poqomam"],"egl":[44.354,11.579,"emil1241","Emiliano"],"abq":[44.25,42.0,"abaz1241","Abaza"],"tzm":[32.742,-2.409,"cent2194","Central Moroccan Berber"],"vep":[60.335,34.786,"veps1250","Veps"],"poh":[15.359,-90.581,"poqo1254","Poqomchi'"],"rob":[-2.582,120.139,"taee1237","Tae'"],"tg":[38.821,68.555,"taji1245","Tajik"],"kwk":[50.927,-127.308,"kwak1269","Kwak'wala"],"ebu":[-0.628,37.593,"embu1241","Embu"],"kk_Arab":[51.17,71.454,"kaza1248","Kazakh"],"nds":[53.115,12.391,"nort2627","Eastern Low German"],"cja":[12.477,104.026,"west2650","Western Cham"],"ojs":[53.909,-89.933,"seve1240","Severn Ojibwa"],"rmt":[32.0,35.0,"doma1258","Domari"],"min":[-0.896,100.44,"mina1268","Minangkabau"],"ug":[43.88,87.38,"uigh1240","Uighur"],"lol":[-1.542,20.426,"mong1338","Mongo"],"qum":[15.231,-91.704,"sipa1247","Sipacapense"],"no":[59.92,10.71,"norw1258","Norwegian"],"alt":[50.135,86.871,"sout2694","Southern Altai"],"kvx":[24.486,69.942,"park1237","Parkari Koli"],"blo":[9.111,1.602,"anii1245","Anii"],"usp":[15.365,-90.889,"uspa1245","Uspanteco"],"fur":[46.147,13.049,"friu1240","Friulian"],"cdo":[26.0,119.5,"mind1253","Min Dong Chinese"],"ts":[-23.575,31.811,"tson1249","Tsonga"],"mls":[13.273,22.175,"nucl1440","Masalit"],"mk":[41.596,21.793,"mace1250","Macedonian"],"ceg":[-20.59,-58.2,"cham1315","Chamacoco"],"bqi":[32.016,49.771,"bakh1245","Bakhtiari"],"lbw":[-4.036,121.888,"tola1247","Tolaki"],"inh":[43.11,45.03,"ingu1240","Ingush"],"sas":[-8.583,116.284,"sasa1249","Sasak"],"ki":[-0.29,36.719,"kiku1240","Kikuyu"],"cch":[9.959,8.483,"atsa1241","Atsam"],"kfr":[23.83,69.0,"kach1277","Kachchi"],"nhw":[21.371,-98.771,"west2624","Western Huasteca Nahuatl"],"hi":[25.0,77.0,"hind1269","Hindi"],"bku":[12.64,121.21,"buhi1245","Buhid"],"knf":[12.262,-15.744,"mank1251","Mankanya"],"lil":[50.727,-122.04,"lill1248","Lillooet"],"ug_Cyrl":[43.88,87.38,"uigh1240","Uighur"],"nse":[-15.395,31.354,"nsen1242","Nsenga"],"unr":[23.03,85.85,"mund1320","Mundari"],"tsg":[5.122,118.88,"taus1251","Tausug"],"pta":[-23.159,-56.118,"pait1247","Pai Tavytera"],"lir":[6.423,-10.528,"libe1240","Kru Pidgin English"],"nhd":[-25.652,-55.051,"chir1286","Chiripá"],"hnn":[12.416,121.221,"hanu1241","Hanunoo"],"atj":[47.956,-73.799,"atik1240","Atikamekw"],"myx":[1.059,34.283,"masa1299","Masaaba"],"apd":[17.802,33.318,"suda1236","Sudanese Arabic"],"caa":[14.818,-89.236,"chor1273","Ch'orti'"],"enl":[-22.54,-58.98,"nort2971","Enlhet Norte"],"as":[26.088,91.293,"assa1263","Assamese"],"bbj":[5.396,10.352,"ghom1247","Ghomálá'"],"cac":[15.84,-91.76,"chuj1250","Chuj"],"sco":[55.887,-3.71,"scot1243","Scots"],"ttt":[41.425,46.646,"musl1236","Muslim Tat"],"sn":[-17.208,29.757,"shon1251","Shona"],"jac":[15.661,-91.663,"popt1235","Popti'"],"pa_Arab":[30.037,75.67,"panj1256","Eastern Panjabi"],"pon":[6.872,158.223,"pohn1238","Pohnpeian"],"oka":[49.275,-119.294,"okan1243","Okanagan"],"bze":[15.253,-4.019,"jena1242","Jenaama Bozo"],"si":[8.0,81.0,"sinh1246","Sinhala"],"khb":[21.032,101.282,"luuu1242","Lü"],"ccp":[23.001,92.339,"chak1266","Chakma"],"lzh":[34.09,109.05,"lite1248","Classical Chinese"],"maf":[10.943,13.818,"mafa1239","Mafa"],"nd":[-20.251,27.41,"nort2795","Zimbabwean Ndebele"],"fil":[12.265,123.464,"fili1244","Filipino"],"sd":[26.0,69.0,"sind1272","Sindhi"],"cps":[11.412,122.954,"capi1239","Capiznon"],"khq":[16.192,-3.74,"koyr1240","Koyra Chiini Songhay"],"pfl":[49.701,6.846,"pala1330","Pfaelzisch-Lothringisch"],"saz":[9.992,77.943,"saur1248","Saurashtra"],"mev":[7.046,-8.864,"mann1248","Mann"],"btv":[34.958,72.927,"bate1261","Bateri"],"ga":[53.219,-7.615,"iris1253","Irish"],"ybb":[5.474,10.021,"yemb1246","Yemba"],"sl":[46.254,14.777,"slov1268","Slovenian"],"bla":[49.067,-113.109,"siks1238","Siksika"],"cy":[52.0,-4.0,"wels1247","Welsh"],"bgx":[41.171,24.446,"balk1254","Rumelian Turkish"],"kbd":[43.508,43.392,"kaba1278","Kabardian"],"csb":[54.3,18.616,"kash1274","Kashubian"],"bn":[24.0,90.0,"beng1280","Bengali"],"tk":[37.087,59.176,"turk1304","Turkmen"],"quc":[14.528,-91.17,"kich1262","K'iche'"],"bfy":[24.684,87.499,"bagh1251","Bagheli"],"mr":[17.934,76.666,"mara1378","Marathi"],"tog":[-12.082,34.061,"tong1321","Tonga (Nyasa)"],"new":[27.67,85.326,"newa1246","Kathmandu Valley Newari"],"vec":[45.504,12.214,"vene1258","Venetian"],"unr_Deva":[23.03,85.85,"mund1320","Mundari"],"mvy":[35.339,73.015,"indu1241","Indus Kohistani"],"spn":[-22.49,-58.38,"sana1298","Sanapaná"],"mos":[11.95,-1.32,"moss1236","Mossi"],"njo":[26.324,94.382,"aona1235","Ao Naga"],"naq":[-25.075,17.977,"nama1264","Nama (Namibia)"],"hu":[46.907,19.656,"hung1274","Hungarian"],"lue":[-13.538,22.292,"luva1239","Luvale"],"ibb":[5.153,7.867,"ibib1240","Ibibio"],"hur":[49.25,-122.444,"halk1245","Halkomelem"],"pnt_Cyrl":[41.266,36.097,"pont1253","Pontic"],"ewo":[4.211,11.936,"ewon1239","Ewondo"],"tem":[8.903,-12.333,"timn1235","Timne"],"mzb":[32.501,3.85,"tumz1238","Tumzabt"],"aa":[12.228,41.808,"afar1241","Afar"],"abq_Latn":[44.25,42.0,"abaz1241","Abaza"],"ce":[43.5,45.5,"chec1245","Chechen"],"hnj":[22.564,101.95,"hmon1264","Hmong Njua"],"amo":[10.323,8.654,"amoo1242","Amo"],"udm":[56.129,52.635,"udmu1245","Udmurt"],"mak":[-5.656,119.838,"maka1311","Makasar"],"kjg":[20.246,101.671,"khmu1256","Khmu"],"pko":[1.57,35.232,"poko1263","Pökoot"],"wbq":[19.884,77.167,"wadd1237","Waddar"],"gur":[11.092,-0.811,"fare1241","Farefare"],"men":[7.909,-10.993,"mend1266","Mende (Sierra Leone)"],"khw":[36.0,72.0,"khow1242","Khowar"],"pag":[15.938,120.365,"pang1290","Pangasinan"],"nsk":[55.932,-61.132,"nask1242","Naskapi"],"tet":[-9.112,125.528,"tetu1245","Tetum"],"mrh":[22.114,93.039,"mara1382","Mara"],"wsg":[18.75,80.2,"utno1237","Adilabad Gondi"],"nym":[-5.086,32.945,"nyam1276","Nyamwezi"],"dyo":[12.758,-15.735,"jola1263","Jola-Fonyi"],"ja":[35.0,135.0,"nucl1643","Japanese"],"bsc":[12.453,-13.35,"bass1258","Bassari-Tanda"],"tyv":[51.7,94.367,"tuvi1240","Tuvinian"],"vro":[57.85,27.0,"sout2679","South Estonian"],"bhb":[20.85,73.959,"bhil1251","Bhili"],"ksh":[50.947,6.927,"kols1241","Kölsch"],"tt":[55.796,49.116,"tata1255","Tatar"],"bjt":[12.538,-15.666,"bala1302","Balanta-Ganja"],"lag":[-4.714,35.952,"lang1320","Langi"],"luo":[-0.933,34.49,"luok1236","Luo (Kenya and Tanzania)"],"nv":[36.33,-109.38,"nava1243","Navajo"],"nap":[39.229,16.422,"neap1235","Continental Southern Italian"],"ecy":[34.721,33.119,"eteo1240","Eteocypriot"],"uk":[49.796,29.945,"ukra1253","Ukrainian"],"byv":[5.109,10.612,"medu1238","Medumba"]},"codes":["AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV","UG","UA","AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW","PS","TW","XK"],"fixed":{"CZ":"Czechia","CD":"DR Congo","CG":"Republic of the Congo","CI":"Côte d’Ivoire","VA":"Vatican City","KR":"South Korea","KP":"North Korea","TR":"Türkiye","PS":"Palestine","XK":"Kosovo"},"featureAliases":{"United States of America":"US","United Kingdom":"GB","Dem. Rep. Congo":"CD","Congo":"CG","Central African Rep.":"CF","S. Sudan":"SS","Dominican Rep.":"DO","Eq. Guinea":"GQ","Bosnia and Herz.":"BA","eSwatini":"SZ","Solomon Is.":"SB","Timor-Leste":"TL","Falkland Is.":null,"W. Sahara":null,"Somaliland":null,"N. Cyprus":null,"Fr. S. Antarctic Lands":null,"Antarctica":null,"Czechia":"CZ","Macedonia":"MK","North Macedonia":"MK","Côte d'Ivoire":"CI","Turkey":"TR","Palestine":"PS","Kosovo":"XK","Taiwan":"TW","South Korea":"KR","North Korea":"KP","Russia":"RU","Vietnam":"VN","Laos":"LA","Syria":"SY","Iran":"IR","Moldova":"MD","Bolivia":"BO","Venezuela":"VE","Tanzania":"TZ","Brunei":"BN","Vatican":"VA","Marshall Is.":"MH","Trinidad and Tobago":"TT","São Tomé and Principe":"ST","St. Vin. and Gren.":"VC","Saint Lucia":"LC","St. Kitts and Nevis":"KN","Cabo Verde":"CV","Myanmar":"MM","Antigua and Barb.":"AG"},"langs":{"AF":[["fa",50.0,"o"],["ps",43.0,"o"],["haz",5.9,""],["uz_Arab",4.7,"r"],["tk",1.7,"r"],["prd",1.2,""],["bgn",0.63,""],["kaa",0.008,""],["ug",0.007,""],["kk_Arab",0.005,""]],"AL":[["sq",100.0,"o"],["el",1.9,""],["mk",0.47,""]],"DZ":[["arq",83.0,""],["ar",74.0,"o"],["fr",33.0,"o"],["mey",11.0,""],["kab",7.8,""],["en",7.0,""],["mzb",0.36,""],["grr",0.026,""]],"AD":[["ca",51.0,"o"],["es",43.0,""],["fr",6.8,""]],"AO":[["pt",67.0,"o"],["umb",29.0,""],["kmb",25.0,""],["ln",0.67,""]],"AG":[["en",86.0,"o"],["pt",1.6,""]],"AR":[["es",100.0,"o"],["en",7.0,""],["cy",0.066,""],["gn",0.047,""]],"AM":[["hy",99.0,"o"],["ru",65.0,""],["ku",3.3,""],["ku_Cyrl",3.3,""],["az",0.0,""]],"AU":[["en",96.0,"o"],["zh_Hant",2.1,""],["it",1.9,""],["wbp",0.009,""],["hnj",0.008,""]],"AT":[["de",97.0,"o"],["bar",95.0,""],["en",73.0,""],["fr",13.0,""],["it",9.0,""],["hr",1.2,"r"],["sl",0.37,"r"],["hu",0.26,"r"]],"AZ":[["az",89.0,"o"],["az_Cyrl",9.9,"o"],["tly",9.8,""],["ku",0.24,""],["ku_Cyrl",0.24,""],["ttt",0.22,""],["tkr",0.16,""]],"BS":[["en",100.0,"o"]],"BH":[["ar",87.0,"o"],["ml",3.3,""]],"BD":[["bn",98.0,"o"],["en",18.0,""],["rkt",6.5,""],["syl",5.0,""],["rhg",0.53,""],["ccp",0.22,""],["my",0.21,""],["grt",0.073,""],["mro",0.018,""],["mni",0.011,""]],"BB":[["en",100.0,"o"]],"BY":[["ru",71.0,"o"],["be",26.0,"o"]],"BE":[["en",59.0,""],["nl",55.0,"o"],["fr",38.0,"o"],["de",22.0,"o"],["vls",10.0,""],["wa",5.8,""]],"BZ":[["en",77.0,"o"],["es",55.0,""],["bzj",50.0,""],["kek",6.5,""],["mop",4.0,""],["cab",1.9,""]],"BJ":[["fr",34.0,"o"],["fon",25.0,""],["yo",6.7,""],["blo",0.3,""]],"BT":[["dz",47.0,"o"],["ne",17.0,""],["tsj",15.0,""],["en",11.0,""],["lep",3.9,""]],"BO":[["es",61.0,"o"],["qu",32.0,"o"],["ay",20.0,"o"],["gn",0.45,""],["aro",0.001,""]],"BA":[["bs",99.0,"o"],["bs_Cyrl",99.0,"o"],["en",45.0,""],["hr",12.0,"o"],["sr",10.0,"o"],["sr_Latn",10.0,"o"]],"BW":[["en",81.0,"o"],["tn",62.0,"o"],["af",0.24,""]],"BR":[["pt",91.0,"o"],["en",8.0,""],["de",0.84,""],["hrx",0.59,""],["it",0.28,""],["vec",0.24,"r"],["ja",0.21,""],["es",0.036,""],["kgp",0.024,""],["ko",0.021,""],["yrl",0.01,""],["gub",0.008,""],["xav",0.004,""]],"BN":[["ms",93.0,"o"],["zh_Hant",11.0,""],["ms_Arab",5.0,"o"],["en",1.6,""]],"BG":[["bg",100.0,"o"],["en",25.0,""],["ru",23.0,""],["tr",11.0,""],["de",8.0,""]],"BF":[["mos",40.0,""],["dyu",32.0,""],["fr",25.0,"o"],["ff",0.0,""],["ff_Adlm",0.0,""]],"BI":[["rn",63.0,"o"],["fr",59.0,"o"],["sw",0.047,""],["en",0.046,"o"]],"CV":[["kea",91.0,""],["pt",76.0,"o"]],"KH":[["km",89.0,"o"],["cja",1.6,""],["kdt",0.11,""]],"CM":[["fr",68.0,"o"],["en",38.0,"o"],["bum",4.6,""],["ff",3.6,""],["ewo",3.1,""],["ybb",1.6,""],["bbj",1.4,""],["nnh",1.4,""],["bkm",1.3,""],["bas",1.2,""],["bax",1.2,""],["byv",1.1,""],["mua",1.0,""],["maf",0.74,""],["bfd",0.57,""],["bss",0.54,""],["kkj",0.54,""],["dua",0.48,""],["mgo",0.47,""],["ar",0.39,""],["jgo",0.34,""],["ksf",0.32,""],["ken",0.25,""],["agq",0.14,""],["ha_Arab",0.14,""],["nmg",0.029,""],["yav",0.007,""],["ff_Adlm",0.0,""]],"CA":[["en",87.0,"o"],["fr",29.0,"o"],["es",3.2,""],["zh",2.7,""],["pa",2.6,""],["ar",2.3,""],["hi",2.1,""],["fil",2.0,""],["yue",2.0,""],["it",1.5,""],["de",1.2,""],["ur",1.1,""],["pt",0.93,""],["ru",0.85,""],["ta",0.65,""],["vi",0.64,""],["fa",0.61,""],["gu",0.58,""],["ko",0.56,""],["pl",0.56,""],["el",0.4,""],["uk",0.36,""],["bn",0.33,""],["ro",0.32,""],["nl",0.3,""],["ja",0.27,""],["sr",0.23,""],["tr",0.22,""],["hr",0.2,""],["hu",0.18,""],["so",0.16,""],["iu",0.11,"r"],["iu_Latn",0.11,"r"],["pdt",0.11,""],["oj",0.072,""],["ojs",0.042,""],["crk",0.033,"r"],["chp",0.032,"r"],["moe",0.03,""],["mic",0.024,""],["atj",0.018,""],["bla",0.017,""],["cr",0.013,""],["crl",0.013,""],["csw",0.012,""],["war",0.012,""],["ojw",0.009,""],["den",0.006,"r"],["crg",0.005,""],["dgr",0.005,"r"],["dak",0.004,""],["hur",0.004,""],["moh",0.004,""],["nsk",0.003,""],["clc",0.002,""],["kwk",0.002,""],["lil",0.002,""],["oka",0.002,""],["pqm",0.002,""],["gwi",0.001,"r"]],"CF":[["sg",49.0,"o"],["fr",29.0,"o"],["ln",0.24,""]],"TD":[["ar",17.0,"o"],["fr",13.0,"o"]],"CL":[["es",98.0,"o"],["en",9.5,""],["arn",1.5,""]],"CN":[["zh",90.0,"o"],["wuu",6.0,""],["yue",5.2,""],["yue_Hans",5.2,""],["hsn",2.9,""],["hak",2.3,""],["nan",1.9,""],["gan",1.7,""],["ii",0.6,""],["ug",0.55,"r"],["za",0.31,"r"],["mn_Mong",0.26,"r"],["bo",0.2,"r"],["ko",0.15,"r"],["kk_Arab",0.085,""],["lis",0.045,""],["ky_Arab",0.034,""],["nxq",0.024,""],["khb",0.019,""],["tdd",0.019,""],["mww",0.017,""],["lcp",0.006,""],["en",0.004,""],["hnj",0.004,""],["ru",0.001,""],["vi",0.001,""],["lzh",0.0,""],["stu_Tale",0.0,""],["uz_Cyrl",0.0,""]],"CO":[["es",93.0,"o"],["guc",0.27,""],["yrl",0.006,""]],"KM":[["ar",66.0,"o"],["zdj",37.0,"o"],["wni",34.0,"o"],["fr",26.0,"o"]],"CG":[["fr",61.0,"o"],["ln",2.4,""]],"CD":[["fr",51.0,"o"],["sw",50.0,"r"],["lua",9.6,"r"],["ln",3.1,"r"],["lu",2.3,""],["kg",1.5,"r"],["lol",0.61,""],["rw",0.38,""]],"CR":[["es",95.0,"o"]],"CI":[["fr",34.0,"o"],["bci",11.0,""],["sef",4.3,""],["dnj",4.0,""],["kfo",0.23,""]],"HR":[["hr",99.0,"o"],["en",49.0,""],["it",1.6,"r"],["vec",0.7,"r"]],"CU":[["es",100.0,"o"]],"CY":[["el",95.0,"o"],["en",73.0,""],["tr",23.0,"o"],["fr",6.6,""],["hy",0.21,""],["ar",0.098,""],["ecy",0.0,""]],"CZ":[["cs",98.0,"o"],["en",27.0,""],["sk",16.0,""],["de",15.0,""],["pl",0.49,""]],"DK":[["da",93.0,"o"],["en",86.0,""],["de",47.0,"r"],["sv",13.0,""],["fo",0.38,""],["kl",0.12,"r"],["jut",0.0,""]],"DJ":[["fr",50.0,"o"],["aa",42.0,""],["so",41.0,""],["ar",7.3,"o"]],"DM":[["en",94.0,"o"]],"DO":[["es",78.0,"o"],["en",0.074,""]],"EC":[["es",96.0,"o"],["qu",17.0,"o"],["qug",5.7,""]],"EG":[["ar",94.0,"o"],["arz",64.0,""],["en",35.0,""],["cop",6.0,""],["el",0.061,""]],"SV":[["es",89.0,"o"],["ccr",0.056,""],["ppl",0.041,""],["len",0.02,""]],"GQ":[["es",87.0,"o"],["fan",51.0,""],["fr",29.0,"o"],["bvb",7.9,""],["pt",0.0,"o"]],"ER":[["ti",60.0,"o"],["en",59.0,"o"],["tig",18.0,""],["ar",4.9,"o"],["aa",3.6,""],["ssy",3.6,""],["byn",1.3,""]],"EE":[["et",71.0,"o"],["ru",56.0,""],["en",50.0,""],["fi",21.0,""],["vro",5.7,""],["ie",0.0,""]],"SZ":[["en",80.0,"o"],["ss",58.0,"o"],["zu",6.8,""],["ts",1.7,""]],"ET":[["en",43.0,""],["am",33.0,"o"],["om",32.0,""],["so",6.0,""],["ti",6.0,""],["sid",3.5,""],["wal",1.8,""],["aa",1.4,""],["gez",0.0,""]],"FJ":[["en",94.0,"o"],["hi",44.0,""],["hif",41.0,"o"],["fj",39.0,"o"],["rtm",0.26,""]],"FI":[["fi",94.0,"o"],["en",70.0,""],["sv",44.0,"o"],["de",18.0,""],["ru",0.81,""],["et",0.11,""],["rmf",0.089,""],["se",0.036,""],["smn",0.011,""],["sms",0.011,"r"]],"FR":[["fr",97.0,"o"],["en",39.0,""],["es",13.0,""],["de",5.0,""],["oc",3.0,""],["it",1.7,""],["pt",1.3,""],["pcd",1.1,""],["gsw",0.91,""],["br",0.83,""],["co",0.24,""],["hnj",0.19,""],["ca",0.17,""],["eu",0.13,""],["nl",0.13,""],["frp",0.094,""],["mww",0.015,""],["ia",0.0,""]],"GA":[["fr",63.0,"o"],["puu",9.0,""]],"GM":[["en",40.0,"o"],["man",29.0,""],["man_Nkoo",29.0,""],["ff",0.0,""],["ff_Adlm",0.0,""]],"GE":[["ka",86.0,"o"],["xmf",11.0,""],["ru",9.0,""],["hy",7.0,""],["ab",2.2,"r"],["os",2.2,"r"],["ku_Cyrl",0.89,""],["lzz_Geor",0.002,""]],"DE":[["de",91.0,"o"],["en",64.0,""],["fr",18.0,""],["bar",17.0,""],["nds",12.0,""],["nl",9.0,""],["it",7.0,""],["es",6.0,""],["ru",6.0,""],["vmf",6.0,""],["tr",2.5,""],["gsw",2.3,""],["da",2.0,""],["swg",1.0,""],["hr",0.79,""],["ku",0.66,""],["el",0.38,""],["ksh",0.3,""],["pl",0.29,""],["hsb",0.016,""],["frr",0.012,"r"],["dsb",0.008,""],["frs",0.002,""],["stq",0.001,""],["pfl",0.0,""]],"GH":[["ak",39.0,"r"],["en",21.0,"o"],["ee",11.0,"r"],["abr",5.0,""],["gur",3.5,""],["ada",3.0,""],["gaa",2.8,"r"],["nzi",1.0,""],["ha",0.86,""],["saf",0.012,""],["ff",0.0,""],["ff_Adlm",0.0,""]],"GR":[["el",99.0,"o"],["en",51.0,""],["fr",7.3,""],["de",5.0,""],["pnt",3.7,""],["mk",1.6,""],["tr",1.2,""],["bg",0.27,""],["sq",0.096,""],["tsd",0.002,""],["gmy",0.0,""],["grc",0.0,""]],"GD":[["en",96.0,"o"]],"GT":[["es",88.0,"o"],["cak",8.8,"r"],["kek",8.8,""],["quc",8.6,"r"],["mam",4.6,""],["en",3.1,""],["kjb",1.2,""],["poh",1.2,""],["acr",1.1,""],["ixl",0.89,"r"],["tzj",0.61,""],["knj",0.58,""],["cac",0.43,""],["jac",0.31,""],["agu",0.26,""],["caa",0.13,"r"],["poc",0.09,""],["quv",0.054,"r"],["usp",0.045,"r"],["qum",0.036,""],["cab",0.027,""],["ttc",0.027,""],["xin",0.027,"r"],["ckz",0.018,""],["mop",0.018,""],["itz",0.009,""]],"GN":[["fr",27.0,"o"],["ff",26.0,""],["sus",24.0,""],["man",23.0,""],["man_Nkoo",23.0,""],["nqo",5.0,""],["kpe",3.8,""],["ff_Adlm",0.0,""]],"GW":[["pt",100.0,"o"],["fr",15.0,""],["knf",2.6,""],["ff",0.0,""],["ff_Adlm",0.0,""]],"GY":[["en",100.0,"o"]],"HT":[["ht",81.0,"o"],["fr",42.0,"o"]],"HN":[["es",91.0,"o"],["cab",0.47,""],["en",0.44,""]],"HU":[["hu",100.0,"o"],["en",20.0,""],["de",18.0,""],["fr",1.2,""],["ro",0.99,""],["hr",0.32,""],["sk",0.12,""],["sl",0.051,""]],"IS":[["is",100.0,"o"],["da",0.62,""]],"IN":[["hi",41.0,"o"],["en",19.0,"o"],["bn",8.1,"r"],["te",7.2,"r"],["mr",7.0,"r"],["ta",5.9,"r"],["ur",5.0,"r"],["gu",4.5,"r"],["kn",3.7,"r"],["ml",3.2,"r"],["or",3.2,"r"],["pa",2.8,"r"],["bho",2.3,""],["awa",1.9,""],["as",1.3,"r"],["bgc",1.2,""],["mag",1.2,""],["mai",1.2,"r"],["mwr",1.2,""],["hne",1.1,""],["dcc",0.99,""],["bjj",0.56,""],["ne",0.56,"r"],["sat",0.55,"r"],["wtm",0.46,""],["rkt",0.43,""],["ks",0.41,"r"],["knn",0.37,""],["kok",0.32,"r"],["swv",0.28,""],["gbm",0.27,""],["lmn",0.27,""],["sd",0.26,"r"],["gon",0.24,""],["kfy",0.22,""],["doi",0.2,""],["kru",0.19,""],["sck",0.18,""],["wbq",0.18,""],["xnr",0.16,""],["khn",0.15,""],["tcy",0.15,""],["wbr",0.15,""],["brx",0.14,""],["sd_Deva",0.14,"r"],["noe",0.13,""],["bhb",0.12,""],["mni",0.11,""],["hi_Latn",0.1,""],["raj",0.1,""],["hoc",0.099,""],["mtr",0.097,""],["unr",0.094,""],["bhi",0.092,""],["hoj",0.082,""],["kha",0.08,"r"],["kfr",0.075,""],["grt",0.053,""],["unx",0.048,""],["bfy",0.037,""],["srx",0.035,""],["saz",0.029,""],["ccp",0.028,""],["bfq",0.023,""],["njo",0.023,""],["wsg",0.021,""],["ria",0.013,""],["bo",0.011,""],["bpy",0.007,""],["bft",0.006,""],["bra",0.004,""],["lep",0.004,""],["btv",0.003,""],["kxv",0.003,""],["lah",0.003,""],["lif",0.003,""],["mrh",0.003,""],["kht",0.001,""],["sa",0.001,"r"],["dv",0.0,""],["dz",0.0,""],["pi_Deva",0.0,""]],"ID":[["id",64.0,"o"],["jv",34.0,""],["su",12.0,""],["mad",6.3,""],["ms",3.4,""],["min",3.0,""],["bew",2.1,""],["ban",1.8,""],["bug",1.6,""],["bjn",1.5,""],["ace",1.4,""],["ms_Arab",1.2,""],["sas",0.97,""],["bbc",0.92,""],["zh_Hant",0.92,""],["mak",0.73,""],["ljp",0.69,""],["rej",0.46,""],["gor",0.41,""],["nij",0.37,""],["kge",0.32,""],["aoz",0.27,""],["kvr",0.14,""],["lbw",0.13,""],["gay",0.12,""],["rob",0.11,""],["mdr",0.092,""],["sxn",0.092,""],["sly",0.054,""],["mwv",0.024,""],["ban_Bali",0.0,""],["kaw",0.0,""]],"IR":[["fa",75.0,"o"],["az_Arab",24.0,""],["mzn",5.0,""],["glk",4.6,""],["sdh",4.5,""],["tk",2.8,""],["lrc",2.1,""],["ar",2.0,""],["bal",2.0,""],["rmt",1.9,""],["bqi",1.4,""],["luz",1.2,""],["lki",0.76,""],["kaa",0.67,""],["ckb",0.63,""],["bgn",0.56,""],["ku_Arab",0.56,""],["prd",0.5,""],["hy",0.24,""],["ps",0.16,""],["ka",0.071,""],["gbz",0.009,""],["kk_Arab",0.003,""]],"IQ":[["ar",68.0,"o"],["en",35.0,""],["ckb",12.0,"r"],["ku_Arab",10.0,""],["az_Arab",1.8,"r"],["fa",0.87,""],["lrc",0.61,""],["syr",0.5,""]],"IE":[["en",98.0,"o"],["ga",22.0,"o"],["fr",13.0,""]],"IL":[["he",100.0,"o"],["en",85.0,""],["ar",20.0,"o"],["apc",17.0,""],["ru",11.0,""],["ro",3.7,""],["yi",3.0,""],["pl",1.5,""],["lad",1.3,""],["hu",1.0,""],["am",0.59,""],["ti",0.11,""],["ml",0.085,""]],"IT":[["it",95.0,"o"],["en",34.0,""],["fr",20.0,"r"],["lmo",5.7,""],["sc",1.7,""],["de",1.6,""],["vec",1.3,"r"],["pms",1.1,""],["nap",0.97,""],["lij",0.86,""],["scn",0.82,""],["sdc",0.17,""],["sl",0.17,""],["fur",0.06,""],["egl",0.05,""],["lld",0.048,""],["ca",0.035,""],["el",0.035,""],["hr",0.006,""],["mhn",0.002,""],["rgn",0.0,""]],"JM":[["en",98.0,"o"],["jam",95.0,""]],"JP":[["ja",95.0,"o"],["ryu",0.77,""],["ko",0.52,""]],"JO":[["ar",100.0,"o"],["apc",66.0,""],["en",45.0,""],["ady",1.0,""]],"KZ":[["ru",72.0,"o"],["kk",64.0,"o"],["en",15.0,""],["de",6.4,""],["ug_Cyrl",2.0,""],["kaa",0.018,""]],"KE":[["sw",66.0,"o"],["en",19.0,"o"],["ki",17.0,""],["luy",11.0,""],["luo",9.8,""],["kam",7.6,""],["kln",7.6,""],["guz",4.9,""],["mer",4.0,""],["mas",1.6,""],["ebu",1.5,""],["so",1.3,""],["dav",0.82,""],["teo",0.74,""],["pko",0.69,""],["om",0.47,""],["saq",0.46,""],["ar",0.046,""],["pa",0.017,""],["gu",0.009,""]],"KI":[["en",100.0,"o"],["gil",60.0,"o"]],"KP":[["ko",88.0,"o"]],"KR":[["ko",100.0,"o"]],"KW":[["ar",100.0,"o"]],"KG":[["ky",48.0,"o"],["ru",36.0,"o"],["kaa",0.019,""]],"LA":[["lo",69.0,"o"],["kjg",5.8,""],["hnj",3.0,""],["mww",2.3,""],["kdt",0.96,""]],"LV":[["lv",61.0,"o"],["en",46.0,""],["ru",38.0,""],["ltg",8.9,""]],"LB":[["apc",100.0,""],["ar",86.0,"o"],["en",40.0,""],["fr",38.0,""],["hy",5.2,""],["ku_Arab",1.7,""]],"LS":[["st",98.0,"o"],["en",27.0,"o"],["zu",14.0,""],["ss",2.4,""],["xh",0.99,""]],"LR":[["en",83.0,"o"],["lir",74.0,""],["kpe",20.0,""],["bsq",14.0,""],["kro",10.0,""],["grb",9.9,""],["dnj",7.9,""],["mev",7.2,""],["kss",4.3,""],["vai",3.8,""],["bza",2.9,""],["men",1.7,""],["ff",0.0,""],["ff_Adlm",0.0,""],["vai_Latn",0.0,""]],"LY":[["ar",74.0,"o"]],"LI":[["de",100.0,"o"],["gsw",85.0,"o"],["wae",3.2,""]],"LT":[["lt",86.0,"o"],["ru",80.0,""],["en",38.0,""],["de",14.0,""],["sgs",0.0,""]],"LU":[["fr",92.0,"o"],["lb",67.0,"o"],["de",63.0,"o"],["en",56.0,""],["pt",16.0,""]],"MG":[["mg",90.0,"o"],["fr",27.0,"o"],["en",18.0,"o"]],"MW":[["en",63.0,"o"],["ny",63.0,"o"],["tum",8.4,""],["tog",0.98,""],["zu",0.33,""]],"MY":[["ms",75.0,"o"],["en",21.0,""],["zh",17.0,""],["ta",4.2,""],["iba",2.5,""],["jv",1.2,""],["zmi",1.2,""],["dtp",0.56,""],["ml",0.15,""],["bug",0.079,""],["bjn",0.014,""]],"MV":[["dv",98.0,"o"],["en",75.0,""]],"ML":[["bm",46.0,""],["fr",17.0,"o"],["ffm",7.7,""],["snk",5.9,""],["mwk",5.0,""],["ses",3.4,""],["tmh",2.1,""],["bm_Nkoo",2.0,""],["khq",1.7,""],["dtm",1.1,""],["kao",1.0,""],["ar",0.9,""],["bmq",0.86,""],["bze",0.85,""]],"MT":[["mt",100.0,"o"],["en",88.0,"o"],["it",56.0,""],["fr",13.0,""]],"MH":[["en",93.0,"o"],["mh",73.0,"o"]],"MR":[["mey",87.0,""],["ar",85.0,"o"],["fr",13.0,""],["ff",5.7,""],["wo",0.23,""],["ff_Adlm",0.0,""]],"MU":[["mfe",90.0,""],["fr",73.0,"o"],["en",72.0,"o"],["bho",8.6,""],["ur",5.2,""],["ta",2.5,""]],"MX":[["es",83.0,"o"],["en",13.0,""],["yua",0.67,""],["nhe",0.39,""],["nhw",0.39,""],["maz",0.34,""],["nch",0.19,""],["vec",0.002,""],["sei",0.001,""]],"FM":[["en",57.0,"o"],["chk",30.0,""],["pon",23.0,""],["kos",8.0,""],["yap",6.6,""],["uli",3.0,""]],"MD":[["ro",63.0,"o"],["uk",14.0,""],["bg",9.4,""],["gag",3.3,""],["ru",3.0,""]],"MC":[["fr",97.0,"o"]],"MN":[["mn",93.0,"o"],["kk_Arab",7.2,""],["zh",1.4,""],["ru",0.12,""],["ug_Cyrl",0.03,""]],"ME":[["sr_Latn",100.0,"o"],["sq",7.9,""],["sr",5.0,""]],"MA":[["ary",87.0,""],["ar",62.0,"o"],["fr",36.0,"o"],["zgh",22.0,""],["en",14.0,""],["tzm",9.8,"o"],["shi",8.7,""],["shi_Latn",8.7,""],["rif",4.9,""],["rif_Tfng",4.9,""],["mey",0.82,""],["es",0.065,""]],"MZ":[["pt",27.0,"o"],["vmw",13.0,""],["ndc",9.9,""],["ts",7.9,""],["ngl",6.8,""],["seh",4.6,""],["mgh",4.5,""],["rng",3.4,""],["ny",2.6,""],["yao",2.4,""],["sw",0.028,""],["zu",0.005,""]],"MM":[["my",64.0,"o"],["shn",6.4,""],["kac",1.7,""],["rhg",1.7,""],["mnw",1.5,""],["mrh",0.036,""],["hnj",0.022,""],["stu",0.017,""],["kht",0.007,""],["pi_Mymr",0.0,""]],"NA":[["af",75.0,""],["kj",35.0,""],["ng",21.0,""],["naq",11.0,""],["hz",9.1,""],["en",7.0,"o"],["de",0.9,""],["tn",0.56,""]],"NR":[["en",95.0,"o"],["na",70.0,"o"]],"NP":[["ne",44.0,"o"],["mai",11.0,""],["bho",6.8,""],["new",3.3,""],["jml",3.2,""],["en",3.0,""],["dty",2.5,""],["awa",2.2,""],["thl",2.0,""],["bap",1.5,""],["tdg",1.3,""],["thr",1.2,""],["lif",1.1,""],["mgp",1.1,""],["thq",1.0,""],["bfy",0.54,""],["xsr",0.52,""],["rjs",0.44,""],["taj",0.43,""],["hi",0.42,""],["gvr",0.29,""],["bo",0.24,""],["tkt",0.24,""],["suz",0.13,""],["tdh",0.12,""],["bn",0.094,""],["unr_Deva",0.018,""],["lep",0.009,""]],"NL":[["nl",100.0,"o"],["en",90.0,""],["de",71.0,""],["fr",19.0,""],["nds",11.0,""],["li",5.5,""],["fy",4.3,"r"],["gos",3.6,""],["id",1.8,""],["zea",1.4,""],["rif",1.2,""],["tr",1.2,""]],"NZ":[["en",98.0,"o"],["mi",2.8,"o"]],"NI":[["es",78.0,"o"]],"NE":[["ha",41.0,""],["dje",17.0,""],["fr",13.0,"o"],["fuq",7.0,""],["tmh",6.0,""],["ar",0.21,""],["twq",0.03,""],["ff",0.0,""],["ff_Adlm",0.0,""]],"NG":[["en",53.0,"o"],["pcm",21.0,""],["ha",13.0,""],["ig",13.0,""],["yo",13.0,"o"],["fuv",6.7,""],["tiv",1.6,""],["efi",1.4,""],["ibb",1.4,""],["ha_Arab",1.0,""],["bin",0.71,""],["kaj",0.21,""],["kcg",0.093,""],["ar",0.071,""],["cch",0.021,""],["amo",0.009,""],["ann",0.0,""],["ff",0.0,""],["ff_Adlm",0.0,""]],"MK":[["mk",67.0,"o"],["sq",25.0,"r"],["tr",3.5,""]],"NO":[["nb",100.0,"o"],["no",100.0,"o"],["nn",25.0,"o"],["se",0.29,"r"]],"OM":[["ar",81.0,"o"],["bal",4.9,""],["fa",0.94,""]],"PK":[["ur",95.0,"o"],["pa_Arab",70.0,""],["en",50.0,"o"],["lah",40.0,""],["ps",16.0,""],["sd",15.0,""],["skr",12.0,""],["bal",2.6,""],["hno",1.7,""],["brh",1.2,""],["fa",0.66,""],["bgn",0.57,""],["hnd",0.41,""],["tg_Arab",0.33,""],["gju",0.2,""],["bft",0.18,""],["kvx",0.16,""],["khw",0.15,""],["mvy",0.14,""],["gjk",0.11,""],["kxp",0.11,""],["ks",0.069,""],["trw",0.053,""],["btv",0.019,""]],"PW":[["pau",74.0,"o"],["en",8.6,"o"]],"PA":[["es",69.0,"o"],["en",14.0,""],["zh_Hant",0.13,""]],"PG":[["tpi",71.0,"o"],["en",50.0,"o"],["ho",2.1,"o"]],"PY":[["gn",69.0,"o"],["es",67.0,"o"],["de",2.9,""],["cag",0.23,""],["gun",0.16,""],["enl",0.13,""],["pta",0.13,""],["enx",0.075,""],["ayo",0.036,""],["ceg",0.03,""],["mca",0.027,""],["tmf",0.027,""],["spn",0.025,""],["guq",0.024,""],["aqt",0.017,""],["nhd",0.016,""],["gva",0.0,""]],"PE":[["es",73.0,"o"],["qu",15.0,"o"],["ay",1.6,""]],"PH":[["en",64.0,"o"],["fil",60.0,"o"],["es",31.0,""],["ceb",24.0,"r"],["ilo",9.6,"r"],["hil",8.4,"r"],["bik",3.0,""],["war",2.9,"r"],["fbl",2.3,""],["pam",2.3,""],["pag",1.4,"r"],["mdh",1.2,"r"],["tsg",1.1,"r"],["zh_Hant",0.73,""],["cps",0.66,""],["krj",0.39,""],["bto",0.28,""],["hnn",0.016,""],["tbw",0.009,""],["bku",0.007,""]],"PL":[["pl",96.0,"o"],["en",33.0,""],["de",19.0,"r"],["ru",18.0,""],["szl",1.3,""],["be",0.58,""],["uk",0.39,""],["csb",0.13,"r"],["sli",0.031,""],["lt",0.021,"r"],["prg",0.0,""]],"PT":[["pt",96.0,"o"],["en",27.0,""],["fr",15.0,""],["es",10.0,""],["gl",0.14,""]],"QA":[["ar",89.0,"o"],["fa",11.0,""],["ml",0.25,""]],"RO":[["ro",90.0,"o"],["en",31.0,""],["fr",12.0,""],["es",10.0,""],["hu",6.6,""],["de",0.21,""],["tr",0.13,""],["sr_Latn",0.12,""],["bg",0.037,""],["el",0.023,""],["pl",0.015,""]],"RU":[["ru",99.0,"o"],["en",3.8,""],["tt",2.4,"r"],["cv",1.3,""],["ce",1.1,"r"],["hy",0.84,""],["ba",0.8,"r"],["de",0.79,""],["av",0.48,"r"],["uk",0.46,""],["kbd",0.34,"r"],["myv",0.31,"r"],["kum",0.3,"r"],["sah",0.28,"r"],["dar",0.27,""],["os",0.26,""],["inh",0.25,"r"],["bua",0.23,"r"],["az_Cyrl",0.22,"r"],["lez",0.21,"r"],["mdf",0.21,"r"],["kk",0.2,""],["krc",0.2,"r"],["chm",0.19,""],["tyv",0.19,"r"],["udm",0.19,"r"],["uz",0.17,""],["tg",0.16,""],["ady",0.081,"r"],["kv",0.081,"r"],["xal",0.08,""],["lbe",0.065,"r"],["ka",0.06,""],["alt",0.047,""],["be",0.045,""],["pnt_Cyrl",0.04,""],["koi",0.031,"r"],["abq",0.021,""],["xdq",0.015,""],["mrj",0.011,""],["fi",0.01,""],["krl",0.01,""],["sr",0.004,""],["mn",0.003,""],["vep",0.002,""],["cu",0.001,""],["izh",0.0,""],["kaa",0.0,""],["vot",0.0,""]],"RW":[["rw",77.0,"o"],["en",15.0,"o"],["fr",5.8,"o"]],"KN":[["en",98.0,"o"]],"LC":[["en",90.0,"o"]],"VC":[["en",96.0,"o"]],"WS":[["sm",100.0,"o"],["en",2.1,"o"]],"SM":[["it",89.0,"o"],["eo",0.85,""]],"ST":[["pt",85.0,"o"],["fr",20.0,""]],"SA":[["ar",100.0,"o"],["ars",3.0,""]],"SN":[["wo",70.0,"o"],["fr",26.0,"o"],["ff",21.0,"r"],["srr",11.0,"r"],["dyo",2.6,"r"],["sav",1.5,"r"],["mfv",0.77,"r"],["bjt",0.61,"r"],["snf",0.24,"r"],["knf",0.21,"r"],["bsc",0.097,"r"],["mey_Latn",0.038,"r"],["tnr",0.018,"r"],["ff_Adlm",0.0,""]],"RS":[["sr",99.0,"o"],["sr_Latn",99.0,"o"],["sq",19.0,""],["hu",4.8,"r"],["ro",2.1,"r"],["hr",0.93,"r"],["sk",0.85,"r"],["uk",0.0,"r"]],"SC":[["crs",98.0,""],["fr",53.0,"o"],["en",38.0,"o"]],"SL":[["kri",95.0,""],["en",35.0,"o"],["men",27.0,""],["tem",26.0,""],["sus",3.0,""],["ff",0.0,""],["ff_Adlm",0.0,""]],"SG":[["en",80.0,"o"],["zh",62.0,"o"],["ms",19.0,"o"],["nan",5.8,""],["ta",4.9,"o"],["hak",4.3,""],["fil",2.6,""],["yue",2.1,""],["id",2.0,""],["jv",1.5,""],["bn",1.3,""],["cdo",0.9,""],["th",0.7,""],["ja",0.6,""],["cpx",0.4,""],["mad",0.4,""],["ml",0.4,""],["pa",0.4,""],["mnp",0.3,""]],"SK":[["sk",90.0,"o"],["cs",47.0,""],["en",26.0,""],["de",22.0,""],["hu",11.0,""],["uk",1.9,""],["pl",0.93,""]],"SI":[["sl",87.0,"o"],["hr",61.0,""],["en",59.0,""],["de",42.0,""],["vec",1.4,"r"],["hu",0.44,""],["it",0.19,""]],"SB":[["en",100.0,"o"],["pis",82.0,""],["rug",1.4,""]],"SO":[["so",78.0,"o"],["ar",34.0,"o"],["sw",2.0,""],["om",0.42,""]],"ZA":[["en",31.0,"o"],["zu",24.0,"r"],["xh",18.0,"r"],["af",13.0,"r"],["nso",9.4,"r"],["tn",8.2,"r"],["st",7.9,"r"],["ts",4.4,"r"],["ss",2.7,"r"],["ve",2.3,"r"],["hi",2.0,""],["nr",1.6,"r"],["sw",0.002,""]],"SS":[["ar",27.0,""],["en",27.0,"o"],["nus",5.6,""]],"ES":[["es",99.0,"o"],["en",24.0,""],["ca",17.0,"r"],["gl",7.0,"r"],["eu",2.0,"r"],["ast",1.3,"r"],["ext",0.49,""],["an",0.052,""],["oc",0.01,"r"]],"LK":[["si",68.0,"o"],["ta",15.0,"o"],["en",10.0,""],["pi_Sinh",0.0,""]],"SD":[["apd",61.0,""],["ar",61.0,"o"],["en",61.0,"o"],["bej",5.4,""],["fvr",2.7,""],["ha_Arab",1.8,""],["mls",0.99,""],["fia",0.83,""],["zag",0.51,""]],"SR":[["nl",90.0,"o"],["srn",68.0,""],["zh_Hant",1.1,""],["hnj",0.36,""]],"SE":[["sv",95.0,"o"],["en",86.0,""],["fi",2.2,"r"],["fit",0.55,""],["se",0.33,""],["rmu",0.09,""],["yi",0.028,""],["smj",0.014,""],["sma",0.003,""],["ia",0.0,""]],"CH":[["de",76.0,"o"],["gsw",66.0,"o"],["en",45.0,""],["fr",39.0,"o"],["it",15.0,"o"],["lmo",4.1,""],["pt",3.4,""],["rm",0.5,"r"],["rmo",0.29,""],["wae",0.11,""]],"SY":[["apc",85.0,""],["ar",80.0,"o"],["ku",8.0,""],["fr",5.9,""],["hy",1.8,""],["syr",0.084,""]],"TJ":[["tg",100.0,"o"],["ru",12.0,""],["fa",0.78,""],["ar",0.01,""]],"TZ":[["sw",90.0,"o"],["en",69.0,"o"],["suk",8.7,""],["nym",3.3,""],["kde",2.5,""],["bez",1.7,""],["ksb",1.7,""],["mas",1.5,""],["mgy",1.4,""],["asa",1.2,""],["lag",0.87,""],["jmc",0.74,""],["rof",0.74,""],["vun",0.74,""],["rwk",0.22,""],["sbp",0.2,""]],"TH":[["th",80.0,"o"],["en",27.0,""],["tts",24.0,""],["nod",9.6,""],["sou",8.0,""],["mfa",5.0,""],["zh_Hant",1.8,""],["kxm",1.7,""],["kdt",0.48,""],["mnw",0.17,""],["hnj",0.098,""],["shn",0.096,""],["mww",0.047,""],["lcp",0.01,""],["lwl",0.01,""],["pi_Thai",0.0,""]],"TL":[["pt",59.0,"o"],["tet",59.0,"o"]],"TG":[["fr",41.0,"o"],["ee",17.0,""],["ife",1.3,""],["blo",0.15,""]],"TO":[["to",95.0,"o"],["en",28.0,"o"]],"TT":[["en",88.0,"o"],["es",0.29,""]],"TN":[["aeb",90.0,""],["ar",90.0,"o"],["fr",53.0,"o"]],"TR":[["tr",93.0,"o"],["en",17.0,""],["ku",5.5,""],["apc",5.2,""],["zza",1.4,""],["kbd",0.77,""],["az",0.74,""],["az_Arab",0.65,""],["ar",0.56,""],["bgx",0.46,""],["bg",0.42,""],["ady",0.39,""],["kiu",0.19,""],["kaa",0.1,""],["hy",0.056,""],["ka",0.056,""],["sr_Latn",0.028,""],["lzz",0.025,""],["sq",0.021,""],["abq_Latn",0.015,""],["pnt_Latn",0.006,""],["ab",0.005,""],["el",0.005,""],["tru",0.004,""],["uz",0.002,""],["kk",0.001,""],["ky_Latn",0.001,""]],"TM":[["tk",70.0,"o"],["ru",12.0,""],["uz",9.0,""],["ku_Cyrl",0.4,""],["kaa",0.1,""]],"TV":[["tvl",85.0,"o"],["en",9.1,"o"]],"UG":[["sw",75.0,"o"],["lg",13.0,""],["nyn",6.3,""],["cgg",5.4,""],["xog",5.3,""],["en",3.9,"o"],["teo",3.9,""],["laj",3.8,""],["ach",3.7,""],["myx",2.9,""],["rw",2.1,""],["ttj",1.9,""],["hi",0.004,""]],"UA":[["uk",65.0,"o"],["ru",46.0,"o"],["pl",2.4,""],["yi",1.3,""],["rue",1.2,""],["be",0.83,""],["crh",0.56,""],["ro",0.52,""],["bg",0.49,""],["tr",0.42,""],["hu",0.37,""],["el",0.02,""]],"AE":[["ar",78.0,"o"],["en",50.0,""],["ml",7.0,""],["ps",2.9,""],["bal",2.3,""],["fa",1.9,""]],"GB":[["en",98.0,"o"],["fr",17.0,""],["de",9.0,""],["es",8.0,""],["pl",4.0,""],["pa",3.6,""],["ur",3.5,""],["ta",3.2,""],["gu",2.9,""],["sco",2.5,""],["cy",1.3,"r"],["ro",0.8,""],["bn",0.4,""],["ar",0.3,""],["zh_Hant",0.3,""],["it",0.2,""],["lt",0.2,""],["pt",0.2,""],["so",0.2,""],["tr",0.2,""],["ga",0.15,"r"],["gd",0.11,"r"],["kw",0.003,""],["en_Shaw",0.0,""],["pi",0.0,""]],"US":[["en",96.0,"o"],["es",9.6,"r"],["zh_Hant",0.69,""],["fr",0.56,""],["de",0.47,""],["fil",0.42,""],["it",0.34,""],["vi",0.34,""],["ko",0.3,""],["ru",0.24,""],["mww",0.068,""],["nv",0.05,""],["yi",0.049,""],["pdc",0.039,""],["hnj",0.035,""],["haw",0.009,"r"],["chr",0.008,""],["frc",0.008,""],["dak",0.006,""],["esu",0.006,""],["cho",0.003,""],["ik",0.002,""],["lkt",0.002,""],["mus",0.001,""],["cad",0.0,""],["cic",0.0,""],["io",0.0,""],["jbo",0.0,""],["oka",0.0,""],["osa",0.0,""]],"UY":[["es",88.0,"o"]],"UZ":[["uz",85.0,"o"],["uz_Cyrl",15.0,"o"],["ru",14.0,""],["kaa",2.1,""],["tr",0.62,""]],"VU":[["bi",90.0,"o"],["en",83.0,"o"],["fr",31.0,"o"]],"VA":[["it",82.0,"o"],["la",82.0,""]],"VE":[["es",82.0,"o"],["yrl",0.006,""]],"VN":[["vi",86.0,"o"],["mww",1.4,""],["zh_Hant",1.1,""],["blt",0.69,""],["hnj",0.17,""],["cjm",0.089,""]],"YE":[["ar",74.0,"o"],["en",9.0,""]],"ZM":[["bem",34.0,""],["ny",19.0,""],["en",16.0,"o"],["toi",11.0,""],["loz",5.5,""],["nse",3.0,""],["leb",2.8,""],["tum",2.6,""],["kqn",1.9,""],["lun",1.9,""],["lue",1.5,""]],"ZW":[["sn",81.0,"o"],["en",42.0,"o"],["nd",12.0,"o"],["mxc",6.5,""],["ndc",6.1,""],["kck",5.3,""],["ny",1.9,""],["ve",0.64,""],["tn",0.22,""]],"PS":[["ar",100.0,"o"],["apc",87.0,""]],"TW":[["zh_Hant",95.0,"o"],["nan_Hant",57.0,"o"],["hak_Hant",11.0,"o"],["trv",0.02,""]],"XK":[["sq",92.0,"o"],["aln",74.0,""],["sr",5.0,"o"],["sr_Latn",5.0,"o"]]},"iso3":{"aa":"aar","ab":"abk","af":"afr","ak":"twi","am":"amh","ar":"ara","an":"arg","as":"asm","av":"ava","ae":"ave","ay":"aym","az":"aze","ba":"bak","bm":"bam","be":"bel","bn":"ben","bi":"bis","bo":"bod","bs":"bos","br":"bre","bg":"bul","ca":"cat","cs":"ces","ch":"cha","ce":"che","cu":"chu","cv":"chv","kw":"cor","co":"cos","cr":"cre","cy":"cym","da":"dan","de":"deu","dv":"div","dz":"dzo","el":"ell","en":"eng","eo":"epo","et":"est","eu":"eus","ee":"ewe","fo":"fao","fa":"fas","fj":"fij","fi":"fin","fr":"fra","fy":"fry","ff":"ful","gd":"gla","ga":"gle","gl":"glg","gv":"glv","gn":"grn","gu":"guj","ht":"hat","ha":"hau","he":"heb","hz":"her","hi":"hin","ho":"hmo","hr":"hrv","hu":"hun","hy":"hye","ig":"ibo","io":"ido","ii":"iii","iu":"iku","ie":"ile","ia":"ina","id":"ind","ik":"ipk","is":"isl","it":"ita","jv":"jav","ja":"jpn","kl":"kal","kn":"kan","ks":"kas","ka":"kat","kr":"kau","kk":"kaz","km":"khm","ki":"kik","rw":"kin","ky":"kir","kv":"kom","kg":"kon","ko":"kor","kj":"kua","ku":"kur","lo":"lao","la":"lat","lv":"lav","li":"lim","ln":"lin","lt":"lit","lb":"ltz","lu":"lub","lg":"lug","mh":"mah","ml":"mal","mr":"mar","mk":"mkd","mg":"mlg","mt":"mlt","ro":"ron","mn":"mon","mi":"mri","ms":"msa","my":"mya","na":"nau","nv":"nav","nr":"nbl","nd":"nde","ng":"ndo","ne":"nep","nl":"nld","nn":"nno","nb":"nob","no":"nor","ny":"nya","oc":"oci","oj":"oji","or":"ori","om":"orm","os":"oss","pa":"pan","pi":"pli","pl":"pol","pt":"por","ps":"pus","qu":"que","rm":"roh","rn":"run","ru":"rus","sg":"sag","sa":"san","si":"sin","sk":"slk","sl":"slv","se":"sme","sm":"smo","sn":"sna","sd":"snd","so":"som","st":"sot","es":"spa","sq":"sqi","sc":"srd","sr":"srp","ss":"ssw","su":"sun","sw":"swa","sv":"swe","ty":"tah","ta":"tam","tt":"tat","te":"tel","tg":"tgk","th":"tha","ti":"tir","to":"ton","tn":"tsn","ts":"tso","tk":"tuk","tr":"tur","ug":"uig","uk":"ukr","ur":"urd","uz":"uzb","ve":"ven","vi":"vie","vo":"vol","wa":"wln","wo":"wol","xh":"xho","yi":"yid","yo":"yor","za":"zha","zh":"zho","zu":"zul"}};

  // shown in each drawer header, so it is clear which version is running (and never stops the script if unavailable)
  const VERSION = (() => { try { return GM_info.script.version; } catch { return '?'; } })();
  const W = unsafeWindow;
  const PREFIX = 'originle:daily:v1:';
  const DAY_MS = 86400000;
  const sched = W.ORIGINLE_SCHEDULE;
  const daily = W.ORIGINLE_DAILY;
  const day = W.ORIGINLE_DAY;
  const puzzle = day && daily && !daily.blocked && daily.id ? daily.id : null;
  document.documentElement.dataset.originleCompanion = '1'; // tells the old Tracker script (1.3+) to step aside
  // Old Tracker versions (1.0–1.2) predate that signal: hide their tab here. Their history still reaches the
  // Companion once Tampermonkey updates them to 1.3+, and the Companion rebuilds the rest from the game's saves.
  const hideOldTracker = () => {
    for (const node of document.documentElement.children) {
      const tab = node.shadowRoot && node.shadowRoot.querySelector('button.tab');
      if (tab && /^Originle [▸◂]$/.test(tab.textContent)) node.remove();
    }
  };

  /* ── features: one switch each, in the Tampermonkey menu ─────────────────────────────── */
  const FEATURES = [
    {key: 'tracker', label: 'Tracker', where: 'history drawer + archive countries', def: true},
    {key: 'listen', label: 'Listen', where: 'drawer', def: true},
    {key: 'map', label: 'Map', where: 'drawer', def: true},
    {key: 'board', label: 'Board', where: 'drawer', def: true},
    {key: 'slow', label: 'Slow / loop', where: "buttons by the game's replay", def: true},
    {key: 'tv', label: 'TV mode', where: 'bigger text', def: false},
    {key: 'ev', label: 'Guess-or-reveal', where: 'note by "Reveal next clue"', def: false},
    {key: 'debrief', label: 'Debrief', where: 'on the result screen', def: false},
    {key: 'called', label: 'Who called it', where: 'needs Board', def: false, needs: 'board'}
  ];
  const switches = GM_getValue('features', {});
  const chosen = f => (f.key in switches ? switches[f.key] : f.def);
  const on = key => {
    const f = FEATURES.find(x => x.key === key);
    return chosen(f) && (!f.needs || on(f.needs));
  };
  for (const f of FEATURES) {
    const blocked = f.needs && !on(f.needs);
    GM_registerMenuCommand(`${chosen(f) ? '✓' : '✗'}  ${f.label}  (${blocked ? 'turn on Board first' : f.where})`, () => {
      switches[f.key] = !chosen(f);
      GM_setValue('features', switches);
      location.reload();
    });
  }

  /* ── shared helpers ─────────────────────────────────────────────────────────────────── */
  const el = (tag, cls, text, attrs) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    if (attrs) for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    return node;
  };
  const button = (text, cls, onclick, title) => {
    const b = el('button', cls, text, {type: 'button'});
    if (title) b.title = title;
    b.onclick = onclick;
    return b;
  };
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const pct = n => (n >= 10 ? Math.round(n) : n >= 1 ? n.toFixed(1).replace(/\.0$/, '') : n < 0.1 ? '<0.1' : n.toFixed(1)) + '%';
  const gameState = id => { try { return JSON.parse(localStorage.getItem(PREFIX + id)) || {}; } catch { return {}; } };

  let regionDN = null, langDN = null;
  try { regionDN = new Intl.DisplayNames(['en'], {type: 'region'}); langDN = new Intl.DisplayNames(['en'], {type: 'language'}); } catch { /* names fall back to codes */ }
  const COUNTRIES = DATA.codes.map(code => ({code, name: DATA.fixed[code] || (regionDN ? regionDN.of(code) : code)}))
    .sort((a, b) => a.name.localeCompare(b.name));
  const countryName = code => (COUNTRIES.find(c => c.code === code) || {name: code}).name;
  const countryByName = name => COUNTRIES.find(c => norm(c.name) === norm(name.trim()));
  const langName = code => { // Intl's English name, else Glottolog's name, else the code
    let name = code;
    try { name = langDN.of(code.replace('_', '-')); } catch { /* fall through */ }
    return name && name !== code ? name : (DATA.points[code] && DATA.points[code][3]) || code;
  };

  // language -> [[country, percent, status]] (inverted from CLDR's country -> languages)
  const BY_LANG = {};
  for (const [country, rows] of Object.entries(DATA.langs)) {
    for (const [lang, share, status] of rows) (BY_LANG[lang] = BY_LANG[lang] || []).push([country, share, status]);
  }
  for (const rows of Object.values(BY_LANG)) rows.sort((a, b) => b[1] - a[1]);
  const LANGS = Object.keys(BY_LANG).map(code => ({code, name: langName(code)})).sort((a, b) => a.name.localeCompare(b.name));
  const langByName = name => LANGS.find(l => norm(l.name) === norm(name.trim()));
  const STATUS = {o: 'official', r: 'official regional'};

  /* ── UI shell: one shadow root on <html>, so the game's CSS and page swaps can't touch it ── */
  const host = el('div');
  const root = host.attachShadow({mode: 'open'});
  const style = el('style');
  style.textContent = `
    :host { all: initial; font: 13px/1.4 system-ui, -apple-system, sans-serif; color: #262a2b; }
    :host(.tv) { font-size: 17px; }
    * { box-sizing: border-box; }
    button, input, textarea { font: inherit; color: inherit; }
    button { cursor: pointer; background: #fff; border: 1px solid #0002; border-radius: 6px; padding: 3px 8px; }
    button:hover { border-color: #0005; }
    button.on { background: #262a2b; color: #fff; border-color: #262a2b; }
    input, textarea { background: #fff; border: 1px solid #0002; border-radius: 6px; padding: 4px 8px; }
    h3 { margin: 0 0 8px; font-size: 1.15em; }
    .muted { color: #6a6f70; font-size: .88em; }
    .rail { position: fixed; left: 0; top: 50%; translate: 0 -50%; display: flex; flex-direction: column; gap: 6px; z-index: 2147483646; transition: left .18s; }
    .rail button { writing-mode: vertical-rl; rotate: 180deg; background: #262a2b; color: #fff; border: 0; border-radius: 8px 0 0 8px; padding: 12px 6px; box-shadow: 0 2px 8px #0003; letter-spacing: .04em; }
    .rail button.open { background: #ef873a; }
    .drawer { position: fixed; left: 0; top: 7vh; height: 86vh; width: min(var(--dw, 400px), 92vw); background: #f6f6f6; border: 1px solid #0002; border-left: 0; border-radius: 0 14px 14px 0;
      box-shadow: 0 8px 28px #0004; padding: 14px; overflow: auto; z-index: 2147483646; }
    .drawer[hidden], .float[hidden], [hidden] { display: none !important; }
    .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
    .row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 10px; }
    .grid div { background: #fff; border-radius: 8px; padding: 6px; text-align: center; }
    .grid b { display: block; font-size: 1.2em; }
    .grid span { font-size: .82em; color: #666; }
    .entry { display: grid; grid-template-columns: 3.2em 1fr auto; gap: 2px 8px; padding: 7px 0; border-top: 1px solid #0001; }
    .entry .score { font-weight: 600; text-align: right; }
    .entry .sub { grid-column: 2 / 4; color: #666; font-size: .85em; }
    .list { margin: 8px 0; }
    .list > div { display: flex; align-items: center; gap: 6px; padding: 4px 0; border-top: 1px solid #0001; }
    .list .grow { flex: 1; }
    .chips { display: flex; flex-wrap: wrap; gap: 4px; margin: 6px 0; }
    .chips button { border-radius: 999px; padding: 2px 10px; }
    .links a { display: block; background: #fff; border: 1px solid #0002; border-radius: 8px; padding: 8px 10px; margin: 6px 0; color: inherit; text-decoration: none; }
    .links a:hover { border-color: #0006; }
    .map { width: 100%; height: 52vh; background: #fff; border-radius: 10px; display: block; touch-action: none; }
    .legend { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-top: 6px; }
    .legend i { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: -2px; margin-right: 4px; }
    .group { margin-top: 10px; }
    .group > b { display: block; margin-bottom: 2px; }
    .item { display: flex; flex-direction: column; gap: 4px; padding: 6px 0; border-top: 1px solid #0001; }
    .item .why { width: 100%; }
    .spacer { flex: 1; }
    .seg button { border-radius: 0; margin-left: -1px; }
    .seg button:first-child { border-radius: 6px 0 0 6px; }
    .seg button:last-child { border-radius: 0 6px 6px 0; }
    .float { position: fixed; z-index: 2147483645; }
    .bar { display: flex; gap: 4px; align-items: center; background: #fffc; border: 1px solid #0002; border-radius: 999px; padding: 3px 6px; }
    .bar button { border: 0; background: none; padding: 2px 7px; border-radius: 999px; }
    .bar button.on { background: #262a2b; color: #fff; }
    .note { font-size: .9em; color: #4a4f50; max-width: 300px; }
    .stack { position: fixed; left: 48px; bottom: 80px; display: flex; flex-direction: column-reverse; gap: 6px; width: min(300px, 80vw); z-index: 2147483645; }
    .card .toggle { border: 0; background: none; padding: 0; text-align: left; width: 100%; }
    .card { background: #f6f6f6; border: 1px solid #0002; border-radius: 12px; box-shadow: 0 4px 16px #0003; padding: 10px; }
    .card textarea { width: 100%; min-height: 70px; resize: vertical; margin-top: 6px; }
  `;
  root.append(style);
  document.documentElement.append(host);
  if (on('tv')) host.classList.add('tv');

  /* ── drawers: stacked tabs on the left edge, only one open at a time ───────────────── */
  const rail = el('div', 'rail');
  const drawers = {};
  let openKey = null;
  function addDrawer(key, label, hotkey, width, build, onOpen) {
    const panel = el('div', 'drawer');
    panel.hidden = true;
    panel.style.setProperty('--dw', width + 'px');
    const tab = button(label, '', () => toggleDrawer(key), `${label} (press ${hotkey.toUpperCase()})`);
    rail.append(tab);
    root.append(panel);
    drawers[key] = {panel, tab, hotkey, built: false, build, onOpen};
  }
  function toggleDrawer(key, force) {
    const next = force === true ? key : openKey === key ? null : key;
    for (const [k, d] of Object.entries(drawers)) {
      d.panel.hidden = k !== next;
      d.tab.classList.toggle('open', k === next);
    }
    openKey = next;
    rail.style.left = next ? drawers[next].panel.getBoundingClientRect().width + 'px' : '0';
    if (!next) return;
    const d = drawers[next];
    if (!d.built) { d.built = true; d.build(d.panel); }
    if (d.onOpen) d.onOpen();
  }
  window.addEventListener('keydown', e => {
    const target = e.composedPath()[0];
    if (e.metaKey || e.ctrlKey || e.altKey || !target || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
    if (e.key === 'Escape' && openKey) { toggleDrawer(openKey); return; }
    const hit = Object.entries(drawers).find(([, d]) => d.hotkey === e.key.toLowerCase());
    if (hit) toggleDrawer(hit[0]);
  });
  window.addEventListener('resize', () => { if (openKey) rail.style.left = drawers[openKey].panel.getBoundingClientRect().width + 'px'; });

  // A search box with suggestions; calls pick(item) when the text matches one entry exactly.
  function searchBox(items, placeholder, pick) {
    const id = 'dl-' + Math.random().toString(36).slice(2);
    const input = el('input', '', null, {list: id, placeholder});
    input.style.flex = '1';
    const list = el('datalist', '', null, {id});
    for (const item of items) list.append(el('option', '', null, {value: item.name}));
    const choose = () => {
      const hit = items.find(i => norm(i.name) === norm(input.value.trim()));
      if (hit) { pick(hit); input.value = ''; }
    };
    input.addEventListener('change', choose);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') choose(); });
    return {input, list};
  }

  /* ── board storage (also read by Map, Listen, Debrief and Who called it) ───────────── */
  const boardKey = () => 'board:' + puzzle;
  const PEOPLE = [['sibel', 'Sibel'], ['kaan', 'Kaan'], ['michael', 'Michael']];
  const OLD_NAMES = {mom: 'sibel', me: 'kaan'}; // version 1.0 called them Mom and Me
  const renamed = obj => {
    const out = {};
    for (const [k, v] of Object.entries(obj || {})) out[OLD_NAMES[k] || k] = v;
    return out;
  };
  const readBoard = () => {
    const board = Object.assign({items: {}}, GM_getValue(boardKey(), {}));
    board.picks = renamed(board.picks);
    return board;
  };
  const boardListeners = [];
  function writeBoard(board) { GM_setValue(boardKey(), board); boardListeners.forEach(f => f()); }
  function setStatus(code, status) {
    const board = readBoard();
    const prev = board.items[code];
    if (prev && prev.s === status) delete board.items[code];
    else board.items[code] = {s: status, why: prev ? prev.why : '', clue: gameState(puzzle).unlocked || 1};
    writeBoard(board);
  }
  const STATUSES = [['likely', 'Likely', '#2e8b57'], ['maybe', 'Maybe', '#d4a017'], ['out', 'Ruled out', '#9a9ea0']];
  function statusButtons(code) {
    const seg = el('span', 'seg row');
    const current = (readBoard().items[code] || {}).s;
    for (const [s, label] of STATUSES) seg.append(button(label, current === s ? 'on' : '', () => setStatus(code, s)));
    return seg;
  }

  /* ── 1. Tracker ─────────────────────────────────────────────────────────────────────── */
  const STORE = 'history';
  const numberOf = id => (sched && Array.isArray(sched.puzzles) ? sched.puzzles.indexOf(id) + 1 : 0);
  const dateOf = n => new Date(Date.parse(sched.launchDate + 'T00:00:00Z') + (n - 1) * DAY_MS).toISOString().slice(0, 10);

  // Results come from the game's own saves, so history is complete for this browser from day one.
  function scan() {
    const history = GM_getValue(STORE, {});
    let changed = false;
    try { // history handed over by the old Tracker script
      const imported = JSON.parse(localStorage.getItem('originle-companion:import') || 'null');
      if (imported) {
        for (const [id, entry] of Object.entries(imported)) if (!history[id]) { history[id] = entry; changed = true; }
        localStorage.removeItem('originle-companion:import');
      }
    } catch { /* ignore a malformed handover */ }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      const id = key.slice(PREFIX.length);
      const result = gameState(id).result;
      if (!result) continue;
      const score = Number.isInteger(result.score) ? result.score : null;
      if (history[id] && (history[id].score !== null || score === null)) continue;
      const guesses = Array.isArray(result.guesses) ? result.guesses : [{country: result.country}];
      const n = numberOf(id);
      history[id] = Object.assign(history[id] || {}, {
        id, n, date: n ? dateOf(n) : null,
        correct: !!result.correct, gaveUp: !!result.gaveUp, score, hints: result.hints,
        marks: guesses.map((g, j) => (result.correct && j === guesses.length - 1 ? '🟩' : '🟥')).join('') + (result.gaveUp ? '🏳️' : ''),
        countries: guesses.map(g => g.country)
      });
      changed = true;
    }
    if (changed) GM_setValue(STORE, history);
    return changed;
  }
  const updateEntry = (id, fields) => {
    const history = GM_getValue(STORE, {});
    if (!history[id]) return;
    Object.assign(history[id], fields);
    GM_setValue(STORE, history);
  };

  // The answer is only in each guest's day.js, so it is fetched for finished puzzles only.
  const tried = new Set();
  async function fillAnswers() {
    for (const e of Object.values(GM_getValue(STORE, {}))) {
      if (e.answer || tried.has(e.id)) continue;
      tried.add(e.id);
      let answer = null, answerCode = null;
      try {
        if (day && puzzle === e.id) { answer = day.country; answerCode = day.answer; }
        else {
          const text = await (await fetch(`/${e.id}/day.js`)).text();
          answer = (text.match(/"country"\s*:\s*"([^"]+)"/) || [])[1] || null;
          answerCode = (text.match(/"answer"\s*:\s*"([A-Z]{2})"/) || [])[1] || null;
        }
      } catch { /* retried on the next page load */ }
      if (answer) updateEntry(e.id, {answer, answerCode});
    }
  }

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

  function trackerStats(entries) {
    const scored = entries.filter(e => e.score !== null);
    const solved = new Set(entries.filter(e => e.correct && e.n).map(e => e.n));
    const today = daily ? daily.today : 0;
    let current = 0;
    for (let n = solved.has(today) ? today : today - 1; solved.has(n); n--) current++;
    let best = 0, run = 0;
    for (const n of [...solved].sort((a, b) => a - b)) { run = solved.has(n - 1) ? run + 1 : 1; best = Math.max(best, run); }
    const cells = [
      ['Played', entries.length],
      ['Solved', entries.filter(e => e.correct).length],
      ['Avg score', scored.length ? Math.round(scored.reduce((s, e) => s + e.score, 0) / scored.length).toLocaleString() : '–'],
      ['Best score', scored.length ? Math.max(...scored.map(e => e.score)).toLocaleString() : '–'],
      ['Streak', current],
      ['Best streak', best]
    ];
    if (on('called')) {
      for (const [who, label] of PEOPLE) cells.push([`${label} called it`, entries.filter(e => renamed(e.called)[who]).length]);
    }
    return cells;
  }

  function renderTracker(panel) {
    const history = GM_getValue(STORE, {});
    const entries = Object.values(history).sort((a, b) => (b.n || 0) - (a.n || 0));
    const grid = el('div', 'grid');
    for (const [label, value] of trackerStats(entries)) {
      const cell = el('div');
      cell.append(el('b', '', String(value)), el('span', '', label));
      grid.append(cell);
    }
    const rows = entries.map(e => {
      const row = el('div', 'entry');
      const name = e.id.charAt(0).toUpperCase() + e.id.slice(1);
      row.append(
        el('span', '', e.n ? '#' + String(e.n).padStart(3, '0') : '#?'),
        el('span', '', `${name}${e.answer ? ' → ' + e.answer : ''}${e.date ? ' · ' + e.date : ''}`),
        el('span', 'score', e.score === null ? '–' : e.score.toLocaleString()),
        el('span', 'sub', `${e.marks} · ${e.hints}/8 clues · ${e.correct ? 'solved' : e.gaveUp ? 'gave up' : 'missed'} · ${(e.countries || []).join(', ')}`)
      );
      if (on('debrief') && e.debrief) row.append(el('span', 'sub', '“' + e.debrief + '”'));
      return row;
    });
    const copy = button('Copy JSON', '', () => navigator.clipboard.writeText(JSON.stringify(history, null, 2)).then(() => { copy.textContent = 'Copied'; }));
    panel.replaceChildren(el('div', 'head'), grid, ...(rows.length ? rows : [el('p', 'muted', 'No finished puzzles recorded yet.')]), copy);
    panel.firstChild.append(el('h3', '', 'Tracker'), el('span', 'muted', `T · v${VERSION}`));
  }

  if (on('tracker')) addDrawer('tracker', 'Tracker', 't', 360, renderTracker, () => renderTracker(drawers.tracker.panel));

  /* ── 2. Map (language overlay) ──────────────────────────────────────────────────────── */
  const SHADES = [[50, '#1f4e8c', '50%+'], [10, '#4a7cc0', '10–50%'], [1, '#8fb0dd', '1–10%'], [0, '#d3e0f2', 'under 1%']];
  const shade = share => (SHADES.find(([min]) => share >= min) || SHADES[3])[1];
  const mapView = {lang: null, country: null, draw: null};
  const globeLockIndex = day && Array.isArray(day.clues) ? day.clues.findIndex(c => c[0] === day.globeLocksAtClue) : -1;
  const mapLocked = () => {
    const s = gameState(puzzle);
    return !s.result && globeLockIndex >= 0 && (s.unlocked || 1) > globeLockIndex;
  };
  function showOnMap(lang) {
    mapView.lang = lang;
    mapView.country = null;
    toggleDrawer('map', true);
  }

  function buildMap(panel) {
    const head = el('div', 'head');
    head.append(el('h3', '', 'Map'), el('span', 'muted', `M · scroll to zoom, drag to pan · v${VERSION}`));
    const search = searchBox(LANGS, 'Show where a language is spoken…', l => { mapView.lang = l.code; mapView.country = null; mapView.draw(); });
    const clear = button('Clear', ''); // wired up once the map exists
    const controls = el('div', 'row');
    controls.append(search.input, search.list, clear);
    const lock = el('p', 'muted', 'The game has closed its globe for the final clue, so this map is closed too. It reopens on the result screen.');
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'map');
    const legend = el('div', 'legend muted');
    const info = el('div');
    const source = el('p', 'muted', `Language shares: Unicode CLDR ${DATA.cldr} (share of each country's population that speaks it, including as a second language). Bold outline: official there. Purple dots: where each language is centred, from Glottolog ${DATA.glottolog}; one point per language, not its full area.`);
    panel.append(head, controls, lock, svg, legend, info, source);

    const d3 = W.d3, topojson = W.topojson;
    if (!d3 || !topojson) { svg.replaceWith(el('p', 'muted', 'Map libraries are not loaded on this page.')); return; }
    let features = [], ready = false, projection = null, path = null;
    const g = d3.select(svg).append('g');
    const layers = Object.fromEntries(['countries', 'labels', 'board', 'langs'].map(name => [name, g.append('g')]));
    const labelSize = () => (on('tv') ? 15 : 11);
    const resize = k => { // keep text and dots the same size on screen at any zoom
      g.selectAll('text').attr('font-size', labelSize() / k).attr('stroke-width', 3 / k);
      layers.board.selectAll('circle').attr('r', 5 / k);
      layers.langs.selectAll('circle').attr('r', d => (d.lang === mapView.lang ? 6 : 4) / k).attr('stroke-width', 1.5 / k);
      layers.labels.selectAll('text').attr('dy', -7 / k);
      layers.langs.selectAll('text').attr('dy', -8 / k);
    };
    const zoom = d3.zoom().scaleExtent([1, 24]).on('zoom', e => { g.attr('transform', e.transform); resize(e.transform.k); });
    d3.select(svg).call(zoom);
    const featureCode = name => (name in DATA.featureAliases ? DATA.featureAliases[name] : (countryByName(name) || {}).code || null);
    function zoomTo(code) { // fit a country (or the world, with no code) into the map
      const {width, height} = svg.getBoundingClientRect();
      const f = code && features.find(x => x.code === code);
      let t = d3.zoomIdentity;
      if (f && path) {
        const [[x0, y0], [x1, y1]] = path.bounds(f);
        const k = Math.max(1, Math.min(12, 0.8 / Math.max((x1 - x0) / width, (y1 - y0) / height)));
        t = d3.zoomIdentity.translate(width / 2 - k * (x0 + x1) / 2, height / 2 - k * (y0 + y1) / 2).scale(k);
      }
      d3.select(svg).transition().duration(500).call(zoom.transform, t);
    }
    mapView.selectCountry = code => { mapView.country = code; mapView.draw(); zoomTo(code); };
    clear.onclick = () => { mapView.lang = null; mapView.country = null; mapView.draw(); zoomTo(null); };

    fetch(location.origin + '/assets/vendor/countries-50m.json').then(r => r.json()).then(topo => {
      features = topojson.feature(topo, topo.objects.countries).features.filter(f => f.properties.name !== 'Antarctica');
      for (const f of features) f.code = featureCode(f.properties.name);
      ready = true;
      mapView.draw();
    }).catch(() => svg.replaceWith(el('p', 'muted', 'Could not load the world map.')));

    mapView.draw = function draw() {
      const locked = puzzle && mapLocked();
      lock.hidden = !locked;
      svg.style.display = locked ? 'none' : '';
      legend.hidden = locked;
      info.hidden = locked;
      if (locked || !ready) return;
      const {width, height} = svg.getBoundingClientRect();
      projection = d3.geoNaturalEarth1().fitSize([width, height], {type: 'Sphere'});
      path = d3.geoPath(projection);
      const shares = {};
      if (mapView.lang) for (const [c, share, status] of BY_LANG[mapView.lang] || []) shares[c] = {share, status};
      const board = puzzle && on('board') ? readBoard().items : {};
      const k = d3.zoomTransform(svg).k;
      const text = sel => sel.attr('text-anchor', 'middle').attr('font-family', 'system-ui, sans-serif').attr('paint-order', 'stroke')
        .attr('stroke', '#fff').attr('stroke-linejoin', 'round').style('pointer-events', 'none');

      layers.countries.selectAll('path').data(features).join('path')
        .attr('d', path)
        .attr('fill', f => (shares[f.code] ? shade(shares[f.code].share) : mapView.country && f.code === mapView.country ? '#f1d3b8' : '#ececec'))
        .attr('stroke', f => (mapView.country && f.code === mapView.country ? '#ef873a' : shares[f.code] && shares[f.code].status ? '#13325c' : '#ffffff'))
        .attr('stroke-width', f => (mapView.country && f.code === mapView.country ? 2 : shares[f.code] && shares[f.code].status ? 1.6 : 0.6))
        .attr('vector-effect', 'non-scaling-stroke')
        .style('cursor', f => (f.code ? 'pointer' : 'default'))
        .on('click', (e, f) => { if (f.code) mapView.selectCountry(f.code); })
        .selectAll('title').data(f => [f]).join('title')
        .text(f => (f.code ? countryName(f.code) : f.properties.name) + (shares[f.code] ? ` · ${pct(shares[f.code].share)}` : ''));

      const labelled = features.filter(f => f.code && ((shares[f.code] && shares[f.code].share >= 1) || (mapView.country && f.code === mapView.country) || board[f.code]));
      layers.board.selectAll('circle').data(labelled.filter(f => board[f.code]), f => f.code).join('circle')
        .attr('cx', f => path.centroid(f)[0]).attr('cy', f => path.centroid(f)[1])
        .attr('fill', f => STATUSES.find(s => s[0] === board[f.code].s)[2]).attr('stroke', '#fff').attr('vector-effect', 'non-scaling-stroke');
      // the selected country's own name is left to its language points, which say more
      text(layers.labels.selectAll('text').data(labelled.filter(f => f.code !== mapView.country), f => f.code).join('text'))
        .attr('x', f => path.centroid(f)[0]).attr('y', f => path.centroid(f)[1]).attr('fill', '#262a2b')
        .text(f => countryName(f.code));

      // Glottolog points: where each language is centred, which shows the region inside a country
      const pointLangs = new Set();
      if (mapView.lang && DATA.points[mapView.lang]) pointLangs.add(mapView.lang);
      if (mapView.country) for (const [lang] of (DATA.langs[mapView.country] || []).slice(0, 15)) if (DATA.points[lang]) pointLangs.add(lang);
      const dots = [...pointLangs].map(lang => ({lang, xy: projection([DATA.points[lang][1], DATA.points[lang][0]])}));
      layers.langs.selectAll('circle').data(dots, d => d.lang).join('circle')
        .attr('cx', d => d.xy[0]).attr('cy', d => d.xy[1])
        .attr('fill', d => (d.lang === mapView.lang ? '#ef873a' : '#7a4fb5')).attr('stroke', '#fff')
        .style('cursor', 'pointer').on('click', (e, d) => { mapView.lang = d.lang; draw(); })
        .selectAll('title').data(d => [d]).join('title').text(d => `${langName(d.lang)} · Glottolog point`);
      text(layers.langs.selectAll('text').data(dots, d => d.lang).join('text'))
        .attr('x', d => d.xy[0]).attr('y', d => d.xy[1]).attr('fill', d => (d.lang === mapView.lang ? '#a4520f' : '#4b2d73'))
        .text(d => langName(d.lang));
      resize(k);

      legend.replaceChildren();
      if (mapView.lang) for (const [, color, label] of SHADES) { const s = el('span', '', label); s.prepend(el('i', '', null, {style: `background:${color}`})); legend.append(s); }
      if (Object.keys(board).length) for (const [, label, color] of STATUSES) { const s = el('span', '', label); s.prepend(el('i', '', null, {style: `background:${color};border-radius:50%`})); legend.append(s); }
      if (dots.length) {
        const s = el('span', '', 'where a language is centred (Glottolog)');
        s.prepend(el('i', '', null, {style: 'background:#7a4fb5;border-radius:50%'}));
        legend.append(s);
      }

      info.replaceChildren();
      if (mapView.country) {
        const rows = DATA.langs[mapView.country] || [];
        const box = el('div', 'group');
        const title = el('div', 'row');
        title.append(el('b', '', countryName(mapView.country)));
        if (puzzle && on('board')) title.append(statusButtons(mapView.country));
        box.append(title, el('span', 'muted', 'Languages spoken here (click one to map it):'));
        const list = el('div', 'list');
        for (const [lang, share, status] of rows.slice(0, 12)) {
          const r = el('div');
          r.append(button(langName(lang), lang === mapView.lang ? 'on' : '', () => { mapView.lang = lang; draw(); }),
            el('span', 'grow muted', `${pct(share)}${status ? ' · ' + STATUS[status] : ''}`));
          if (on('listen')) r.append(button('Listen', '', () => showInListen(lang)));
          list.append(r);
        }
        if (!rows.length) list.append(el('span', 'muted', 'CLDR has no language data for this country.'));
        box.append(list);
        info.append(box);
      }
      if (mapView.lang) {
        const box = el('div', 'group');
        const title = el('div', 'row');
        title.append(el('b', '', `Where ${langName(mapView.lang)} is spoken`));
        if (on('listen')) title.append(button('Listen', '', () => showInListen(mapView.lang)));
        box.append(title);
        const list = el('div', 'list');
        for (const [c, share, status] of (BY_LANG[mapView.lang] || []).slice(0, 15)) {
          const r = el('div');
          r.append(button(countryName(c), c === mapView.country ? 'on' : '', () => mapView.selectCountry(c)),
            el('span', 'grow muted', `${pct(share)}${status ? ' · ' + STATUS[status] : ''}`));
          list.append(r);
        }
        box.append(list);
        info.append(box);
      }
      if (!mapView.lang && !mapView.country) info.append(el('p', 'muted', 'Search a language above, or click a country to see what is spoken there.'));
    };
    boardListeners.push(() => { if (openKey === 'map') mapView.draw(); });
  }
  if (puzzle && on('map')) addDrawer('map', 'Map', 'm', 540, buildMap, () => requestAnimationFrame(() => mapView.draw && mapView.draw()));

  /* ── 3. Listen (links to labelled recordings, no hand-picked clips) ─────────────────── */
  const listenView = {lang: null, render: null};
  function showInListen(lang) {
    listenView.lang = lang;
    toggleDrawer('listen', true);
  }
  function pauseGuest() { // uses the game's own pause button, so the game knows it is paused
    const freeze = document.getElementById('freeze');
    const video = document.getElementById('guest-video');
    if (freeze && video && !video.paused && freeze.getAttribute('aria-pressed') !== 'true') freeze.click();
  }
  // Wikitongues videos on Wikimedia Commons, filed by language in "Category:Wikitongues videos in <Language>".
  // Titles name the speaker and language ("WIKITONGUES- Sai speaking Tamil"), so each clip carries its own label.
  const clipCache = {};
  const commonsQuery = async params => {
    const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams(Object.assign({
      action: 'query', format: 'json', origin: '*', prop: 'imageinfo|videoinfo',
      iiprop: 'url|mime|extmetadata', iiextmetadatafilter: 'LicenseShortName', viprop: 'derivatives'
    }, params));
    const data = await (await fetch(url)).json();
    if (data.error) throw new Error(data.error.code);
    return Object.values((data.query && data.query.pages) || {}).map(p => {
      const info = (p.imageinfo || [])[0] || {};
      const derivatives = ((p.videoinfo || [])[0] || {}).derivatives || [];
      // a mid-size transcode streams faster than the original upload
      const pick = derivatives.filter(d => /webm|mp4/.test(d.type) && d.height && d.height <= 480).sort((a, b) => b.height - a.height)[0];
      return {
        file: p.title,
        title: p.title.replace(/^File:/, '').replace(/\.(webm|ogv|mp4)$/i, '').replace(/^WIKITONGUES-?\s*/i, ''),
        src: pick ? pick.src : info.url,
        page: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`,
        license: ((info.extmetadata || {}).LicenseShortName || {}).value || ''
      };
    }).filter(c => c.src).sort((a, b) => a.title.localeCompare(b.title));
  };
  // Every Wikitongues upload is titled "<speaker> speaking <language>". Anything else in these categories
  // (e.g. a slideshow filed under Arabic by mistake) is not a native-speaker recording, so it is left out.
  const isSpeaker = clip => /\bspeaking\b/i.test(clip.file);
  async function commonsClips(code) {
    const base = code.split('_')[0];
    const names = [...new Set([langName(code), langName(base), DATA.points[code] && DATA.points[code][3], DATA.points[base] && DATA.points[base][3]].filter(Boolean))];
    const seen = new Set(), exact = [], varieties = [];
    const keep = (list, into) => { for (const c of list) if (isSpeaker(c) && !seen.has(c.file)) { seen.add(c.file); into.push(c); } };
    for (const name of names) { // 1. the exact category, e.g. "Wikitongues videos in Tamil"
      keep(await commonsQuery({generator: 'categorymembers', gcmtitle: `Category:Wikitongues videos in ${name}`, gcmtype: 'file', gcmlimit: '50'}), exact);
    }
    for (const name of names) { // 2. titles naming the language, which also finds varieties ("… speaking Levantine Arabic")
      // the language must be what is spoken: "… speaking (Levantine) Arabic", "… speaking French and Arabic",
      // not "… speaking English about Arabic food"
      const said = new RegExp(`speaking\\b[^.]*?\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b\\s*(\\([^)]*\\))?\\s*((and|&|,)\\s.*)?$`, 'i');
      try {
        keep((await commonsQuery({generator: 'search', gsrnamespace: '6', gsrlimit: '50', gsrsearch: `intitle:WIKITONGUES intitle:speaking intitle:"${name}"`}))
          .filter(c => said.test(c.title)), varieties);
      } catch { /* search busy: the exact category still counts */ }
    }
    return {category: names.join(' or '), exact, varieties};
  }
  function showClips(code, box) {
    box.replaceChildren(el('b', '', 'Clips: native speakers (Wikitongues, via Wikimedia Commons)'), el('p', 'muted', 'Loading…'));
    (clipCache[code] = clipCache[code] || commonsClips(code)).then(({category, exact, varieties}) => {
      if (listenView.lang !== code) return;
      box.replaceChildren(el('b', '', 'Clips: native speakers (Wikitongues, via Wikimedia Commons)'));
      if (!exact.length && !varieties.length) { box.append(el('p', 'muted', `Commons has no Wikitongues speaker clips for ${category}. Try the links below.`)); return; }
      const section = (label, clips) => {
        if (!clips.length) return;
        if (label) box.append(el('p', 'muted', label));
        const list = el('div', 'list');
        for (const clip of clips) {
          const row = el('div');
          row.style.flexDirection = 'column';
          row.style.alignItems = 'stretch';
          const top = el('div', 'row');
          const play = button('▶ Play', '', () => {
            for (const v of box.querySelectorAll('video')) v.remove(); // one clip at a time
            const video = el('video', '', null, {controls: '', autoplay: '', src: clip.src});
            video.style.width = '100%';
            video.style.borderRadius = '8px';
            video.addEventListener('play', pauseGuest);
            row.append(video);
          });
          const source = el('a', 'muted', clip.license ? `Commons · ${clip.license}` : 'Commons', {href: clip.page, target: '_blank', rel: 'noopener'});
          top.append(play, el('span', 'grow', clip.title), source);
          row.append(top);
          list.append(row);
        }
        box.append(list);
      };
      section(null, exact);
      section(exact.length ? 'Varieties and related clips (the title names the variety):' : 'No clips filed under the language itself; these titles name a variety of it:', varieties);
    }).catch(() => {
      delete clipCache[code];
      if (listenView.lang === code) box.replaceChildren(el('b', '', 'Clips'), el('p', 'muted', 'Couldn’t reach Wikimedia Commons right now. Pick the language again to retry, or use the links below.'));
    });
  }
  function buildListen(panel) {
    const head = el('div', 'head');
    head.append(el('h3', '', 'Listen'), el('span', 'muted', `L · v${VERSION}`));
    const search = searchBox(LANGS, 'Pick a language to listen to…', l => { listenView.lang = l.code; listenView.render(); });
    const controls = el('div', 'row');
    controls.append(search.input, search.list);
    const recent = el('div', 'chips');
    const body = el('div');
    panel.append(head, controls, recent, body);

    listenView.render = function render() {
      const recents = GM_getValue('recentLangs', []);
      if (listenView.lang && recents[0] !== listenView.lang) {
        GM_setValue('recentLangs', [listenView.lang, ...recents.filter(c => c !== listenView.lang)].slice(0, 8));
      }
      recent.replaceChildren(...GM_getValue('recentLangs', []).map(c => button(langName(c), c === listenView.lang ? 'on' : '', () => { listenView.lang = c; render(); })));
      body.replaceChildren();
      if (!listenView.lang) { body.append(el('p', 'muted', 'Pick a language to get recordings of it. Recent picks stay above for quick back-and-forth.')); return; }
      const code = listenView.lang, base = code.split('_')[0];
      const name = langName(code), baseName = langName(base);
      const iso3 = base.length === 3 ? base : DATA.iso3[base];
      body.append(el('h3', '', name));
      const links = el('div', 'links');
      const link = (title, sub, url) => {
        const a = el('a', '', null, {href: url, target: 'originle-listen'});
        a.append(el('b', '', title + ' ↗'), el('div', 'muted', sub));
        a.onclick = e => { e.preventDefault(); pauseGuest(); window.open(url, 'originle-listen', 'popup,width=980,height=820'); };
        links.append(a);
      };
      if (iso3) link('Native speakers: Wikitongues', `Videos of people speaking ${baseName}, labelled by the speakers themselves.`, `https://wikitongues.org/languages/${iso3}/`);
      link('English with this accent: Speech Accent Archive', `The same English paragraph read by native ${baseName} speakers. Some languages have no samples.`,
        `https://accent.gmu.edu/browse_language.php?function=find&language=${encodeURIComponent(baseName.toLowerCase())}`);
      const clips = el('div', 'group');
      body.append(clips, links, el('p', 'muted', 'These links open in a separate window on your Mac and pause the guest. A tab cast won’t show that window; the clips above play right here, so they do show on the TV.'));
      showClips(code, clips);
      const where = BY_LANG[code] || [];
      if (where.length) {
        const box = el('div', 'group');
        const title = el('div', 'row');
        title.append(el('b', '', 'Where it’s spoken'));
        if (on('map')) title.append(button('Show on map', '', () => showOnMap(code)));
        box.append(title);
        const list = el('div', 'list');
        for (const [c, share, status] of where.slice(0, 8)) {
          const r = el('div');
          r.append(el('span', 'grow', `${countryName(c)} · ${pct(share)}${status ? ' · ' + STATUS[status] : ''}`));
          if (on('board')) r.append(statusButtons(c));
          list.append(r);
        }
        box.append(list);
        body.append(box);
      }
    };
    boardListeners.push(() => { if (openKey === 'listen') listenView.render(); });
  }
  if (puzzle && on('listen')) addDrawer('listen', 'Listen', 'l', 380, buildListen, () => listenView.render && listenView.render());

  /* ── 4. Board ───────────────────────────────────────────────────────────────────────── */
  function buildBoard(panel) {
    const render = () => {
      const board = readBoard();
      const result = gameState(puzzle).result;
      const head = el('div', 'head');
      head.append(el('h3', '', `Board · No. ${String(daily.number).padStart(3, '0')}`), el('span', 'muted', `B · v${VERSION}`));
      const search = searchBox(COUNTRIES, 'Add a country…', c => setStatus(c.code, 'maybe'));
      const controls = el('div', 'row');
      controls.append(search.input, search.list);
      const groups = [];
      for (const [s, label, color] of STATUSES) {
        const codes = Object.keys(board.items).filter(c => board.items[c].s === s).sort((a, b) => countryName(a).localeCompare(countryName(b)));
        if (!codes.length) continue;
        const group = el('div', 'group');
        const title = el('b', '', `${label} (${codes.length})`);
        title.style.color = color === '#9a9ea0' ? '#6a6f70' : color;
        group.append(title);
        for (const code of codes) {
          const item = el('div', 'item');
          const name = el('div', 'row');
          name.append(el('b', '', countryName(code)), el('span', 'muted', `added at clue ${board.items[code].clue}`), el('span', 'spacer'));
          if (on('called')) {
            for (const [who, label] of PEOPLE) {
              const picked = board.picks[who] === code;
              const b = button(label, picked ? 'on' : '', () => { const fresh = readBoard(); fresh.picks[who] = picked ? null : code; writeBoard(fresh); },
                result ? 'Picks lock once the game ends' : `${label}'s pick`);
              b.disabled = !!result;
              name.append(b);
            }
          }
          const actions = el('div', 'row');
          actions.append(statusButtons(code), button('✕', '', () => { const fresh = readBoard(); delete fresh.items[code]; writeBoard(fresh); }, 'Remove'));
          const why = el('input', 'why', null, {placeholder: 'why? (e.g. sounded tonal, ruled out at clue 2)'});
          why.value = board.items[code].why || '';
          why.addEventListener('change', () => { const fresh = readBoard(); if (fresh.items[code]) { fresh.items[code].why = why.value; GM_setValue(boardKey(), fresh); } });
          item.append(name, actions, why);
          group.append(item);
        }
        groups.push(group);
      }
      if (!groups.length) groups.push(el('p', 'muted', 'Add countries here, or from the Map and Listen drawers. Click a status again to remove it.'));
      panel.replaceChildren(head, controls, ...groups);
    };
    boardListeners.push(() => { if (openKey === 'board') render(); });
    drawers.board.render = render;
    render();
  }
  if (puzzle && on('board')) addDrawer('board', 'Board', 'b', 380, buildBoard, () => drawers.board.render && drawers.board.render());

  for (const key of ['tracker', 'listen', 'map', 'board']) if (drawers[key]) rail.append(drawers[key].tab); // menu order
  root.append(rail);

  /* ── anchored pieces: placed next to the game controls they belong to ──────────────── */
  const anchors = [];
  function anchor(node, targetSelector, place) {
    node.classList.add('float');
    root.append(node);
    anchors.push(() => {
      const target = document.querySelector(targetSelector);
      const rect = target && target.getBoundingClientRect();
      const visible = rect && rect.width > 0 && rect.height > 0 && getComputedStyle(target).visibility !== 'hidden';
      if (!visible || node.dataset.off === '1') { node.hidden = true; return; }
      node.hidden = false;
      place(node, rect);
    });
  }

  /* ── 5. Slow / loop ─────────────────────────────────────────────────────────────────── */
  if (puzzle && on('slow')) {
    const video = document.getElementById('guest-video');
    const RATES = [1, 0.75, 0.5];
    let rate = 1, loopA = null, loopB = null;
    const bar = el('div', 'bar');
    const speed = button('1×', '', () => { rate = RATES[(RATES.indexOf(rate) + 1) % RATES.length]; apply(); }, 'Playback speed (pitch stays the same)');
    const markA = button('Loop from here', '', () => { loopA = video.currentTime; loopB = null; apply(); }, 'Mark where the loop starts');
    const markB = button('to here', '', () => { if (loopA !== null && video.currentTime > loopA + 0.3) { loopB = video.currentTime; video.currentTime = loopA; apply(); } }, 'Mark where the loop ends');
    const stop = button('✕', '', () => { loopA = loopB = null; apply(); }, 'Stop looping');
    bar.append(speed, markA, markB, stop);
    function apply() {
      if (!video) return;
      video.preservesPitch = true;
      video.defaultPlaybackRate = rate;
      video.playbackRate = rate;
      speed.textContent = rate + '×';
      speed.classList.toggle('on', rate !== 1);
      markA.textContent = loopA === null ? 'Loop from here' : `Loop ${loopA.toFixed(1)}s`;
      markA.classList.toggle('on', loopA !== null);
      markB.hidden = loopA === null || loopB !== null;
      markB.textContent = 'to here';
      stop.hidden = loopA === null;
      if (loopB !== null) markA.textContent = `Looping ${loopA.toFixed(1)}–${loopB.toFixed(1)}s`;
    }
    if (video) {
      video.addEventListener('loadstart', () => { loopA = loopB = null; apply(); }); // a new clip clears the loop
      video.addEventListener('loadedmetadata', apply);
      video.addEventListener('play', () => { if (video.playbackRate !== rate) apply(); });
      video.addEventListener('timeupdate', () => { if (loopB !== null && video.currentTime >= loopB) video.currentTime = loopA; });
      video.addEventListener('ended', () => { if (loopB !== null) { video.currentTime = loopA; video.play(); } });
    }
    apply();
    anchor(bar, '#playback', (node, rect) => { node.style.left = rect.right + 12 + 'px'; node.style.top = rect.top + rect.height / 2 - node.offsetHeight / 2 + 'px'; });
  }

  /* ── 6. Guess-or-reveal ─────────────────────────────────────────────────────────────── */
  if (puzzle && on('ev')) {
    const note = el('div', 'note');
    anchor(note, '#nextrow', (node, rect) => {
      const S = W.OriginleScoring, s = gameState(puzzle), total = day.clues.length;
      const u = s.unlocked || 1, misses = (s.guesses || []).length;
      if (!S || !s.started || s.result || u >= total || S.originalRules(puzzle)) { node.hidden = true; return; }
      const now = S.solvedPoints(u, misses, total, puzzle);                       // guess now and it's right
      const next = S.solvedPoints(u + 1, misses, total, puzzle);                  // reveal, then get it right
      const missThenNext = misses + 1 < S.GUESSES ? S.solvedPoints(u + 1, misses + 1, total, puzzle) : 0; // guess wrong, reveal, then right
      const breakEven = Math.ceil(((next - missThenNext) / (now - missThenNext)) * 100);
      node.textContent = `Guess now if you're more than ${breakEven}% sure; otherwise reveal clue ${u + 1}.`;
      node.title = `Guess now: ${now.toLocaleString()} if right${missThenNext ? `, about ${missThenNext.toLocaleString()} if wrong and you get it after the next clue` : ', and a miss ends the game'}. ` +
        `Reveal first: ${next.toLocaleString()}. Assumes the next clue would make you certain. Uses the game's own scoring.`;
      node.style.left = rect.left + 'px';
      node.style.top = rect.bottom + 8 + 'px';
    });
  }

  /* ── 7 + 8. Result-screen cards: Debrief, Who called it ─────────────────────────────── */
  const stack = el('div', 'stack');
  root.append(stack);
  anchors.push(() => { // sits in the game's left column, just above its playback bar
    const bar = document.getElementById('playback');
    const rect = bar && bar.getBoundingClientRect();
    if (rect && rect.height) { stack.style.left = Math.max(48, rect.left) + 'px'; stack.style.bottom = innerHeight - rect.top + 12 + 'px'; }
  });
  if (puzzle && on('debrief')) {
    const card = el('div', 'card');
    card.hidden = true;
    const textarea = el('textarea', '', null, {placeholder: 'What tipped you off? (saved with this result)'});
    textarea.hidden = true; // collapsed to one line until clicked, so it never crowds the result screen
    const toggle = button('', 'toggle', () => { textarea.hidden = !textarea.hidden; if (!textarea.hidden) textarea.focus(); });
    card.append(toggle, textarea);
    textarea.addEventListener('input', () => updateEntry(puzzle, {debrief: textarea.value}));
    stack.append(card);
    anchors.push(() => {
      const entry = GM_getValue(STORE, {})[puzzle];
      card.hidden = !entry || !gameState(puzzle).result;
      if (card.hidden) return;
      if (document.activeElement !== host) textarea.value = entry.debrief || '';
      const text = textarea.value.trim();
      toggle.replaceChildren(el('b', '', `Debrief ${textarea.hidden ? '▸' : '▾'} `), el('span', 'muted', text ? '“' + (text.length > 60 ? text.slice(0, 60) + '…' : text) + '”' : 'what tipped you off?'));
    });
  }
  if (puzzle && on('called')) {
    const card = el('div', 'card');
    card.hidden = true;
    stack.append(card);
    anchors.push(() => {
      const result = gameState(puzzle).result;
      const entry = GM_getValue(STORE, {})[puzzle];
      if (!result || !entry || !day.answer) { card.hidden = true; return; }
      const picks = readBoard().picks;
      if (!entry.called) updateEntry(puzzle, {called: Object.fromEntries(PEOPLE.map(([who]) => [who, picks[who] ? picks[who] === day.answer : null]))});
      const line = who => (picks[who] ? `${countryName(picks[who])} ${picks[who] === day.answer ? '✓' : '✗'}` : 'no pick');
      card.replaceChildren(el('b', '', 'Who called it: '), el('span', '', PEOPLE.map(([who, label]) => `${label} ${line(who)}`).join(' · ')));
      card.hidden = false;
    });
  }

  /* ── 9. TV mode: bigger captions (the companion's own text grows via :host(.tv)) ───── */
  if (on('tv')) {
    const tv = el('style');
    tv.textContent = '.cue{font-size:34px!important;line-height:1.25!important}.captions{height:210px!important;top:calc(var(--capb) - 210px)!important}';
    document.head.append(tv);
  }

  /* ── one loop drives recording and placement ────────────────────────────────────────── */
  let ticks = 0;
  function tick() {
    if (ticks++ % 4 === 0) {
      const changed = scan();
      fillAnswers().then(() => { if (on('tracker')) decorateArchive(); });
      if (changed && openKey === 'tracker') renderTracker(drawers.tracker.panel);
      if (openKey === 'map' && mapView.draw) {
        const locked = puzzle && mapLocked();
        if (locked !== mapView.wasLocked) { mapView.wasLocked = locked; mapView.draw(); }
      }
    }
    if (on('tracker')) decorateArchive();
    if (ticks < 60) hideOldTracker();
    anchors.forEach(f => f());
  }
  tick();
  setInterval(tick, 500);
  window.addEventListener('storage', tick);
})();
