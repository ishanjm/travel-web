"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "./LanguageContext";

// Fix Leaflet marker icons in Next.js/React environment
const getCategoryEmoji = (category: string) => {
  switch (category) {
    case "beach": return "🏖️";
    case "mountain": return "⛰️";
    case "wildlife": return "🐘";
    case "heritage": return "🏛️";
    case "pilgrimage": return "🙏";
    case "adventure": return "🥾";
    case "waterfalls": return "🌿";
    case "tea": return "🍃";
    case "urban": return "🌆";
    case "marine": return "🐋";
    case "eco": return "🌳";
    case "surfing": return "🏄";
    default: return "📍";
  }
};

const createCustomIcon = (category: string, isSelected: boolean) => {
  const emoji = getCategoryEmoji(category);
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-10 w-10 animate-ping rounded-full ${
          isSelected ? "bg-emerald-400/40" : "bg-emerald-500/20"
        } opacity-75"></span>
        <div class="relative flex items-center justify-center rounded-full h-8 w-8 bg-slate-950 border-2 ${
          isSelected ? "border-emerald-400 shadow-lg scale-110" : "border-slate-800 hover:scale-105"
        } text-sm transition-transform duration-300">
          ${emoji}
        </div>
      </div>
    `,
    className: "custom-marker-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

interface Guide {
  name: string;
  role: { en: string; ja: string };
  rating: number;
  reviews: number;
  languages: string[];
  bio: { en: string; ja: string };
  avatar: string;
  specialty: { en: string; ja: string };
}

interface Destination {
  id: string;
  name: { en: string; ja: string };
  coords: [number, number];
  zoom: number;
  description: { en: string; ja: string };
  categories: string[];
  guides: Guide[];
}

interface Category {
  id: string;
  name: { en: string; ja: string };
  icon: string;
}

const categoriesData: Category[] = [
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

const guidesPool = {
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

const destinationsData: Destination[] = [
  // Beach Destinations
  {
    id: "mirissa",
    name: { en: "Mirissa", ja: "ミリッサ" },
    coords: [5.9482, 80.4578],
    zoom: 12,
    description: {
      en: "A beautiful sandy bay famous for whale watching excursions, surfing, and vibrant beachfront restaurants.",
      ja: "ホエールウォッチング、サーフィン、そして賑やかなビーチフロントレストランで有名な美しい砂浜の湾。",
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
      ja: "穏やかなターコイズブルーの海、サンゴ礁、そしてお洒落なカフェで知られる有名な三日月型のビーチ。",
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
      ja: "活気あるサンゴ礁保護区、豊かな海洋生物、そして人気のサーフポイントで知られる沿岸の町。",
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
      ja: "初心者向けのサーフィンレッスンに最適な、ゆるやかな波が特徴の絵画のように美しい砂浜の湾。",
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
      ja: "岩の多い入り江、広い砂浜、そしてウミガメの産卵地がある、静かな南部のビーチリゾート。",
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
      ja: "茶畑、雄大なハイキングコース、そしてナインアーチブリッジで有名な霧深い山の町。",
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
      ja: "豊かな生物多様性、澄んだ小川、そして魅力的なエココテージで知られる高原の集落。",
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
      ja: "スリランカ最大の国立公園。「ヴィッル」と呼ばれる天然 of 雨水湖と野生のヒョウが特徴です。",
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
      ja: "険しい登山道、固有の動植物、そして雲霧林が広がるユネスコ世界自然遺産の山脈。",
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

// Component to dynamically pan and zoom the map
function MapUpdater({ coords, zoom }: { coords: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, zoom, {
      animate: true,
      duration: 1.2,
    });
  }, [coords, zoom, map]);
  return null;
}

export default function GuidesMap() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<Destination>(destinationsData[0]); // Default to Mirissa
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-[550px] w-full bg-slate-900/50 border border-slate-900 rounded-3xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <span className="text-sm text-slate-400 font-medium">Loading Interactive Map...</span>
        </div>
      </div>
    );
  }

  const isEn = language === "en";

  // Filter destinations based on selected category & search query
  const filteredDestinations = destinationsData.filter((dest) => {
    const matchesCategory = selectedCategory === "all" || dest.categories.includes(selectedCategory);
    const name = isEn ? dest.name.en : dest.name.ja;
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategory = categoriesData.find((cat) => cat.id === selectedCategory) || categoriesData[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setIsCategoryDropdownOpen(false);
    setSearchQuery("");

    // Automatically switch to the first destination available under the new category
    const categoryFiltered = destinationsData.filter((d) => catId === "all" || d.categories.includes(catId));
    if (categoryFiltered.length > 0) {
      const isCurrentStillValid = categoryFiltered.some((d) => d.id === selectedDest.id);
      if (!isCurrentStillValid) {
        setSelectedDest(categoryFiltered[0]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Top Section: Single Row for Dropdowns (left), Guides (middle), and Description (right) */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Column 1: Categories & Locations Dropdowns */}
        <div className="lg:col-span-3 bg-slate-900/40 backdrop-blur-md border border-slate-900 p-6 rounded-3xl flex flex-col gap-5 relative z-[1010]">
          
          {/* Dropdown 1: Select Category */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              {isEn ? "Select Category" : "カテゴリを選択"}
            </span>
            <div className="relative">
              <button
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-slate-700 transition-all duration-300 focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <span>{activeCategory.icon}</span>
                  <span>{isEn ? activeCategory.name.en : activeCategory.name.ja}</span>
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    isCategoryDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 p-2 bg-slate-950 border border-slate-850 rounded-2xl shadow-2xl z-[1020] max-h-60 overflow-y-auto flex flex-col gap-1 custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                  {categoriesData.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2.5 transition-all duration-200 ${
                          isSelected
                            ? "bg-emerald-500 text-slate-950 font-bold"
                            : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{isEn ? cat.name.en : cat.name.ja}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Dropdown 2: Select Location */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              {isEn ? "Select Location" : "エリアを選択"}
            </span>
            <div className="relative">
              <button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-slate-700 transition-all duration-300 focus:outline-none"
              >
                <span>{isEn ? selectedDest.name.en : selectedDest.name.ja}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 p-2 bg-slate-950 border border-slate-850 rounded-2xl shadow-2xl z-[1010] flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Search Input */}
                  <div className="relative p-1">
                    <span className="absolute inset-y-0 left-3 flex items-center pl-1 pointer-events-none">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isEn ? "Search location..." : "エリアを検索..."}
                      className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                    />
                  </div>

                  {/* Option List */}
                  <div className="flex flex-col gap-1 max-h-48 overflow-y-auto custom-scrollbar">
                    {filteredDestinations.length > 0 ? (
                      filteredDestinations.map((dest) => {
                        const isSelected = selectedDest.id === dest.id;
                        return (
                          <button
                            key={dest.id}
                            onClick={() => {
                              setSelectedDest(dest);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                              isSelected
                                ? "bg-emerald-500 text-slate-950 font-bold"
                                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                            }`}
                          >
                            {isEn ? dest.name.en : dest.name.ja}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-3.5 py-2.5 text-xs text-slate-500 italic">
                        {isEn ? "No results found" : "結果が見つかりません"}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Available Certified Guides */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            {isEn ? "Available Certified Guides" : "公認の専属ガイド一覧"}
          </h4>

          <div className="flex flex-col gap-4">
            {selectedDest.guides.map((guide) => (
              <div
                key={guide.name}
                className="bg-slate-900/40 border border-slate-900 hover:border-slate-850 transition-all duration-300 p-5 rounded-3xl flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col gap-3">
                  {/* Header Row: Avatar & Name/Rating on Left, Inquire Button on Right */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Avatar & Name/Role */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 tracking-wider shrink-0">
                        {guide.avatar}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <h5 className="font-bold text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                            {guide.name}
                          </h5>
                          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                            ★ {guide.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {isEn ? guide.role.en : guide.role.ja}
                        </p>
                      </div>
                    </div>

                    {/* Right: Inquire Button */}
                    <a
                      href="#concierge"
                      className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20 hover:border-transparent transition-all duration-300 shrink-0"
                    >
                      {isEn ? "Inquire" : "問合せ"}
                    </a>
                  </div>

                  {/* Middle Row: Specialty badge & Language chips */}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/60 border border-slate-800 text-[10px] font-semibold text-slate-400">
                      {isEn ? "Specialty: " : "専門: "}{isEn ? guide.specialty.en : guide.specialty.ja}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio Paragraph */}
                  <p className="text-slate-350 text-xs font-light leading-relaxed">
                    {isEn ? guide.bio.en : guide.bio.ja}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Selected Area Description */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            {isEn ? "Description" : "説明"}
          </h4>
          <div className="bg-slate-900/20 border border-slate-900/80 p-6 rounded-3xl flex flex-col gap-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              {isEn ? selectedDest.name.en : selectedDest.name.ja}
            </h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              {isEn ? selectedDest.description.en : selectedDest.description.ja}
            </p>
          </div>
        </div>
      </div>

      {/* Full Width Interactive Map Container */}
      <div className="h-[550px] w-full border-y border-slate-900/50 shadow-2xl overflow-hidden mt-6">
        <MapContainer
          center={selectedDest.coords}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", background: "#020617" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {filteredDestinations.map((dest) => {
            const isSelected = selectedDest.id === dest.id;
            const primaryCat = dest.categories && dest.categories.length > 0 ? dest.categories[0] : "all";
            return (
              <Marker
                key={dest.id}
                position={dest.coords}
                icon={createCustomIcon(primaryCat, isSelected)}
                eventHandlers={{
                  click: () => {
                    setSelectedDest(dest);
                  },
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-2 text-slate-950 font-sans">
                    <h4 className="font-bold text-sm">{isEn ? dest.name.en : dest.name.ja}</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {isEn ? `Certified Guides: ${dest.guides.length}` : `登録公認ガイド: ${dest.guides.length}名`}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          <MapUpdater coords={selectedDest.coords} zoom={selectedDest.zoom} />
        </MapContainer>
      </div>
    </div>
  );
}
