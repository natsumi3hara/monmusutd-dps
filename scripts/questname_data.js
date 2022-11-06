const subStoryUnlock = [
    "000",
    "001",
    "002",
    "004",
    "005",
    "006",
    "023",
    "024"
];

const subStoryName = {
    "000":" (Welcome to Geshpent Island)",
    "001":" (Rounding Up the Holsteins)",
    "002":" (Ambition of the Flat Chest Alliance)",
    "003":" (Aliens From the Outerworld)",
    "004":" (Witch Elf and the Magic Lamp)",
    "005":" (Last of Paipai)",
    "006":" (Last of Paipai)",
    "007":" (Scalding Hot Training)",
    "008":" (Scalding Hot Training)",
    "009":" (The Mouse Rides on the Spill)",
    "010":" (The Mouse Rides on the Spill)",
    "011":" (Kyawawa at the Abandoned Bear)",
    "012":" (Kyawawa at the Abandoned Bear)",
    "013":" (Gold Vacation Decadence)",
    "014":" (Gold Vacation Decadence)",
    "015":" (Wonders of Geshpent Tour!)",
    "016":" (Wonders of Geshpent Tour!)",
    "017":" (Crusher of the Wasteland)",
    "018":" (Crusher of the Wasteland)",
    "019":" (In My Dream)",
    "020":" (In My Dream)",
    "021":" (Sister Syndrome Complex)",
    "022":" (Sister Syndrome Complex)",
	"023":" (Black Dragon and the Mysterious Treasure)",
	"024":" (Black Dragon and the Mysterious Treasure)"
};

const subStoryNameJP = {
    "000":" (ようこそゲシュペンス島へ)",
    "001":" (狙われたホルスタイン)",
    "002":" (貧乳同盟の野望)",
    "003":" (異世界えいりあん)",
    "004":" (魔女エルフと魔法のランプ)",
    "005":" (ラストオブパイパイ)",
    "006":" (ラストオブパイパイ)",
    "007":" (アチチなHOTトレーニング)",
    "008":" (アチチなHOTトレーニング)",
    "009":" (おこぼれにネズミは乗る)",
    "010":" (おこぼれにネズミは乗る)",
    "011":" (捨てられクマにキャワワを)",
    "012":" (捨てられクマにキャワワを)",
    "013":" (ゴールドバカンスデカダンス)",
    "014":" (ゴールドバカンスデカダンス)",
    "015":" (ゲシュペンス島ふしぎめぐり！)",
    "016":" (ゲシュペンス島ふしぎめぐり！)",
    "017":" (荒野の破壊者)",
    "018":" (荒野の破壊者)",
    "019":" (淫MyDream)",
    "020":" (淫MyDream)",
    "021":" (シスターシンドロームコンプレックス)",
    "022":" (シスターシンドロームコンプレックス)",
	"023":" (黒竜と妖しき珍宝)",
	"024":" (黒竜と妖しき珍宝)"
};

const tableAvailable = '<table id="drop-available"><tr><th style="width:60%">Stage Name (Available)</th><th style="width:10%">Drop Count</th><th style="width:10%">Drop Probability (%)</th><th style="width:20%">Expected stamina to get 1 item<br>(less is better)</th></tr></table>';
const tableUnavailable = '<table id="drop-available"><tr><th style="width:60%">Stage Name (Unavailable)</th><th style="width:10%">Drop Count</th><th style="width:10%">Drop Probability (%)</th><th style="width:20%">Expected stamina to get 1 item<br>(less is better)</th></tr></table>';
const tableAvailableJP = '<table id="drop-available"><tr><th style="width:60%">ステージ名（開放中）</th><th style="width:10%">ドロップ数</th><th style="width:10%">ドロップ率（％）</th><th style="width:20%">消費スタミナ期待値（一個）<br>（少ない方が良い）</th></tr></table>';
const tableUnavailableJP = '<table id="drop-available"><tr><th style="width:60%">ステージ名（未開放）</th><th style="width:10%">ドロップ数</th><th style="width:10%">ドロップ率（％）</th><th style="width:20%">消費スタミナ期待値（一個）<br>（少ない方が良い）</th></tr></table>';