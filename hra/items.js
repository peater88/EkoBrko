// Vzdělávací katalog: samostatný sběr plastů, papíru, směsného a rostlinného bioodpadu.
// Zelená nádoba zde sbírá čiré i barevné obalové sklo; místní nálepka má vždy přednost.
const itemCatalog = [
  [
    "🍎",
    "Jádřinec od jablka",
    "bio",
    "Jádřinec je rostlinný zbytek. Do bioodpadu ho dej bez obalu."
  ],
  [
    "🍌",
    "Banánová slupka",
    "bio",
    "Slupka může být součástí bioodpadu, ale nálepku z ní nejprve sundej."
  ],
  [
    "🥕",
    "Odřezky mrkve",
    "bio",
    "Zbytky syrové zeleniny patří do hnědé nádoby bez sáčku."
  ],
  [
    "🥔",
    "Bramborové slupky",
    "bio",
    "Syrové bramborové slupky jsou rostlinný bioodpad."
  ],
  [
    "🧅",
    "Cibulové slupky",
    "bio",
    "Suché slupky z cibule jsou rostlinný materiál."
  ],
  [
    "🥒",
    "Okurkové slupky",
    "bio",
    "Slupky ze zeleniny můžeš vytřídit do hnědé nádoby."
  ],
  [
    "🍉",
    "Melounová slupka",
    "bio",
    "Slupka je rostlinný zbytek. Do bioodpadu patří bez plastové fólie."
  ],
  [
    "🥬",
    "Vnější listy zelí",
    "bio",
    "Listy ze zeleniny patří do rostlinného bioodpadu."
  ],
  [
    "🌽",
    "Kukuřičné listy",
    "bio",
    "Listy z kukuřice jsou přírodní rostlinný materiál."
  ],
  [
    "🍓",
    "Stopky od jahod",
    "bio",
    "Malé zelené stopky patří do hnědé nádoby, plastová vanička zvlášť."
  ],
  [
    "🍒",
    "Třešňové pecky",
    "bio",
    "Pecky z ovoce jsou rostlinný bioodpad."
  ],
  [
    "🥑",
    "Pecka z avokáda",
    "bio",
    "I tvrdá pecka je rostlinný zbytek, který se rozkládá pomaleji."
  ],
  [
    "🍍",
    "Slupka z ananasu",
    "bio",
    "Ovocné slupky se třídí do rostlinného bioodpadu."
  ],
  [
    "🍇",
    "Stonky od hroznů",
    "bio",
    "Stonky jsou rostlinný zbytek. Obal k nim nepatří."
  ],
  [
    "🥦",
    "Košťál brokolice",
    "bio",
    "Nejedlý kus zeleniny patří do hnědé nádoby."
  ],
  [
    "🫑",
    "Semínka a stopka papriky",
    "bio",
    "Zbytky při čištění papriky jsou rostlinný bioodpad."
  ],
  [
    "🥜",
    "Skořápky od ořechů",
    "bio",
    "Ořechové skořápky jsou rostlinného původu, i když jsou tvrdé."
  ],
  [
    "☕",
    "Kávová sedlina bez kapsle",
    "bio",
    "Vytřiď samotnou sedlinu. Kapsle ani plastový kelímek do bioodpadu nepatří."
  ],
  [
    "🍵",
    "Použité lístky sypaného čaje",
    "bio",
    "Samotné čajové lístky jsou rostlinný bioodpad. U sáčků záleží na materiálu."
  ],
  [
    "🌿",
    "Mrkvová nať",
    "bio",
    "Nať je rostlinný bioodpad. Odstraň gumičku nebo provázek."
  ],
  [
    "🧄",
    "Slupky od česneku",
    "bio",
    "Papírově tenké slupky česneku nejsou papír, ale rostlinný zbytek."
  ],
  [
    "🫛",
    "Hrachové lusky",
    "bio",
    "Prázdné lusky jsou rostlinný bioodpad."
  ],
  [
    "🎃",
    "Dýňová dužina a semínka",
    "bio",
    "Syrové zbytky po vydlabání dýně patří do bioodpadu."
  ],
  [
    "🍅",
    "Zbytky syrového rajčete",
    "bio",
    "Zbytky syrové zeleniny do hnědé nádoby patří."
  ],
  [
    "🍆",
    "Stopka lilku",
    "bio",
    "Tvrdá stopka ze zeleniny je také rostlinný bioodpad."
  ],
  [
    "🧴",
    "Prázdná PET lahev od vody",
    "plastic",
    "Prázdnou PET lahev sešlápni a dej do žlutého kontejneru."
  ],
  [
    "🥤",
    "Prázdný plastový kelímek od jogurtu",
    "plastic",
    "Kelímek vyškrábni a vytřiď do plastů. Oddělené kovové víčko patří do kovů."
  ],
  [
    "🛍️",
    "Prázdná plastová taška",
    "plastic",
    "Taška patří do plastů. Do hnědé nádoby ji s bioodpadem nedávej."
  ],
  [
    "📦",
    "Bublinková fólie",
    "plastic",
    "Čistá obalová fólie patří do plastů. Nejdřív ji můžeš použít znovu."
  ],
  [
    "🍞",
    "Prázdný plastový sáček od pečiva",
    "plastic",
    "Celoplastový sáček patří do žlutého kontejneru."
  ],
  [
    "🥛",
    "Prázdná plastová lahev od mléka",
    "plastic",
    "Tato lahev je z plastu, není to nápojový karton. Patří do žluté."
  ],
  [
    "🧴",
    "Prázdná plastová lahev od šamponu",
    "plastic",
    "Vyprázdněný plastový obal od šamponu může do plastů."
  ],
  [
    "🧼",
    "Prázdný plastový obal od tekutého mýdla",
    "plastic",
    "Vyprázdněný obal patří do plastů; nejedná se o obal od nebezpečné chemie."
  ],
  [
    "🧈",
    "Prázdná plastová vanička od margarínu",
    "plastic",
    "Vaničku důkladně vyškrábni a vytřiď do plastů."
  ],
  [
    "🍦",
    "Prázdná plastová krabička od zmrzliny",
    "plastic",
    "Vyprázdněná plastová krabička patří do žluté nádoby."
  ],
  [
    "🥚",
    "Čistý plastový obal od vajec",
    "plastic",
    "Tento obal je z plastu, proto patří do žluté. Papírový obal třídíme jinam."
  ],
  [
    "🍓",
    "Prázdná plastová vanička od jahod",
    "plastic",
    "Plastovou vaničku odděl od zbytků ovoce a vytřiď do plastů."
  ],
  [
    "🧀",
    "Prázdný plastový obal od sýra",
    "plastic",
    "Obal bez zbytků jídla patří do plastů."
  ],
  [
    "🎁",
    "Čistá plastová balicí fólie",
    "plastic",
    "Čistá fólie z obalu je plast, ne papír."
  ],
  [
    "📦",
    "Čistý obalový polystyren",
    "plastic",
    "Malé kusy čistého obalového polystyrenu patří do plastů. Stavební polystyren řešíme zvlášť."
  ],
  [
    "🫙",
    "Prázdná plastová dóza od bonbonů",
    "plastic",
    "Prázdný plastový obal může do žlutého kontejneru."
  ],
  [
    "🍬",
    "Prázdný sáček z plastu označeného PP",
    "plastic",
    "Značka PP označuje polypropylen. Tento prázdný obal patří do plastů."
  ],
  [
    "🧃",
    "Prázdná plastová lahev od džusu",
    "plastic",
    "Třídíme podle materiálu. Plastová lahev patří do žluté nádoby."
  ],
  [
    "🥡",
    "Čistá plastová krabička od salátu",
    "plastic",
    "Krabička je prázdná a bez velkých zbytků jídla, proto může do plastů."
  ],
  [
    "🧢",
    "Plastové víčko od PET lahve",
    "plastic",
    "Plastové víčko patří k plastům; u lahve může zůstat připojené."
  ],
  [
    "🪴",
    "Prázdný malý plastový květináč",
    "plastic",
    "Malý plastový květináč zbav zeminy a vytřiď do plastů."
  ],
  [
    "📀",
    "Prázdná plastová krabička od CD",
    "plastic",
    "Samotná plastová krabička patří do plastů. Disk CD sem nepatří."
  ],
  [
    "📰",
    "Staré noviny",
    "paper",
    "Suché noviny patří do modrého kontejneru."
  ],
  [
    "📦",
    "Čistá kartonová krabice",
    "paper",
    "Krabici rozlož, aby v kontejneru zabrala méně místa."
  ],
  [
    "📓",
    "Popsaný školní sešit",
    "paper",
    "Papírový sešit bez plastového obalu patří do papíru."
  ],
  [
    "✉️",
    "Papírová obálka",
    "paper",
    "Obálku můžeš dát do modrého kontejneru. Malé průhledné okénko nevadí."
  ],
  [
    "📄",
    "Popsaný kancelářský papír",
    "paper",
    "Suchý kancelářský papír můžeme vytřídit do modré nádoby."
  ],
  [
    "🗞️",
    "Reklamní leták z papíru",
    "paper",
    "Běžný papírový leták patří do papíru."
  ],
  [
    "📚",
    "Starý časopis bez laminované obálky",
    "paper",
    "Papírové stránky časopisu patří do modré nádoby."
  ],
  [
    "🎁",
    "Obyčejný papírový balicí papír",
    "paper",
    "Čistý balicí papír bez plastové vrstvy a třpytek patří do papíru."
  ],
  [
    "🛍️",
    "Papírová taška bez laminace",
    "paper",
    "Suchá papírová taška bez plastové povrchové úpravy patří do modré."
  ],
  [
    "🥚",
    "Prázdné papírové plato od vajec",
    "paper",
    "Dnešní sběr papíru přijímá i papírové obaly od vajec. Musí být bez zbytků vajec."
  ],
  [
    "🧻",
    "Papírová rulička od toaletního papíru",
    "paper",
    "Čistou kartonovou ruličku můžeš vytřídit do papíru."
  ],
  [
    "🥣",
    "Prázdná papírová krabice od cereálií",
    "paper",
    "Vnitřní plastový sáček odděl. Papírová krabice patří do modré."
  ],
  [
    "🍵",
    "Prázdná papírová krabička od čaje",
    "paper",
    "Vnější papírová krabička se třídí do papíru."
  ],
  [
    "👟",
    "Prázdná krabice od bot",
    "paper",
    "Suchá kartonová krabice patří do modré. Před vhozením ji rozlož."
  ],
  [
    "🍫",
    "Čistý vnější papírový přebal čokolády",
    "paper",
    "Samotný papírový přebal patří do papíru. Vnitřní obal vytřiď zvlášť podle materiálu."
  ],
  [
    "🎨",
    "Kresba na obyčejném papíru",
    "paper",
    "Kresba tužkou nebo pastelkami je stále papír a patří do modré."
  ],
  [
    "📝",
    "Papírový poznámkový blok",
    "paper",
    "Papírové listy patří do papíru. Plastové desky odděl."
  ],
  [
    "📅",
    "Listy starého papírového kalendáře",
    "paper",
    "Samotné papírové listy patří do modré nádoby."
  ],
  [
    "🗂️",
    "Kartonové desky bez plastového potahu",
    "paper",
    "Čistý karton bez plastové vrstvy patří do papíru."
  ],
  [
    "📦",
    "Papírový obal od zubní pasty",
    "paper",
    "Vnější krabička je papírová. Tuba se třídí samostatně podle materiálu."
  ],
  [
    "📬",
    "Papírová pohlednice bez třpytek",
    "paper",
    "Obyčejná papírová pohlednice bez zvláštních povrchových úprav patří do papíru."
  ],
  [
    "📖",
    "Papírový návod k použití",
    "paper",
    "Samotné papírové stránky návodu patří do modrého kontejneru."
  ],
  [
    "📃",
    "Skartovaný kancelářský papír",
    "paper",
    "Papírové proužky patří do papíru; vlož je v papírovém sáčku, aby se nerozlétaly."
  ],
  [
    "🍾",
    "Prázdná nevratná zelená lahev",
    "glass",
    "Barevné obalové sklo patří do zeleného kontejneru. Vratnou lahev raději vrať."
  ],
  [
    "🫙",
    "Prázdná sklenice od okurek",
    "glass",
    "Skleněný obal vyprázdni. V této hře zelená nádoba sbírá společně čiré i barevné obalové sklo."
  ],
  [
    "🍯",
    "Prázdná sklenice od medu",
    "glass",
    "Prázdné obalové sklo může do zelené. Pokud je vedle bílá nádoba, čiré sklo dej do ní."
  ],
  [
    "🫙",
    "Prázdná sklenice od džemu",
    "glass",
    "Prázdná zavařovací sklenice je obalové sklo. Kovové víčko vytřiď samostatně."
  ],
  [
    "🫙",
    "Prázdná sklenice od hořčice",
    "glass",
    "Vyprázdněný skleněný obal patří do sběru skla."
  ],
  [
    "🧴",
    "Prázdný skleněný flakon od parfému",
    "glass",
    "Prázdný skleněný kosmetický obal patří do skla."
  ],
  [
    "🫙",
    "Prázdná skleněná kořenka",
    "glass",
    "Skleněnou nádobku odděl od plastového uzávěru a vytřiď do skla."
  ],
  [
    "🍾",
    "Prázdná hnědá nevratná lahev",
    "glass",
    "Hnědé obalové sklo patří do zeleného kontejneru."
  ],
  [
    "🧃",
    "Prázdná skleněná lahev od ovocné šťávy",
    "glass",
    "Tato lahev je skleněná, ne plastová. Patří do sběru skla."
  ],
  [
    "🫙",
    "Prázdná sklenička od dětské výživy",
    "glass",
    "Prázdný skleněný obal může do skla, kovové víčko zvlášť do kovů."
  ],
  [
    "🧷",
    "Použitá jednorázová plena",
    "mixed",
    "Použitá plena je hygienický odpad a patří do směsné nádoby."
  ],
  [
    "🏺",
    "Rozbitý malý keramický hrnek",
    "mixed",
    "Keramika není obalové sklo. Malý kus patří do směsného; střepy uklízí dospělý."
  ],
  [
    "🐟",
    "Rybí kosti",
    "mixed",
    "Hnědá nádoba v této hře přijímá rostlinné zbytky. Kosti patří do směsného; doma sleduj pravidla obce."
  ],
  [
    "🤧",
    "Použitý papírový kapesník",
    "mixed",
    "Použitý hygienický papír do modrého kontejneru nepatří."
  ],
  [
    "🧻",
    "Mastná použitá papírová utěrka",
    "mixed",
    "Mastnotou znečištěný hygienický papír patří do směsného."
  ],
  [
    "🍕",
    "Silně mastný kus krabice od pizzy",
    "mixed",
    "Mastný kus do sběru papíru nepatří. Čistou část krabice můžeš oddělit do papíru."
  ],
  [
    "🧽",
    "Opotřebovaná houbička na nádobí",
    "mixed",
    "Houbička z kombinovaných materiálů patří do směsného odpadu."
  ],
  [
    "🪥",
    "Opotřebovaný běžný zubní kartáček",
    "mixed",
    "Běžný kartáček z více materiálů patří do směsného. Elektrický kartáček je elektroodpad."
  ],
  [
    "🎈",
    "Prasklý latexový balonek",
    "mixed",
    "Latexový balonek do plastů nepatří, patří do směsného odpadu."
  ],
  [
    "🩹",
    "Použitá náplast z domácnosti",
    "mixed",
    "Běžná použitá domácí náplast patří do směsného hygienického odpadu."
  ],
  [
    "🧼",
    "Zbytek tuhého mýdla",
    "mixed",
    "Malý zbytek tuhého mýdla patří do směsného, není to plastový obal."
  ],
  [
    "🥣",
    "Malá rozbitá porcelánová miska",
    "mixed",
    "Porcelán nesmí do skla. Malý kus patří do směsného; střepy uklízí dospělý."
  ],
  [
    "🪴",
    "Střep z malého hliněného květináče",
    "mixed",
    "Keramický květináč není plast ani obalové sklo. Malý střep patří do směsného."
  ],
  [
    "🍪",
    "Použitý pečicí papír",
    "mixed",
    "Pečicí papír má zvláštní povrchovou úpravu a do modré nádoby nepatří."
  ],
  [
    "🧾",
    "Účtenka z termopapíru",
    "mixed",
    "Termopapírovou účtenku dej do směsného, ne do sběru papíru."
  ],
  [
    "💊",
    "Prázdný blistr od léků",
    "mixed",
    "Prázdný blistr kombinuje plast a hliník. Patří do směsného; nepoužité léky vrať do lékárny."
  ],
  [
    "🧹",
    "Naplněný sáček z vysavače",
    "mixed",
    "Prach a nečistoty ze sáčku patří do směsného odpadu."
  ],
  [
    "🧶",
    "Použitá dentální nit",
    "mixed",
    "Použitá dentální nit je drobný hygienický odpad do směsné nádoby."
  ],
  [
    "🩺",
    "Použitá jednorázová rouška z domácnosti",
    "mixed",
    "Běžná použitá domácí rouška patří do směsného, ne do sběru plastů."
  ],
  [
    "🪞",
    "Malý střep ze zrcátka",
    "mixed",
    "Zrcadlo není obalové sklo. Malý střep patří do směsného a uklízí ho dospělý."
  ]
];
