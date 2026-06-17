// Thai alphabet data extracted from the 49-day curriculum.
// Source: /Users/michelletinloi/.openclaw/workspace/thai-curriculum/curriculum.json

const THAI_DATA = {
  consonants: [
    // ---- Mid class (9) ----
    { ch: "ก", name: "Ko Kai", cls: "mid", sound: "k / g", memory: "Looks like a chicken standing (ไก่ = chicken).", words: [{thai:"กา",rom:"gaa",mean:"crow"},{thai:"กิน",rom:"gin",mean:"eat"}] },
    { ch: "จ", name: "Jo Jan", cls: "mid", sound: "j", memory: "Looks like a hook — j sound like 'jump'.", words: [{thai:"จาน",rom:"jaan",mean:"plate"},{thai:"จำ",rom:"jam",mean:"remember"}] },
    { ch: "ด", name: "Do Dek", cls: "mid", sound: "d", memory: "d sound — ด like 'dek' (child).", words: [{thai:"ดี",rom:"dii",mean:"good"},{thai:"ดิน",rom:"din",mean:"soil"}] },
    { ch: "ต", name: "To Tao", cls: "mid", sound: "dt", memory: "Unaspirated t — like 't' in 'stop', not 'top'.", words: [{thai:"ตา",rom:"dtaa",mean:"eye"},{thai:"ตาม",rom:"dtaam",mean:"follow"}] },
    { ch: "อ", name: "O Ang", cls: "mid", sound: "silent (vowel carrier)", memory: "อ carries vowels — no consonant sound of its own.", words: [{thai:"อา",rom:"aa",mean:"uncle/aunt"},{thai:"อยาก",rom:"yaak",mean:"want to"}] },
    { ch: "บ", name: "Bo Baimai", cls: "mid", sound: "b", memory: "Looks like a leaf (ใบไม้) on its stem — b sound.", words: [{thai:"บ้าน",rom:"baan",mean:"house"},{thai:"บิน",rom:"bin",mean:"fly"}] },
    { ch: "ป", name: "Po Pla", cls: "mid", sound: "bp", memory: "Like a fish hook (ปลา = fish) — unaspirated p.", words: [{thai:"ปาก",rom:"bpaak",mean:"mouth"},{thai:"ปี",rom:"bpii",mean:"year"}] },
    { ch: "ฎ", name: "Do Chada", cls: "mid", sound: "d", memory: "Ornate ด — appears in formal/royal words like ชฎา (crown headdress).", words: [{thai:"ชฎา",rom:"cha-daa",mean:"crown headdress"}], rare: true },
    { ch: "ฏ", name: "To Patak", cls: "mid", sound: "dt", memory: "Ornate ต — only in Sanskrit/Pali loanwords. Extremely rare.", words: [{thai:"ปฏิบัติ",rom:"bpa-dti-bat",mean:"to practise"}], rare: true },

    // ---- High class (11) ----
    { ch: "ข", name: "Kho Khai", cls: "high", sound: "kh (aspirated k)", memory: "Like ก but with an extra stroke — kh is the aspirated version of k.", words: [{thai:"ขา",rom:"khaa",mean:"leg"},{thai:"ข้าว",rom:"khaao",mean:"rice"}] },
    { ch: "ฃ", name: "Kho Khuat", cls: "high", sound: "kh", memory: "Obsolete — no longer used in modern Thai. Recognise only.", words: [], rare: true },
    { ch: "ฉ", name: "Cho Ching", cls: "high", sound: "ch", memory: "Like cymbals — ฉิ่ง (ching) are Thai cymbals.", words: [{thai:"ฉัน",rom:"chan",mean:"I (female)"},{thai:"ฉลาด",rom:"cha-laat",mean:"clever"}] },
    { ch: "ฐ", name: "Tho Than", cls: "high", sound: "th (aspirated t)", memory: "Ornate ถ — rare, Sanskrit/Pali. ฐาน means base or foundation.", words: [{thai:"ฐาน",rom:"thaan",mean:"base"}], rare: true },
    { ch: "ถ", name: "Tho Thung", cls: "high", sound: "th (aspirated t)", memory: "Like a bag (ถุง thung) hanging — th is aspirated ต.", words: [{thai:"ถนน",rom:"tha-non",mean:"road"},{thai:"ถ้า",rom:"thaa",mean:"if"}] },
    { ch: "ผ", name: "Pho Phueng", cls: "high", sound: "ph (aspirated p)", memory: "Like a bee (ผึ้ง phueng) — ph is aspirated ป.", words: [{thai:"ผม",rom:"phom",mean:"I (male)"},{thai:"ผัก",rom:"phak",mean:"vegetable"}] },
    { ch: "ฝ", name: "Fo Fa", cls: "high", sound: "f", memory: "Like a fence (ฝา) — f sound.", words: [{thai:"ฝน",rom:"fon",mean:"rain"},{thai:"ฝาก",rom:"faak",mean:"to entrust"}] },
    { ch: "ศ", name: "So Sala", cls: "high", sound: "s", memory: "Less common s — appears in formal/Sanskrit words like ศาล (court).", words: [{thai:"ศาล",rom:"saan",mean:"court"}], rare: true },
    { ch: "ษ", name: "So Rusi", cls: "high", sound: "s", memory: "Rarest s — Sanskrit origin, appears in กษัตริย์ (king).", words: [{thai:"กษัตริย์",rom:"ga-sat",mean:"king"}], rare: true },
    { ch: "ส", name: "So Suea", cls: "high", sound: "s", memory: "The most common s-letter — สวัสดี uses ส.", words: [{thai:"สาม",rom:"saam",mean:"three"},{thai:"สวัสดี",rom:"sa-wat-dii",mean:"hello"}] },
    { ch: "ห", name: "Ho Hip", cls: "high", sound: "h", memory: "Like a chest (หีบ hiip) — h sound. Also a silent tone shifter before low-class consonants.", words: [{thai:"หัว",rom:"hua",mean:"head"},{thai:"หา",rom:"haa",mean:"to find"}] },

    // ---- Low class (24) ----
    { ch: "ค", name: "Kho Khon", cls: "low", sound: "kh (aspirated k)", memory: "Most common kh-letter — ครู (teacher), คน (person), คุณ (you).", words: [{thai:"ครู",rom:"khruu",mean:"teacher"},{thai:"คน",rom:"khon",mean:"person"}] },
    { ch: "ฅ", name: "Kho Khon (old)", cls: "low", sound: "kh", memory: "Obsolete — replaced by ค. May appear in old texts or art.", words: [], rare: true },
    { ch: "ฆ", name: "Kho Ra-Khang", cls: "low", sound: "kh", memory: "Rare kh — เมฆ (cloud) is the word most Thais know it from.", words: [{thai:"เมฆ",rom:"mehk",mean:"cloud"}], rare: true },
    { ch: "ง", name: "Ngo Ngu", cls: "low", sound: "ng", memory: "Like a snake — ง makes the 'ng' sound (as in 'sing').", words: [{thai:"งาน",rom:"ngaan",mean:"work"},{thai:"ง่าย",rom:"ngai",mean:"easy"}] },
    { ch: "ช", name: "Cho Chang", cls: "low", sound: "ch", memory: "Like an elephant (ช้าง = elephant) — ch sound, low-class.", words: [{thai:"ชอบ",rom:"chawp",mean:"like"},{thai:"ชื่อ",rom:"chue",mean:"name"}] },
    { ch: "ซ", name: "So So", cls: "low", sound: "s", memory: "Low-class s — less common than ส. ซื้อ (buy) is the key word.", words: [{thai:"ซื้อ",rom:"suue",mean:"buy"},{thai:"ซ้าย",rom:"saai",mean:"left"}] },
    { ch: "ฌ", name: "Cho Choe", cls: "low", sound: "ch", memory: "Rare low-class ch — ฌาน (meditation) is a known word.", words: [{thai:"ฌาน",rom:"jhaan",mean:"meditation"}], rare: true },
    { ch: "ญ", name: "Yo Ying", cls: "low", sound: "y", memory: "Formal y — appears in ญาติ (relative). ย is the common y.", words: [{thai:"ญาติ",rom:"yaat",mean:"relative"}], rare: true },
    { ch: "ณ", name: "No Nen", cls: "low", sound: "n", memory: "Formal น — only in Sanskrit/Pali. Same sound as น.", words: [{thai:"ณ",rom:"na",mean:"at (formal)"}], rare: true },
    { ch: "ท", name: "Tho Thahan", cls: "low", sound: "th (aspirated t)", memory: "Most common th — ทำ (do/make) is essential.", words: [{thai:"ทำ",rom:"tham",mean:"do"},{thai:"ทาง",rom:"thaang",mean:"way"}] },
    { ch: "ธ", name: "Tho Thong", cls: "low", sound: "th", memory: "Less common th — ธนาคาร (bank) is where you'll see it.", words: [{thai:"ธนาคาร",rom:"tha-naa-khaan",mean:"bank"}], rare: true },
    { ch: "น", name: "No Nu", cls: "low", sound: "n", memory: "Like a mouse (หนู = mouse) — n sound.", words: [{thai:"น้ำ",rom:"naam",mean:"water"},{thai:"นอน",rom:"nawn",mean:"sleep"}] },
    { ch: "ฑ", name: "Tho Nang Montho", cls: "low", sound: "th", memory: "Rare th — appears in formal/royal contexts.", words: [{thai:"มณฑล",rom:"mon-thon",mean:"province"}], rare: true },
    { ch: "ฒ", name: "Tho Phuthao", cls: "low", sound: "th", memory: "Rare th — ผู้เฒ่า (elderly person) is the classic example.", words: [{thai:"ผู้เฒ่า",rom:"phuu-thao",mean:"elder"}], rare: true },
    { ch: "พ", name: "Pho Phan", cls: "low", sound: "ph (aspirated p)", memory: "Most common ph — พ่อ (father) is the key word.", words: [{thai:"พ่อ",rom:"phaw",mean:"father"},{thai:"พูด",rom:"phuut",mean:"speak"}] },
    { ch: "ฟ", name: "Fo Fan", cls: "low", sound: "f", memory: "Low-class f — ฟัน (tooth).", words: [{thai:"ฟัน",rom:"fan",mean:"tooth"}] },
    { ch: "ภ", name: "Pho Samphao", cls: "low", sound: "ph", memory: "Less common ph — ภาษา (language) is where you'll see it.", words: [{thai:"ภาษา",rom:"phaa-saa",mean:"language"}], rare: true },
    { ch: "ม", name: "Mo Ma", cls: "low", sound: "m", memory: "Like a horse (ม้า = horse) — m sound.", words: [{thai:"มา",rom:"maa",mean:"come"},{thai:"มีด",rom:"miit",mean:"knife"}] },
    { ch: "ย", name: "Yo Yak", cls: "low", sound: "y", memory: "Like a giant (ยักษ์ = giant) — the common y-letter you use every day.", words: [{thai:"ยา",rom:"yaa",mean:"medicine"},{thai:"ยาก",rom:"yaak",mean:"difficult"}] },
    { ch: "ร", name: "Ro Ruea", cls: "low", sound: "r", memory: "Like a boat (เรือ = boat) — r sound (often pronounced as l in speech).", words: [{thai:"ร้าน",rom:"raan",mean:"shop"},{thai:"รัก",rom:"rak",mean:"love"}] },
    { ch: "ล", name: "Lo Ling", cls: "low", sound: "l", memory: "Like a monkey (ลิง = monkey) — l sound.", words: [{thai:"ลา",rom:"laa",mean:"goodbye"},{thai:"ลาก",rom:"laak",mean:"to drag"}] },
    { ch: "ว", name: "Wo Waen", cls: "low", sound: "w", memory: "Like glasses (แว่น = glasses) — w sound, also a vowel component.", words: [{thai:"วัน",rom:"wan",mean:"day"},{thai:"ว่า",rom:"waa",mean:"that/say"}] },
    { ch: "ฬ", name: "Lo Chula", cls: "low", sound: "l", memory: "Rare ล — appears in จุฬา (Chulalongkorn). Recognise shape only.", words: [{thai:"จุฬา",rom:"ju-laa",mean:"Chulalongkorn"}], rare: true },
    { ch: "ฮ", name: "Ho Nok Huk", cls: "low", sound: "h", memory: "Low-class h — rare, mainly in loanwords. Recognise only.", words: [{thai:"ฮา",rom:"haa",mean:"funny/laugh"}], rare: true }
  ],

  vowels: [
    // NOTE: `display` shows the vowel with carrier อ so combining marks render correctly.
    // `ch` keeps the pure vowel for matching/quiz logic.
    { ch: "า", display: "อา", name: "Sara Aa", sound: "aa (long a)", memory: "Sits to the RIGHT of the consonant: กา = gaa.", words: [{thai:"กา",rom:"gaa",mean:"crow"},{thai:"มา",rom:"maa",mean:"come"}] },
    { ch: "ิ", display: "อิ", name: "Sara I", sound: "i (short)", memory: "Sits ABOVE the consonant: กิน = gin.", words: [{thai:"กิน",rom:"gin",mean:"eat"},{thai:"ดิน",rom:"din",mean:"soil"}] },
    { ch: "ี", display: "อี", name: "Sara Ii", sound: "ii (long)", memory: "Sits ABOVE with a tail: ดี = dii.", words: [{thai:"ดี",rom:"dii",mean:"good"},{thai:"ปี",rom:"bpii",mean:"year"}] },
    { ch: "ึ", display: "อึ", name: "Sara Ue", sound: "ue (short)", memory: "Sits ABOVE: short unrounded 'uh' sound.", words: [{thai:"นึก",rom:"nuek",mean:"to think"}] },
    { ch: "ื", display: "อื", name: "Sara Uue", sound: "uue (long)", memory: "Sits ABOVE with a following form: มือ = muue (hand).", words: [{thai:"มือ",rom:"muue",mean:"hand"},{thai:"ชื่อ",rom:"chue",mean:"name"}] },
    { ch: "ะ", display: "อะ", name: "Sara A", sound: "a (short)", memory: "Short a — like 'a' in 'cup'. Appears after the consonant.", words: [{thai:"กะ",rom:"ga",mean:"to estimate"}] },
    { ch: "ั", display: "อั", name: "Mai Han Akat", sound: "a (short, above)", memory: "The above-written form of ะ — วัน = wan, กัน = gan.", words: [{thai:"วัน",rom:"wan",mean:"day"},{thai:"กัน",rom:"gan",mean:"together"}] },
    { ch: "ุ", display: "อุ", name: "Sara U", sound: "u (short)", memory: "Sits BELOW the consonant — คุณ = khun.", words: [{thai:"คุณ",rom:"khun",mean:"you"},{thai:"กุ้ง",rom:"gung",mean:"shrimp"}] },
    { ch: "ู", display: "อู", name: "Sara Uu", sound: "uu (long)", memory: "Sits BELOW, longer form — รู้ = rúu (know).", words: [{thai:"รู้",rom:"ruu",mean:"to know"},{thai:"ดู",rom:"duu",mean:"to look"}] },
    { ch: "เ", display: "เอ", name: "Sara E", sound: "eh / ee", memory: "Sits BEFORE the consonant — เก = geh.", words: [{thai:"เก่า",rom:"gao",mean:"old"},{thai:"เดิน",rom:"deun",mean:"to walk"}] },
    { ch: "แ", display: "แอ", name: "Sara Ae", sound: "ae (as in 'cat')", memory: "Double เ — แม่ = mae (mother).", words: [{thai:"แม่",rom:"mae",mean:"mother"},{thai:"แพง",rom:"phaeng",mean:"expensive"}] },
    { ch: "โ", display: "โอ", name: "Sara O", sound: "oo (as in 'go')", memory: "Sits BEFORE — โรงแรม = hotel.", words: [{thai:"โต",rom:"dtoo",mean:"big/grow"}] },
    { ch: "ไ", display: "ไอ", name: "Sara Ai", sound: "ai (as in 'Thai')", memory: "Sits BEFORE — ไป = bpai (go), ไม่ = mâi (not).", words: [{thai:"ไป",rom:"bpai",mean:"go"},{thai:"ไม่",rom:"mai",mean:"not"}] },
    { ch: "ำ", display: "อำ", name: "Sara Am", sound: "am", memory: "Sits after the consonant — น้ำ = náam (water), ทำ = tham.", words: [{thai:"น้ำ",rom:"naam",mean:"water"},{thai:"ทำ",rom:"tham",mean:"do"}] },
    { ch: "เอีย", display: "เอีย", name: "Sara Ia", sound: "ia (ee-a)", memory: "เ before + ี above + ย after = เอีย.", words: [{thai:"เมีย",rom:"mia",mean:"wife"},{thai:"เรียน",rom:"rian",mean:"study"}] },
    { ch: "เอือ", display: "เอือ", name: "Sara Uea", sound: "uea (ue-a)", memory: "เ before + ื above + อ after = เอือ.", words: [{thai:"เดือน",rom:"duuan",mean:"month"},{thai:"เมือง",rom:"muueang",mean:"city"}] },
    { ch: "เา", display: "เ-า", name: "Sara Ao", sound: "ao", memory: "เ before + า right = เ-า (e.g. เขา = khao).", words: [{thai:"เขา",rom:"khao",mean:"he/she"},{thai:"เรา",rom:"rao",mean:"we"}] },
    { ch: "์", display: "อ์", name: "Thanthakat", sound: "silent", memory: "This mark makes a consonant silent (karan).", words: [{thai:"กษัตริย์",rom:"ga-sat",mean:"king"}] }
  ],

  // Tone-class summary used by the "Class Sort" game and reference panel.
  classInfo: {
    mid:  { label: "Mid class",  count: 9,  baseline: "MID tone (no mark, live)" },
    high: { label: "High class", count: 11, baseline: "RISING tone (no mark, live)" },
    low:  { label: "Low class",  count: 24, baseline: "MID tone (no mark, live)" }
  },

  // The full set of example words collected from the curriculum, used by games.
  allWords: null
};

// Build a flat word list once.
THAI_DATA.allWords = (() => {
  const list = [];
  const push = (arr, cls) => arr.forEach(w => list.push({ ...w, cls }));
  THAI_DATA.consonants.forEach(c => push(c.words, c.cls));
  THAI_DATA.vowels.forEach(v => push(v.words, "vowel"));
  // de-duplicate by thai text
  const seen = new Set();
  return list.filter(w => { if (seen.has(w.thai)) return false; seen.add(w.thai); return true; });
})();

if (typeof window !== "undefined") window.THAI_DATA = THAI_DATA;
if (typeof module !== "undefined") module.exports = THAI_DATA;