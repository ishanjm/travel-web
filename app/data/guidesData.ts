export interface Guide {
  name: string;
  role: { en: string; ja: string };
  rating: number;
  reviews: number;
  languages: string[];
  bio: { en: string; ja: string };
  avatar: string;
  specialty: { en: string; ja: string };
}

export interface Destination {
  id: string;
  name: { en: string; ja: string };
  coords: [number, number];
  zoom: number;
  description: { en: string; ja: string };
  categories: string[];
  guides: Guide[];
}

export interface Category {
  id: string;
  name: { en: string; ja: string };
  icon: string;
}

export const categoriesData: Category[] = [
  { id: "all", name: { en: "All Categories", ja: "すべてのカテゴリ" }, icon: "🌐" },
  { id: "beach", name: { en: "Beach Destinations", ja: "ビーチリゾート" }, icon: "🏖️" },
  { id: "mountain", name: { en: "Hill Country & Mountain Escapes", ja: "高原＆マウンテンリゾート" }, icon: "⛰️" },
  { id: "wildlife", name: { en: "Wildlife & Safari Parks", ja: "野生動物＆サファリ国立公園" }, icon: "🐘" },
  { id: "heritage", name: { en: "Cultural & Heritage Sites", ja: "文化遺産＆歴史的史跡" }, icon: "🏛️" },
  { id: "pilgrimage", name: { en: "Religious & Pilgrimage", ja: "宗教＆巡礼聖地" }, icon: "🙏" },
  { id: "adventure", name: { en: "Adventure & Hiking", ja: "冒険＆トレッキング" }, icon: "🥾" },
  { id: "waterfalls", name: { en: "Waterfalls & Nature Attractions", ja: "滝＆自然名所" }, icon: "🌿" },
  { id: "tea", name: { en: "Tea Plantation & Agro Tourism", ja: "茶畑＆アグロツーリズム" }, icon: "🍃" },
  { id: "urban", name: { en: "Urban & City Tourism", ja: "都市＆シティ観光" }, icon: "🌆" },
  { id: "marine", name: { en: "Marine & Whale Watching", ja: "マリンスポーツ＆ホエールウォッチ" }, icon: "🐋" },
  { id: "eco", name: { en: "Eco Tourism & Forest Reserves", ja: "エコツーリズム＆森林保護区" }, icon: "🌳" },
  { id: "surfing", name: { en: "Surfing Destinations", ja: "サーフィンスポット" }, icon: "🏄" },
];

export const guidesPool = {
  jb: {
    name: "Janaka Bandara",
    role: { en: "City Historian & Culinary Guide", ja: "都市歴史家・フードガイド" },
    rating: 4.9,
    reviews: 48,
    languages: ["English", "Japanese"],
    bio: {
      en: "Specializes in street food tours, colonial architecture walkthroughs, and high-end transfers.",
      ja: "ストリートフードツアー、植民地時代の建築散策、高級車での送迎を専門としています。",
    },
    avatar: "JB",
    specialty: { en: "Street Food & Architecture", ja: "B級グルメ＆歴史的建築" },
  },
  sp: {
    name: "Sanduni Perera",
    role: { en: "Archaeological Historian", ja: "考古学歴史スペシャリスト" },
    rating: 5.0,
    reviews: 92,
    languages: ["English", "French"],
    bio: {
      en: "Licensed archaeologist guiding visitors through the history and mystery of Sigiriya and Polonnaruwa ruins.",
      ja: "公認考古学者。シーギリヤとポロンナルワ遺跡の歴史と謎について解説します。",
    },
    avatar: "SP",
    specialty: { en: "Ancient Dynasties & Ruins", ja: "古代王朝と考古学遺跡" },
  },
  tr: {
    name: "Thilan Rambukwella",
    role: { en: "Cultural Heritage & Tea Country Guide", ja: "文化遺産・茶畑ガイド" },
    rating: 4.8,
    reviews: 64,
    languages: ["English", "German"],
    bio: {
      en: "Expert in Temple of the Tooth ceremonies, traditional Kandyan dance, and scenic tea estate walks.",
      ja: "仏歯寺の伝統儀式、キャンディアンダンス、美しい茶園ウォーキングの専門家。",
    },
    avatar: "TR",
    specialty: { en: "Kandyan Culture & Tea Estates", ja: "キャンディ文化と茶畑" },
  },
  rk: {
    name: "Ravi Kumara",
    role: { en: "Highland Trekking Specialist", ja: "高地トレッキングスペシャリスト" },
    rating: 4.9,
    reviews: 110,
    languages: ["English", "Japanese"],
    bio: {
      en: "Experienced mountaineer who leads sunrise treks up Ella Rock, Adam's Peak, and the Knuckles Range.",
      ja: "エラロック、アダムスピーク、ナックルズ山脈の日の出トレッキングを率いる登山家。",
    },
    avatar: "RK",
    specialty: { en: "Mountain Trekking & Photography", ja: "登山ガイド＆写真撮影" },
  },
  ns: {
    name: "Nisha de Silva",
    role: { en: "Maritime Heritage Specialist", ja: "海洋遺産専門ガイド" },
    rating: 4.9,
    reviews: 78,
    languages: ["English", "Japanese"],
    bio: {
      en: "Specializes in Dutch architectural tours within Galle Fort, southern reef safaris, and whale watching.",
      ja: "ゴール砦内オランダ建築ツアー、南海岸サンゴ礁サファリ、ホエールウォッチングを専門とします。",
    },
    avatar: "NS",
    specialty: { en: "Colonial Architecture & Marine Life", ja: "植民地建築＆海洋生物" },
  },
  dw: {
    name: "Dinesh Weerasinghe",
    role: { en: "Lead Naturalist & Wildlife Tracker", ja: "主任ナチュラリスト・野生動物追跡" },
    rating: 5.0,
    reviews: 135,
    languages: ["English"],
    bio: {
      en: "Expert tracker specializing in Yala's big cats, elephant herd patterns, and bird-watching safaris.",
      ja: "ヤラ・レオパード（ヒョウ）、象の群れの行動、野鳥サファリを専門とするプロトラッカー。",
    },
    avatar: "DW",
    specialty: { en: "Leopard Tracking & Birding", ja: "ヒョウ追跡＆野鳥観察" },
  },
};

export const destinationsData: Destination[] = [
  // Beach Destinations
  {
    id: "mirissa",
    name: { en: "Mirissa", ja: "ミリッサ" },
    coords: [5.9482, 80.4578],
    zoom: 12,
    description: {
      en: "A beautiful sandy bay famous for whale watching excursions, surfing, and vibrant beachfront restaurants.",
      ja: "ホエールウォッチング、サーフィン、および賑やかなビーチフロントレストランで有名な美しい砂浜の湾。",
    },
    categories: ["beach", "marine"],
    guides: [guidesPool.ns],
  },
  {
    id: "unawatuna",
    name: { en: "Unawatuna", ja: "ウナワトゥナ" },
    coords: [6.009, 80.2489],
    zoom: 12,
    description: {
      en: "A famous banana-shaped beach lagoon known for its calm turquoise waters, coral reefs, and trendy cafes.",
      ja: "穏やかなターコイズブルーの海、サンゴ礁、およびお洒落なカフェで知られる有名な三日月型のビーチ。",
    },
    categories: ["beach"],
    guides: [guidesPool.ns],
  },
  {
    id: "bentota",
    name: { en: "Bentota", ja: "ベントタ" },
    coords: [6.4201, 79.9998],
    zoom: 12,
    description: {
      en: "A golden sandy beach resort town offering thrilling water sports activities and pristine river safaris.",
      ja: "スリリングなウォータースポーツや手つかずの川サファリを楽しめるゴールデンビーチリゾートタウン。",
    },
    categories: ["beach"],
    guides: [guidesPool.ns],
  },
  {
    id: "hikkaduwa",
    name: { en: "Hikkaduwa", ja: "ヒッカドゥワ" },
    coords: [6.1365, 80.1042],
    zoom: 12,
    description: {
      en: "A lively coastal town renowned for its vibrant marine sanctuary, coral reefs, and surf breaks.",
      ja: "活気あるサンゴ礁保護区、豊かな海洋生物、および人気のサーフポイントで知られる沿岸の町。",
    },
    categories: ["beach", "surfing"],
    guides: [guidesPool.ns],
  },
  {
    id: "weligama",
    name: { en: "Weligama", ja: "ウェリガマ" },
    coords: [5.9722, 80.4286],
    zoom: 12,
    description: {
      en: "A picturesque sandy bay that serves as Sri Lanka's premier destination for beginner surf lessons.",
      ja: "初心者向けのサーフィンレッスンに最適な、ゆるやかな波が特徴の絵画のように美しい砂浜 of 湾。",
    },
    categories: ["beach", "surfing"],
    guides: [guidesPool.ns],
  },
  {
    id: "nilaveli",
    name: { en: "Nilaveli", ja: "ニラヴェリ" },
    coords: [8.6922, 81.1895],
    zoom: 12,
    description: {
      en: "A pristine white-sand beach on the northeast coast, serving as the gateway to Pigeon Island.",
      ja: "ピジョン島への玄関口となる、北東海岸にある手つかずの白い砂浜。",
    },
    categories: ["beach", "marine"],
    guides: [guidesPool.ns],
  },
  {
    id: "pasikudah",
    name: { en: "Pasikudah", ja: "パスィクダ" },
    coords: [7.9238, 81.5644],
    zoom: 12,
    description: {
      en: "Renowned for its flat, shallow shorebed allowing visitors to walk kilometers into the warm ocean.",
      ja: "穏やかで非常に浅い遠浅の海が広がり、沖合まで歩いていけることで有名なビーチ。",
    },
    categories: ["beach"],
    guides: [guidesPool.ns],
  },
  {
    id: "kalpitiya",
    name: { en: "Kalpitiya", ja: "カルピティヤ" },
    coords: [8.2327, 79.7592],
    zoom: 12,
    description: {
      en: "A coastal peninsula famous for kite surfing, dolphin watching, and pristine marine reserves.",
      ja: "カイトサーフィン、野生のイルカ観察、および美しい海洋保護区で有名な半島の町。",
    },
    categories: ["beach", "marine"],
    guides: [guidesPool.ns],
  },
  {
    id: "arugam_bay",
    name: { en: "Arugam Bay", ja: "アルガムベイ" },
    coords: [6.8415, 81.8322],
    zoom: 12,
    description: {
      en: "A world-famous surf destination on the southeast coast with a laidback, bohemian atmosphere.",
      ja: "のんびりとしたボヘミアンな雰囲気が漂う、南東海岸にある世界的に有名なサーフスポット。",
    },
    categories: ["beach", "surfing"],
    guides: [guidesPool.ns],
  },
  {
    id: "tangalle",
    name: { en: "Tangalle", ja: "タンガラ" },
    coords: [6.0243, 80.7961],
    zoom: 12,
    description: {
      en: "A peaceful southern escape featuring rocky coves, wide sandy beaches, and turtle nesting sites.",
      ja: "岩の多い入り江、広い砂浜、およびウミガメの産卵地がある、静かな南部のビーチリゾート。",
    },
    categories: ["beach"],
    guides: [guidesPool.ns],
  },

  // Hill Country
  {
    id: "ella",
    name: { en: "Ella", ja: "エッラ" },
    coords: [6.8722, 81.0475],
    zoom: 12,
    description: {
      en: "A misty mountain retreat renowned for tea plantations, epic hikes, and the Nine Arch Bridge.",
      ja: "茶畑、雄大なハイキングコース、およびナインアーチブリッジで有名な霧深い山の町。",
    },
    categories: ["mountain", "adventure", "tea", "waterfalls"],
    guides: [guidesPool.rk],
  },
  {
    id: "nuwara_eliya",
    name: { en: "Nuwara Eliya", ja: "ヌワラエリヤ" },
    coords: [6.9691, 80.7891],
    zoom: 12,
    description: {
      en: "Often called 'Little England', this cool-climate town features colonial bungalows and sprawling tea gardens.",
      ja: "「リトルイングランド」と呼ばれる涼しい高原都市。コロニアル調の邸宅や広大な茶畑が広がります。",
    },
    categories: ["mountain", "tea"],
    guides: [guidesPool.tr],
  },
  {
    id: "haputale",
    name: { en: "Haputale", ja: "ハプタレー" },
    coords: [6.7677, 80.9573],
    zoom: 12,
    description: {
      en: "A high-elevation town perched on a cliff edge, famous for dramatic mist covers and Lipton's Seat.",
      ja: "崖の淵に位置する標高の高い町。ドラマチックな霧と「リプトンズ・シート」で有名です。",
    },
    categories: ["mountain"],
    guides: [guidesPool.tr],
  },
  {
    id: "hatton",
    name: { en: "Hatton", ja: "ハットン" },
    coords: [6.8886, 80.5986],
    zoom: 12,
    description: {
      en: "The heart of Sri Lanka's tea country, surrounded by spectacular green valleys and cascading tea fields.",
      ja: "スリランカ紅茶生産の中心地。美しい緑の渓谷と幾重にも連なる茶畑に囲まれています。",
    },
    categories: ["mountain", "tea"],
    guides: [guidesPool.tr],
  },
  {
    id: "belihuloya",
    name: { en: "Belihuloya", ja: "ベリフルオヤ" },
    coords: [6.7214, 80.7738],
    zoom: 12,
    description: {
      en: "A picturesque hillside hamlet renowned for its rich biodiversity, natural streams, and eco lodges.",
      ja: "豊かな生物多様性、澄んだ小川、およびエココテージで知られる高原の集落。",
    },
    categories: ["mountain", "eco"],
    guides: [guidesPool.rk],
  },
  {
    id: "ohiya",
    name: { en: "Ohiya", ja: "オヒヤ" },
    coords: [6.8164, 80.8407],
    zoom: 12,
    description: {
      en: "A scenic highland village that serves as a quiet trailhead for trekking to Horton Plains.",
      ja: "ホートンプレインズへのトレッキングルートの静かな起点となる、風光明媚な高地の村。",
    },
    categories: ["mountain"],
    guides: [guidesPool.rk],
  },
  {
    id: "bandarawela",
    name: { en: "Bandarawela", ja: "バンダラウェラ" },
    coords: [6.8259, 80.9984],
    zoom: 12,
    description: {
      en: "A charming hill station with a mild, dry climate surrounded by fruit orchards and pine forests.",
      ja: "果樹園や松林に囲まれた、穏やかで乾燥した気候が魅力の避暑地。",
    },
    categories: ["mountain"],
    guides: [guidesPool.tr],
  },

  // Wildlife & Safari
  {
    id: "yala",
    name: { en: "Yala National Park", ja: "ヤラ国立公園" },
    coords: [6.3692, 81.5165],
    zoom: 11,
    description: {
      en: "Wild semi-arid scrublands boasting one of the world's highest leopard densities.",
      ja: "世界有数のヒョウの生息密度を誇る、野生の半乾燥低木林エリア。",
    },
    categories: ["wildlife"],
    guides: [guidesPool.dw],
  },
  {
    id: "udawalawe",
    name: { en: "Udawalawe National Park", ja: "ウダワラウェ国立公園" },
    coords: [6.4385, 80.892],
    zoom: 11,
    description: {
      en: "An important habitat for Sri Lankan elephants, renowned for open plains and close-up wildlife encounters.",
      ja: "スリランカゾウの重要な生息地。広大な平原と間近での野生動物との遭遇で有名です。",
    },
    categories: ["wildlife"],
    guides: [guidesPool.dw],
  },
  {
    id: "wilpattu",
    name: { en: "Wilpattu National Park", ja: "ウィルパットゥ国立公園" },
    coords: [8.4357, 80.0076],
    zoom: 11,
    description: {
      en: "Sri Lanka's largest national park, characterized by natural rainwater lakes ('Villus') and leopards.",
      ja: "スリランカ最大の国立公園。「ヴィッル」と呼ばれる天然の雨水湖と野生のヒョウが特徴です。",
    },
    categories: ["wildlife"],
    guides: [guidesPool.dw],
  },
  {
    id: "minneriya",
    name: { en: "Minneriya National Park", ja: "ミンネリヤ国立公園" },
    coords: [8.0336, 80.8225],
    zoom: 11,
    description: {
      en: "Famous for 'The Gathering' of hundreds of wild Asian elephants during the dry season.",
      ja: "乾季に数百頭の野生のアジアゾウが集まることで有名な「ザ・ギャザリング」の舞台。",
    },
    categories: ["wildlife"],
    guides: [guidesPool.dw],
  },
  {
    id: "kaudulla",
    name: { en: "Kaudulla National Park", ja: "カウドゥラ国立公園" },
    coords: [8.1633, 80.9167],
    zoom: 11,
    description: {
      en: "A national park featuring a major reservoir where herds of elephants congregate in lush grasses.",
      ja: "ゾウの群れが豊かな草地に集まる広大な貯水池を擁する国立公園。",
    },
    categories: ["wildlife"],
    guides: [guidesPool.dw],
  },
  {
    id: "bundala",
    name: { en: "Bundala National Park", ja: "ブンダラ国立公園" },
    coords: [6.1822, 81.1969],
    zoom: 11,
    description: {
      en: "An internationally important wetland sanctuary attracting thousands of colorful migratory birds.",
      ja: "何千羽もの色鮮やかな渡り鳥が集まる、国際的に重要な湿地鳥類保護区。",
    },
    categories: ["wildlife"],
    guides: [guidesPool.dw],
  },
  {
    id: "wasgamuwa",
    name: { en: "Wasgamuwa National Park", ja: "ワスガムワ国立公園" },
    coords: [7.7128, 80.9419],
    zoom: 11,
    description: {
      en: "A secluded national park bounded by two major rivers, rich in elephant herds and birdlife.",
      ja: "2つの主要な川に挟まれた人里離れた国立公園。ゾウの群れや野鳥が豊富に生息しています。",
    },
    categories: ["wildlife"],
    guides: [guidesPool.dw],
  },

  // Cultural & Heritage
  {
    id: "sigiriya",
    name: { en: "Sigiriya", ja: "シーギリヤ" },
    coords: [7.957, 80.7603],
    zoom: 12,
    description: {
      en: "The ancient Cultural Triangle heartland, dominated by the majestic Lion Rock citadel.",
      ja: "荘厳なライオンロック要塞がそびえ立つ、古代文化三角地帯の中心地。",
    },
    categories: ["heritage", "adventure"],
    guides: [guidesPool.sp],
  },
  {
    id: "anuradhapura",
    name: { en: "Anuradhapura", ja: "アヌラーダプラ" },
    coords: [8.3114, 80.4037],
    zoom: 12,
    description: {
      en: "The sacred first capital of ancient Sri Lanka, filled with massive stupas and ruins dating back over 2,000 years.",
      ja: "2000年以上の歴史を持つ巨大な仏塔や遺跡群が立ち並ぶ、スリランカ古代最初の聖なる首都。",
    },
    categories: ["heritage", "pilgrimage"],
    guides: [guidesPool.sp],
  },
  {
    id: "polonnaruwa",
    name: { en: "Polonnaruwa", ja: "ポロンナルワ" },
    coords: [7.9403, 81.0029],
    zoom: 12,
    description: {
      en: "A well-preserved medieval capital showing remarkable stone carvings and royal palace ruins.",
      ja: "見事な石彫刻や王宮跡が残る、保存状態の良い中世スリランカの首都跡。",
    },
    categories: ["heritage"],
    guides: [guidesPool.sp],
  },
  {
    id: "kandy",
    name: { en: "Kandy", ja: "キャンディ" },
    coords: [7.2906, 80.6337],
    zoom: 12,
    description: {
      en: "The scenic hill capital, home to the sacred Temple of the Tooth and lush botanical gardens.",
      ja: "聖なる仏歯寺や豊かな植物園がある、風光明媚な高地の古都。",
    },
    categories: ["heritage", "urban", "pilgrimage"],
    guides: [guidesPool.tr],
  },
  {
    id: "dambulla",
    name: { en: "Dambulla Cave Temple", ja: "ダンブッラ石窟寺院" },
    coords: [7.8564, 80.6517],
    zoom: 12,
    description: {
      en: "The largest and best-preserved cave temple complex in Sri Lanka, boasting beautiful Buddhist murals.",
      ja: "スリランカ最大かつ最も保存状態の良い石窟寺院群。美しい仏教壁画を誇ります。",
    },
    categories: ["heritage"],
    guides: [guidesPool.sp],
  },
  {
    id: "galle",
    name: { en: "Galle Fort", ja: "ゴール砦" },
    coords: [6.0264, 80.2168],
    zoom: 13,
    description: {
      en: "A stunning 400-year-old coastal fortress with cobblestone streets and ocean viewpoints.",
      ja: "石畳の通りと美しい海の景色が広がる、築400年の魅力的な沿岸の城塞都市。",
    },
    categories: ["heritage", "urban"],
    guides: [guidesPool.ns],
  },
  {
    id: "yapahuwa",
    name: { en: "Yapahuwa Rock Fortress", ja: "ヤパフワ要塞" },
    coords: [7.8105, 80.2541],
    zoom: 12,
    description: {
      en: "An ancient fortress built around a steep rock, famous for its magnificent monumental stone staircase.",
      ja: "険しい岩山の周囲に築かれた古代の要塞。見事な彫刻が施された石造りの大階段で有名です。",
    },
    categories: ["heritage"],
    guides: [guidesPool.sp],
  },

  // Pilgrimage
  {
    id: "tooth_relic",
    name: { en: "Temple of the Tooth Relic", ja: "仏歯寺" },
    coords: [7.2936, 80.6413],
    zoom: 13,
    description: {
      en: "The highly revered golden-roofed Buddhist temple in Kandy housing the sacred tooth relic of Buddha.",
      ja: "釈迦の仏歯が納められている、キャンディにある金屋根の極めて神聖な仏教寺院。",
    },
    categories: ["pilgrimage"],
    guides: [guidesPool.tr],
  },
  {
    id: "kataragama",
    name: { en: "Kataragama Sacred Town", ja: "カタラガマ聖地" },
    coords: [6.4131, 81.3325],
    zoom: 12,
    description: {
      en: "A sacred multi-religious pilgrimage town dedicated to the guardian deity Lord Kataragama.",
      ja: "守護神カタラガマに捧げられた、複数の宗教が共存する神聖な巡礼の町。",
    },
    categories: ["pilgrimage"],
    guides: [guidesPool.sp],
  },
  {
    id: "nagadeepa",
    name: { en: "Nagadeepa Purana Viharaya", ja: "ナガディーパ仏教寺院" },
    coords: [9.6083, 79.7738],
    zoom: 12,
    description: {
      en: "An ancient Buddhist temple located on an island off the Jaffna Peninsula, visited by Lord Buddha.",
      ja: "ブッダが訪れたとされる、ジャフナ半島沖の島にある古代仏教寺院。",
    },
    categories: ["pilgrimage"],
    guides: [guidesPool.sp],
  },
  {
    id: "munneswaram",
    name: { en: "Munneswaram Temple", ja: "ムンネスワラム寺院" },
    coords: [7.5819, 79.845],
    zoom: 12,
    description: {
      en: "A historic Hindu temple complex dedicated to Lord Shiva, dating back at least to the 10th century.",
      ja: "少なくとも10世紀にまで遡る、シヴァ神を祀る由緒あるヒンドゥー寺院。",
    },
    categories: ["pilgrimage"],
    guides: [guidesPool.sp],
  },

  // Adventure
  {
    id: "sri_pada",
    name: { en: "Sri Pada (Adam's Peak)", ja: "スリーパーダ (アダムスピーク)" },
    coords: [6.8096, 80.4993],
    zoom: 12,
    description: {
      en: "A sacred mountain climbed by pilgrims of multiple faiths, famous for its spectacular sunrise views.",
      ja: "多くの宗教の巡礼者が登る聖なる山。山頂からの壮大な日の出の景色で知られています。",
    },
    categories: ["pilgrimage", "adventure"],
    guides: [guidesPool.rk],
  },
  {
    id: "knuckles",
    name: { en: "Knuckles Mountain Range", ja: "ナックルズ山脈" },
    coords: [7.4475, 80.7816],
    zoom: 11,
    description: {
      en: "A UNESCO heritage forest range offering rugged trekking paths, endemic wildlife, and cloud forests.",
      ja: "険しい登山道、固有の動植物、および雲霧林が広がるユネスコ世界自然遺産の山脈。",
    },
    categories: ["adventure", "eco"],
    guides: [guidesPool.rk],
  },
  {
    id: "horton_plains",
    name: { en: "Horton Plains National Park", ja: "ホートンプレインズ" },
    coords: [6.8028, 80.8028],
    zoom: 11,
    description: {
      en: "A high-altitude plateau of wind-swept grasslands, home to the dramatic World's End precipice.",
      ja: "風の吹き抜ける草原が広がる高地台地。落差のある絶壁「ワールズエンド（世界の果て）」で有名。",
    },
    categories: ["adventure", "eco", "waterfalls"],
    guides: [guidesPool.rk],
  },
  {
    id: "little_adams_peak",
    name: { en: "Little Adam's Peak", ja: "リトルアダムスピーク" },
    coords: [6.8617, 81.0633],
    zoom: 12,
    description: {
      en: "An easy hike in Ella leading to a stunning viewpoint overlooking the Ravana valley gap.",
      ja: "エッラにある初心者向けの快適なハイキングルート。ラヴァナ渓谷の絶景を見渡せます。",
    },
    categories: ["adventure"],
    guides: [guidesPool.rk],
  },
  {
    id: "pidurangala",
    name: { en: "Pidurangala Rock", ja: "ピドゥランガラロック" },
    coords: [7.9653, 80.762],
    zoom: 12,
    description: {
      en: "A steep rock adjacent to Sigiriya, offering panoramic 360-degree views of the fortress and surrounding forests.",
      ja: "シーギリヤに隣接する急峻な岩山。要塞と周囲の森林パノラマを360度見渡せる人気の絶景スポット。",
    },
    categories: ["adventure"],
    guides: [guidesPool.rk],
  },

  // Waterfalls
  {
    id: "diyaluma",
    name: { en: "Diyaluma Falls", ja: "ディヤルマの滝" },
    coords: [6.7325, 81.0308],
    zoom: 12,
    description: {
      en: "Sri Lanka's second-highest waterfall, offering stunning natural pools for swimming at the upper falls.",
      ja: "スリランカで2番目に高い滝。上流には泳ぐことができる美しい天然プールがあります。",
    },
    categories: ["waterfalls"],
    guides: [guidesPool.rk],
  },
  {
    id: "bambarakanda",
    name: { en: "Bambarakanda Falls", ja: "バンバラカンダの滝" },
    coords: [6.7725, 80.8333],
    zoom: 12,
    description: {
      en: "Sri Lanka's tallest waterfall, plunging 263 meters through a picturesque pine forest valley.",
      ja: "スリランカ最高落差263メートルを誇る滝。絵画のような松林の渓谷を流れ落ちます。",
    },
    categories: ["waterfalls"],
    guides: [guidesPool.rk],
  },
  {
    id: "ravana_falls",
    name: { en: "Ravana Falls", ja: "ラヴァナの滝" },
    coords: [6.8637, 81.0539],
    zoom: 12,
    description: {
      en: "A popular wild waterfall in Ella associated with the epic legendary tales of Ramayana.",
      ja: "エッラ近郊にある人気の滝。古代の叙事詩「ラーマーヤナ」の伝説と深く結びついています。",
    },
    categories: ["waterfalls"],
    guides: [guidesPool.rk],
  },
  {
    id: "dunhinda",
    name: { en: "Dunhinda Falls", ja: "ドゥンヒンダの滝" },
    coords: [7.0225, 81.0667],
    zoom: 12,
    description: {
      en: "A spectacular waterfall near Badulla, famous for the mist spray created by its powerful cascade.",
      ja: "バドゥーラ近郊にある壮観な滝。勢いよく流れ落ちる水が作り出す美しい霧で知られています。",
    },
    categories: ["waterfalls"],
    guides: [guidesPool.rk],
  },
  {
    id: "st_clairs",
    name: { en: "St. Clair's Falls", ja: "セントクレアの滝" },
    coords: [6.9333, 80.6333],
    zoom: 12,
    description: {
      en: "Widely known as the 'Little Niagara of Sri Lanka', flowing through lush tea plantations.",
      ja: "豊かな茶園の中を流れる、「スリランカのナイアガラ」として広く知られる美しい滝。",
    },
    categories: ["waterfalls"],
    guides: [guidesPool.tr],
  },
  {
    id: "devon",
    name: { en: "Devon Falls", ja: "デヴォンの滝" },
    coords: [6.9364, 80.6403],
    zoom: 12,
    description: {
      en: "A majestic waterfall named after a pioneer English tea planter, offering scenic valley views.",
      ja: "開拓者であるイギリス人茶プランターにちなんで名付けられた、渓谷の景色が美しい壮麗な滝。",
    },
    categories: ["waterfalls"],
    guides: [guidesPool.tr],
  },

  // Tea Plantation
  {
    id: "talawakele",
    name: { en: "Talawakele", ja: "タラワケレ" },
    coords: [6.9367, 80.6389],
    zoom: 12,
    description: {
      en: "A major tea-growing town famous for St. Clair's and Devon waterfalls, and lush tea research centers.",
      ja: "セント・クレアやデヴォンの滝、および広大な茶業研究所で有名な紅茶生産の主要な町。",
    },
    categories: ["tea"],
    guides: [guidesPool.tr],
  },
  {
    id: "pedro_tea",
    name: { en: "Pedro Tea Estate", ja: "ペドロ茶園" },
    coords: [6.9639, 80.8039],
    zoom: 12,
    description: {
      en: "A historic tea estate located close to Nuwara Eliya, offering direct walks through vintage factories.",
      ja: "ヌワラエリヤ近郊にある歴史ある茶園。レトロな紅茶工場の見学ツアーが人気です。",
    },
    categories: ["tea"],
    guides: [guidesPool.tr],
  },

  // Urban & City
  {
    id: "colombo_city",
    name: { en: "Colombo", ja: "コロンボ" },
    coords: [6.9271, 79.8612],
    zoom: 11,
    description: {
      en: "The vibrant commercial capital, blending colonial history with modern urban luxury.",
      ja: "植民地時代の歴史と近代的な都市のラグジュアリーが融合した、活気ある商業都市。",
    },
    categories: ["urban"],
    guides: [guidesPool.jb],
  },
  {
    id: "jaffna",
    name: { en: "Jaffna", ja: "ジャフナ" },
    coords: [9.6615, 80.0255],
    zoom: 11,
    description: {
      en: "The vibrant northern capital, boasting a distinct Tamil cultural heritage, colorful temples, and historic fort.",
      ja: "独特のタミル文化遺産、カラフルなヒンドゥー寺院、および歴史ある砦を擁する北部都市。",
    },
    categories: ["urban"],
    guides: [guidesPool.jb],
  },
  {
    id: "negombo",
    name: { en: "Negombo", ja: "ネゴンボ" },
    coords: [7.2089, 79.8484],
    zoom: 12,
    description: {
      en: "A coastal city near the airport known for its colonial Dutch canal system and sandy beaches.",
      ja: "空港に近い沿岸都市。オランダ植民地時代の運河システムや砂浜で知られています。",
    },
    categories: ["urban"],
    guides: [guidesPool.jb],
  },
  {
    id: "trincomalee",
    name: { en: "Trincomalee", ja: "トリンコマリー" },
    coords: [8.5873, 81.2152],
    zoom: 12,
    description: {
      en: "A historic deep-water port town with beautiful white-sand beaches and historic Hindu temples.",
      ja: "白砂の美しいビーチと由緒あるヒンドゥー寺院がある、歴史的な深水港湾都市。",
    },
    categories: ["urban", "marine", "beach"],
    guides: [guidesPool.ns],
  },

  // Marine
  {
    id: "pigeon_island",
    name: { en: "Pigeon Island", ja: "ピジョン島" },
    coords: [8.7183, 81.2014],
    zoom: 13,
    description: {
      en: "A marine national park boasting crystal-clear waters and some of Sri Lanka's best coral reefs.",
      ja: "透明度の高い海と、スリランカ最高峰のサンゴ礁を誇る海洋国立公園。",
    },
    categories: ["marine"],
    guides: [guidesPool.ns],
  },
  // Eco Tourism
  {
    id: "sinharaja",
    name: { en: "Sinharaja Forest Reserve", ja: "シンハラジャ森林保護区" },
    coords: [6.3996, 80.4164],
    zoom: 11,
    description: {
      en: "A primary tropical rainforest and UNESCO biosphere reserve packed with rare endemic species.",
      ja: "希少な固有種が数多く生息する、ユネスコ世界遺産登録の一次熱帯雨林保護区。",
    },
    categories: ["eco"],
    guides: [guidesPool.rk],
  },
  {
    id: "kanneliya",
    name: { en: "Kanneliya Forest Reserve", ja: "カンネリヤ森林保護区" },
    coords: [6.2522, 80.3347],
    zoom: 11,
    description: {
      en: "A large forest reserve famous for rich endemic flora and fauna, and pristine hiking streams.",
      ja: "豊富な固有動植物と、ハイキングに最適な清らかな小川で有名な広大な森林保護区。",
    },
    categories: ["eco"],
    guides: [guidesPool.rk],
  },
  {
    id: "gal_oya",
    name: { en: "Gal Oya National Park", ja: "ガルオヤ国立公園" },
    coords: [7.2189, 81.4586],
    zoom: 11,
    description: {
      en: "A unique national park famous for boat safaris where elephants can be seen swimming between islands.",
      ja: "ゾウが島々の間を泳ぐ姿が見られるボートサファリで有名な、ユニークな国立公園。",
    },
    categories: ["eco"],
    guides: [guidesPool.rk],
  },

  // Surfing
  {
    id: "midigama",
    name: { en: "Midigama", ja: "ミディガマ" },
    coords: [5.9725, 80.3917],
    zoom: 12,
    description: {
      en: "A relaxed surfing village featuring multiple famous surf breaks like Lazy Left and Rams.",
      ja: "「レイジー・レフト」や「ラムズ」など、複数の有名なサーフポイントがあるのんびりとしたサーフィンの村。",
    },
    categories: ["surfing"],
    guides: [guidesPool.ns],
  },
  {
    id: "ahangama",
    name: { en: "Ahangama", ja: "アハンガマ" },
    coords: [5.9723, 80.3664],
    zoom: 12,
    description: {
      en: "A trendy south-coast destination combining excellent surf spots with boutique surf stays.",
      ja: "優れたサーフスポットとお洒落なブティックステイが融合した、南海岸の人気エリア。",
    },
    categories: ["surfing"],
    guides: [guidesPool.ns],
  },
];
