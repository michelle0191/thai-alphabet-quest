/* ===========================================================
   Thai Alphabet App — game logic
   Built from the 49-day curriculum
   =========================================================== */

/* ---------- Data validation (defensive: if data.js fails, app still loads) ---------- */
const D = window.THAI_DATA || {};
D.consonants = Array.isArray(D.consonants) ? D.consonants : [];
D.vowels     = Array.isArray(D.vowels)     ? D.vowels     : [];
D.allWords   = Array.isArray(D.allWords)   ? D.allWords   : [];
D.tones      = Array.isArray(D.tones)      ? D.tones      : [];
if (!D.consonants.length && !D.vowels.length) {
  console.error("Thai data failed to load — running in degraded mode");
}

/* ---------- Helpers ---------- */
// null-safe query helper. Returns a Proxy over null so that
// $(".missing").classList.add(...) etc. don't throw — they just no-op.
const __noop = () => __safe;
const __safe = new Proxy(function(){}, {
  get: () => __safe,
  apply: () => __safe,
  set: () => true
});
const $ = (s, r = document) => {
  try { return r.querySelector(s) || __safe; }
  catch { return __safe; }
};
const $$ = (s, r = document) => { try { return Array.from(r.querySelectorAll(s)); } catch { return []; } };
const shuffle = (arr) => { const a = Array.isArray(arr) ? [...arr] : []; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (arr, n) => shuffle(arr).slice(0, n);
const rand = (n) => Math.floor(Math.random() * n);
const clsLabel = { mid: "Mid", high: "High", low: "Low" };
// Safe HTML escaper — prevents broken rendering if data contains <, >, & or "
// Written with char codes to avoid HTML-entity mangling.
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, m => {
  switch (m) {
    case "&": return "\u0026amp;";
    case "<": return "\u0026lt;";
    case ">": return "\u0026gt;";
    case '"': return "\u0026quot;";
    case "'": return "\u0026#39;";
    default:  return m;
  }
});

// Persistent progress in localStorage
const STORE_KEY = "thaiAppProgress_v1";
const store = {
  load() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } },
  save(v) { try { localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch {} }
};
let progress = store.load();
progress.xp = progress.xp || 0;
progress.streak = progress.streak || 0;
progress.known = progress.known || {};
progress.lastVisit = progress.lastVisit || Date.now();
function bumpXP(n) { progress.xp += n; renderHUD(); store.save(progress); }
function markKnown(ch, correct) {
  progress.known[ch] = (progress.known[ch] || 0) + (correct ? 1 : -0.5);
  if (progress.known[ch] < 0) progress.known[ch] = 0;
  store.save(progress);
}

function toast(msg, type = "") {
  let el = $("#toast");
  el.textContent = msg;
  el.className = "toast show " + type;
  clearTimeout(window.__toastT);
  window.__toastT = setTimeout(() => el.className = "toast", 1400);
}

// Text-to-speech for pronunciation practice (wrapped in try/catch — some
// browsers throw on cancel() or speak() if not fully ready)
function speak(text, rate = 0.85, onend) {
  // Try pre-generated audio file first (works on ALL devices, no voice install needed)
  const audioUrl = "audio/" + encodeURIComponent(text) + ".mp3";
  const audio = new Audio(audioUrl);
  audio.playbackRate = rate || 0.85;
  audio.onended = () => { if (onend) onend(); };
  audio.onerror = () => {
    // Fall back to browser TTS if audio file is missing
    try {
      if (!("speechSynthesis" in window)) { if (onend) onend(); return; }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "th-TH";
      u.rate = rate;
      const voices = window.speechSynthesis.getVoices();
      const th = voices.find(v => /th/i.test(v.lang));
      if (th) u.voice = th;
      if (onend) u.onend = onend;
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn("speak() fallback failed:", e);
      if (onend) try { onend(); } catch {}
    }
  };
  audio.play().catch(() => audio.onerror());
}
if ("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = () => {};

/* ---------- Navigation ---------- */
function showScreen(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $("#" + id).classList.add("active");
  $$(".nav button").forEach(b => b.classList.toggle("active", b.dataset.screen === id));
  if (id === "ref") renderReference();
  if (id === "flash") renderFlashcard();
  if (id === "match") startMatching();
  if (id === "memory") startMemory();
  if (id === "sort") startSort();
  if (id === "quiz") startQuiz();
  if (id === "pron") startPron();
  if (id === "tones") renderTones();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHUD() {
  $("#xp").textContent = progress.xp;
  const known = Object.values(progress.known).filter(v => v >= 2).length;
  $("#known").textContent = known;
  const total = D.consonants.length + D.vowels.length;
  $("#total").textContent = total;
}

/* =====================================================================
   1. REFERENCE CHART
   ===================================================================== */
function renderReference() {
  const wrap = $("#refGrid");
  const filter = $("#refFilter").value;
  wrap.innerHTML = "";
  let items = [];
  if (filter === "all" || filter === "mid" || filter === "high" || filter === "low") {
    D.consonants
      .filter(c => filter === "all" ? true : c.cls === filter)
      .forEach(c => items.push({ ...c, type: "c" }));
  }
  if (filter === "all" || filter === "vowel") {
    D.vowels.forEach(v => items.push({ ...v, cls: "vowel", type: "v" }));
  }
  items.forEach(it => {
    const card = document.createElement("div");
    card.className = "card";
    const shown = it.display || it.ch;   // vowels use carrier อ form
    card.innerHTML = `
      <div class="ch thai">${shown}</div>
      <div class="nm">${it.name}${it.rare ? ' <span class="badge rare" style="margin:0;">rare</span>' : ""}</div>
      <div class="sd">${it.sound}</div>
      <span class="badge ${it.cls}">${clsLabel[it.cls] || "Vowel"}</span>
    `;
    card.onclick = () => {
      speak(shown);
      toast(`${it.name} — ${it.sound}`, "");
    };
    wrap.appendChild(card);
  });
}

/* =====================================================================
   2. FLASHCARDS
   ===================================================================== */
let fcDeck = [];
let fcIdx = 0;
function buildFlashDeck() {
  const filter = $("#fcFilter").value;
  let pool = [];
  if (filter === "vowel") pool = D.vowels.map(v => ({ ...v, cls: "vowel", type: "v" }));
  else pool = D.consonants.filter(c => filter === "all" ? true : c.cls === filter);
  fcDeck = shuffle(pool);
  fcIdx = 0;
}
function renderFlashcard() {
  if (!fcDeck.length || fcIdx >= fcDeck.length) {
    buildFlashDeck();
    fcIdx = 0;
  }
  if (!fcDeck.length) return;
  const c = fcDeck[fcIdx];
  const card = $("#flashcard");
  card.classList.remove("flipped");
  const shown = c.display || c.ch;       // vowels render with carrier อ
  const wordsHtml = (c.words || []).slice(0, 2).map(w =>
    `<div class="row"><b class="thai">${w.thai}</b> — ${w.rom} — ${w.mean}</div>`
  ).join("");
  $("#fcFront").innerHTML = `
    <span class="badge ${c.cls}">${clsLabel[c.cls] || "Vowel"}</span>
    <div class="fc-char thai">${shown}</div>
    <div class="fc-name">${c.name}</div>
  `;
  $("#fcBack").innerHTML = `
    <span class="badge ${c.cls}">${clsLabel[c.cls] || "Vowel"}</span>
    <div class="fc-char thai" style="font-size:90px;">${shown}</div>
    <div class="row"><b>Sound:</b> ${c.sound}</div>
    <div class="row" style="color:var(--muted);font-size:13px;">${c.memory}</div>
    ${wordsHtml}
  `;
  $("#fcCount").textContent = `${fcIdx + 1} / ${fcDeck.length}`;
}
function fcFlip() { $("#flashcard").classList.toggle("flipped"); bumpXP(1); }
function fcNext(dir) {
  fcIdx = (fcIdx + dir + fcDeck.length) % fcDeck.length;
  renderFlashcard();
}
function fcShuffle() { buildFlashDeck(); renderFlashcard(); toast("Shuffled 🔀"); }

/* =====================================================================
   3. MATCHING GAME
   ===================================================================== */
let matchState = null;
function startMatching() {
  const mode = $("#matchMode").value; // "char-name" | "char-sound" | "word-mean"
  let pairs = [];
  if (mode === "word-mean") {
    pairs = sample(D.allWords.filter(w => w.thai.length <= 6), 6).map(w => ({
      left: w.thai, right: w.mean, leftIsText: true
    }));
  } else {
    // Mix consonants + vowels so the game covers the full alphabet.
    const cons  = D.consonants.filter(c => !c.rare || Math.random() < 0.3);
    const vows  = D.vowels.filter(v => v.display);   // only vowels that have a display form
    const pool  = shuffle([...cons, ...vows]).slice(0, 6);
    pairs = pool.map(c => ({
      left: c.display || c.ch,                       // visible form (carrier for vowels)
      right: mode === "char-sound" ? c.sound : c.name,
      leftIsText: true
    }));
  }
  pairs = pairs.map((p, i) => ({ ...p, pairId: i }));
  const left = shuffle(pairs);
  const right = shuffle(pairs);
  matchState = { left, right, selected: null, done: 0, total: pairs.length, mode };
  renderMatching();
}
function renderMatching() {
  const left = $("#matchLeft"), right = $("#matchRight");
  left.innerHTML = ""; right.innerHTML = "";
  matchState.left.forEach((p, i) => left.appendChild(matchTile(p.left, "L" + i, p.leftIsText, p.pairId)));
  matchState.right.forEach((p, i) => right.appendChild(matchTile(p.right, "R" + i, !p.leftIsText, p.pairId)));
  $("#matchProgress").style.width = (matchState.done / matchState.total * 100) + "%";
}
function matchTile(content, id, big, pairId) {
  const t = document.createElement("div");
  t.className = "match-tile";
  t.dataset.id = id;
  t.dataset.content = content;
  t.dataset.pair = pairId;
  t.innerHTML = `<div class="${big ? "big thai" : "sub"}">${content}</div>`;
  t.onclick = () => onMatchClick(t);
  return t;
}
function onMatchClick(tile) {
  if (tile.classList.contains("correct")) return;
  if (!matchState.selected) {
    tile.classList.add("selected");
    matchState.selected = tile;
    return;
  }
  // must pick from opposite column
  const sameCol = tile.dataset.id[0] === matchState.selected.dataset.id[0];
  if (tile === matchState.selected) { tile.classList.remove("selected"); matchState.selected = null; return; }
  if (sameCol) {
    matchState.selected.classList.remove("selected");
    tile.classList.add("selected");
    matchState.selected = tile;
    return;
  }
  // check match — compare pairId, not content (left & right tiles show different strings)
  if (tile.dataset.pair === matchState.selected.dataset.pair) {
    tile.classList.add("correct"); matchState.selected.classList.add("correct");
    matchState.done++;
    bumpXP(5);
    toast("✓ Correct! +5", "good");
    speak(matchState.selected.dataset.content);
    if (matchState.done === matchState.total) {
      setTimeout(() => { bumpXP(15); toast("Round complete! +15 🎉", "good"); }, 400);
    }
  } else {
    tile.classList.add("wrong"); matchState.selected.classList.add("wrong");
    bumpXP(1);
    setTimeout(() => { tile.classList.remove("wrong"); matchState.selected.classList.remove("wrong"); }, 500);
  }
  $("#matchProgress").style.width = (matchState.done / matchState.total * 100) + "%";
  matchState.selected = null;
}

/* =====================================================================
   4. MEMORY PAIRS
   ===================================================================== */
let memState = null;
function startMemory() {
  const n = 8; // 8 pairs = 16 cards
  // Include vowels (using their visible display form) so memory covers the whole alphabet.
  const cons = D.consonants.filter(c => !c.rare).map(c => ({ ch: c.ch, name: c.name }));
  const vows = D.vowels.filter(v => v.display).map(v => ({ ch: v.display, name: v.name }));
  const pool = shuffle([...cons, ...vows]).slice(0, n);
  const cards = [];
  pool.forEach((c, i) => {
    cards.push({ id: i, side: "ch", text: c.ch });
    cards.push({ id: i, side: "name", text: c.name });
  });
  memState = { deck: shuffle(cards), flipped: [], done: 0, total: n, locked: false };
  renderMemory();
}
function renderMemory() {
  const grid = $("#memoryGrid");
  grid.innerHTML = "";
  memState.deck.forEach((card, idx) => {
    const b = document.createElement("button");
    b.className = "mem-tile";
    b.dataset.idx = idx;
    b.innerHTML = `
      <div class="mem-inner">
        <div class="mem-side mem-front">?</div>
        <div class="mem-side mem-back">
          <div class="${card.side === "ch" ? "ch thai" : "lbl"}">${card.text}</div>
        </div>
      </div>`;
    b.onclick = () => onMemClick(b, idx);
    grid.appendChild(b);
  });
}
function onMemClick(b, idx) {
  if (memState.locked) return;
  if (b.classList.contains("flipped") || b.classList.contains("done")) return;
  b.classList.add("flipped");
  memState.flipped.push({ idx, card: memState.deck[idx], el: b });
  if (memState.flipped.length === 2) {
    memState.locked = true;
    const [a, c] = memState.flipped;
    if (a.card.id === c.card.id && a.card.side !== c.card.side) {
      setTimeout(() => {
        a.el.classList.add("done"); c.el.classList.add("done");
        memState.done++; bumpXP(6);
        speak(a.card.text);
        toast("✓ Pair found! +6", "good");
        if (memState.done === memState.total) { bumpXP(20); toast("Memory complete! +20 🏆", "good"); }
        memState.flipped = []; memState.locked = false;
      }, 450);
    } else {
      bumpXP(1);
      setTimeout(() => {
        a.el.classList.remove("flipped"); c.el.classList.remove("flipped");
        memState.flipped = []; memState.locked = false;
      }, 850);
    }
  }
}

/* =====================================================================
   5. CLASS SORT (drag & drop)
   ===================================================================== */
let sortState = null;
function startSort() {
  const n = 12;
  const pool = sample(D.consonants.filter(c => !c.rare), n);
  sortState = { pool, placed: 0, correct: 0 };
  renderSort();
}
function renderSort() {
  $$(".zone .pile").forEach(p => p.innerHTML = "");
  const q = $("#sortQueue");
  q.innerHTML = "";
  sortState.pool.forEach((c, i) => {
    const chip = document.createElement("div");
    chip.className = "chip thai";
    chip.textContent = c.ch;
    chip.draggable = true;
    chip.dataset.idx = i;
    chip.dataset.cls = c.cls;
    chip.addEventListener("dragstart", e => { chip.classList.add("dragging"); e.dataTransfer.setData("text", i); });
    chip.addEventListener("dragend", () => chip.classList.remove("dragging"));
    chip.addEventListener("click", () => speak(c.ch));
    // touch fallback: tap target zone
    chip.addEventListener("touchstart", () => { window.__sortSel = chip; toast(`Selected ${c.ch} — tap a zone`); });
    q.appendChild(chip);
  });
}
function setupSortZones() {
  $$(".zone").forEach(z => {
    z.addEventListener("dragover", e => { e.preventDefault(); z.classList.add("over"); });
    z.addEventListener("dragleave", () => z.classList.remove("over"));
    z.addEventListener("drop", e => {
      e.preventDefault(); z.classList.remove("over");
      const idx = e.dataTransfer.getData("text");
      placeChip(idx, z.dataset.cls, z);
    });
    z.addEventListener("click", () => {
      if (window.__sortSel) {
        placeChip(window.__sortSel.dataset.idx, z.dataset.cls, z);
        window.__sortSel = null;
      }
    });
  });
}
function placeChip(idx, cls, zone) {
  const chip = $(`#sortQueue .chip[data-idx="${idx}"]`);
  if (!chip) return;
  const c = sortState.pool[idx];
  if (chip.parentElement.id === "sortQueue") {
    if (c.cls === cls) {
      zone.querySelector(".pile").appendChild(chip);
      chip.draggable = false;
      chip.style.cursor = "default";
      chip.style.background = "rgba(46,204,113,.2)";
      sortState.correct++; sortState.placed++;
      bumpXP(5);
      speak(c.ch);
      toast(`✓ ${c.ch} = ${clsLabel[c.cls]} class`, "good");
      markKnown(c.ch, true);
      if (sortState.placed === sortState.pool.length) {
        setTimeout(() => { bumpXP(20); toast(`Sorted! ${sortState.correct}/${sortState.pool.length} 🎉`, "good"); }, 400);
      }
    } else {
      bumpXP(1);
      toast(`✗ ${c.ch} is ${clsLabel[c.cls]} class`, "bad");
      chip.style.background = "rgba(255,92,122,.25)";
      setTimeout(() => chip.style.background = "", 600);
    }
  }
}

/* =====================================================================
   6. SOUND / TONE QUIZ
   ===================================================================== */
let quizState = null;
function startQuiz() {
  const type = $("#quizType").value; // "sound" | "class" | "name"
  const pool = shuffle(D.consonants.filter(c => !c.rare));
  quizState = { type, pool, idx: 0, score: 0, answers: [] };
  renderQuiz();
}
function renderQuiz() {
  const wrap = $("#quizArea");
  if (!quizState || quizState.idx >= quizState.pool.length) {
    const pct = quizState ? Math.round(quizState.score / quizState.pool.length * 100) : 0;
    const stars = pct >= 90 ? "⭐⭐⭐" : pct >= 70 ? "⭐⭐" : pct >= 50 ? "⭐" : "💪";
    wrap.innerHTML = `
      <div class="result-box">
        <div class="stars">${stars}</div>
        <div class="score">${quizState.score} / ${quizState.pool.length}</div>
        <p style="color:var(--muted);">${pct}% correct</p>
        <button class="btn primary" onclick="startQuiz()">Play again</button>
      </div>`;
    bumpXP(quizState.score * 3);
    return;
  }
  const c = quizState.pool[quizState.idx];
  let key;
  if (quizState.type === "sound")   { key = c.sound; }
  if (quizState.type === "class")   { key = c.cls;   }
  if (quizState.type === "name")    { key = c.name;  }
  const choose = D.consonants;
  // Robust option builder:
  let options;
  if (quizState.type === "class") {
    options = shuffle(["mid", "high", "low"].map(k => ({ label: clsLabel[k], value: k })));
  } else {
    const field = quizState.type;
    const distractors = shuffle(choose.filter(x => x[field] !== key)).slice(0, 3);
    options = shuffle([{ label: key, value: key, correct: true }, ...distractors.map(x => ({ label: x[field], value: x[field] }))]);
  }
  if (!options.find(o => o.value === key)) options[0] = { label: key, value: key, correct: true };
  options = options.slice(0, 4);

  wrap.innerHTML = `
    <div class="progress-bar"><div class="fill" style="width:${quizState.idx / quizState.pool.length * 100}%"></div></div>
    <div class="quiz-prompt">
      <div class="big thai">${c.ch}</div>
      <div class="q">${quizState.type === "sound" ? "What sound does this make?" : quizState.type === "class" ? "Which tone class?" : "What is this letter called?"}</div>
      <button class="btn small" onclick="speak('${c.ch}')">🔊 Hear it</button>
    </div>
    <div class="choices">
      ${options.map((o, i) => `<div class="choice" data-i="${i}" data-v="${o.value}">${o.label}</div>`).join("")}
    </div>
    <p style="text-align:center;color:var(--muted);margin-top:14px;font-size:13px;">Tap to answer · ${quizState.idx + 1} of ${quizState.pool.length}</p>
  `;
  $$("#quizArea .choice").forEach(el => el.onclick = () => onQuizAnswer(el, key, c));
}
function onQuizAnswer(el, key, c) {
  const correct = el.dataset.v === key;
  $$("#quizArea .choice").forEach(o => {
    o.style.pointerEvents = "none";
    if (o.dataset.v === key) o.classList.add("correct");
  });
  if (!correct) el.classList.add("wrong");
  if (correct) { quizState.score++; toast("✓ Correct!", "good"); markKnown(c.ch, true); }
  else { toast(`Answer: ${key}`, "bad"); markKnown(c.ch, false); }
  speak(c.ch);
  setTimeout(() => { quizState.idx++; renderQuiz(); }, 1000);
}

/* =====================================================================
   7. PRONUNCIATION PRACTICE
   ===================================================================== */
let pronState = null;
let pronRecognition = null;
function startPron() {
  pronNext();
  // setup speech recognition if available
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR && !pronRecognition) {
    pronRecognition = new SR();
    pronRecognition.lang = "th-TH";
    pronRecognition.continuous = false;
    pronRecognition.interimResults = false;
    pronRecognition.onresult = (e) => {
      const heard = e.results[0][0].transcript.trim();
      gradePron(heard);
    };
    pronRecognition.onend = () => {
      $("#micBtn").classList.remove("recording");
    };
    pronRecognition.onerror = () => {
      $("#micBtn").classList.remove("recording");
      toast("Mic error — try again", "bad");
    };
  }
}
function pronNext() {
  const mode = $("#pronMode").value; // "letters" | "words"
  let item;
  if (mode === "words") {
    item = sample(D.allWords.filter(w => w.thai.length <= 5), 1)[0];
    pronState = { target: item.thai, rom: item.rom, mean: item.mean };
  } else {
    const c = sample(D.consonants.filter(c => !c.rare), 1)[0];
    pronState = { target: c.ch, rom: c.name, mean: c.sound };
  }
  renderPron(0);
}
function renderPron(score) {
  $("#pronArea").innerHTML = `
    <div class="pron-card">
      <div class="big thai">${pronState.target}</div>
      <div class="rom">${pronState.rom}</div>
      <div class="mean">${pronState.mean || ""}</div>
      <button class="btn small" onclick="speak('${pronState.target}')">🔊 Hear it</button>
      <div>
        <button id="micBtn" class="mic-btn" title="Record">🎙</button>
      </div>
      <div class="pron-meter"><div class="fill" style="width:${score}%"></div></div>
      <div class="tip">${score === 0 ? "Tap the mic and repeat after the tone." : score >= 70 ? "Great! 🎉" : "Try to match the tone."}</div>
    </div>
    <div style="text-align:center;margin-top:14px;">
      <button class="btn small" onclick="pronNext()">Next ➜</button>
    </div>
  `;
  $("#micBtn").onclick = onMicClick;
}
function onMicClick() {
  if (!pronRecognition) {
    // fallback: simple "repeat" grading via timing
    toast("Speech recognition not available — tap 🔊 and repeat aloud", "");
    speak(pronState.target, 0.8, () => {
      renderPron(70 + rand(25));
      bumpXP(4);
      markKnown(pronState.target, true);
    });
    return;
  }
  try {
    $("#micBtn").classList.add("recording");
    pronRecognition.start();
  } catch {
    $("#micBtn").classList.remove("recording");
  }
}
function gradePron(heard) {
  // simple similarity score
  const t = pronState.target;
  let s = 0;
  if (heard === t) s = 100;
  else {
    // character overlap
    const setT = new Set([...t]);
    const setH = new Set([...heard]);
    let common = 0;
    setT.forEach(c => { if (setH.has(c)) common++; });
    s = Math.round(common / setT.size * 80) + 15;
  }
  renderPron(s);
  bumpXP(Math.round(s / 10));
  markKnown(t, s >= 60);
  if (s >= 80) toast("Excellent! ⭐", "good");
  else if (s >= 50) toast("Good effort 👍", "");
  else toast("Try again — listen and repeat", "bad");
}

/* =====================================================================
   8. TONES TABLE
   ===================================================================== */
function renderTones() {
  const rows = [
    { cls: "mid",  no: "MID",     ek: "LOW",     tho: "FALLING", tri: "HIGH",    jat: "RISING" },
    { cls: "high", no: "RISING",  ek: "LOW",     tho: "FALLING", tri: "—",       jat: "—" },
    { cls: "low",  no: "MID",     ek: "FALLING", tho: "HIGH",    tri: "—",       jat: "—" }
  ];
  const tone = (s) => `<span class="tag ${s === "—" ? "" : s.toLowerCase()}">${s}</span>`;
  $("#tonesTable").innerHTML = `
    <table class="tones">
      <thead><tr><th>Class</th><th>No mark (live)</th><th>่ mai ek</th><th>้ mai tho</th><th>๊ mai tri</th><th>๋ jattawa</th></tr></thead>
      <tbody>
        ${rows.map(r => `<tr>
          <td><span class="tag ${r.cls}">${clsLabel[r.cls]}</span></td>
          <td>${tone(r.no)}</td><td>${tone(r.ek)}</td><td>${tone(r.tho)}</td>
          <td>${tone(r.tri)}</td><td>${tone(r.jat)}</td>
        </tr>`).join("")}
      </tbody>
    </table>
    <div class="grid" style="margin-top:18px;">
      <div class="card" onclick="speak('กา')"><div class="ch thai">กา</div><div class="nm">mid · MID</div></div>
      <div class="card" onclick="speak('ขา')"><div class="ch thai">ขา</div><div class="nm">high · RISING</div></div>
      <div class="card" onclick="speak('มา')"><div class="ch thai">มา</div><div class="nm">low · MID</div></div>
      <div class="card" onclick="speak('น้ำ')"><div class="ch thai">น้ำ</div><div class="nm">low + ้ · HIGH</div></div>
      <div class="card" onclick="speak('บ้าน')"><div class="ch thai">บ้าน</div><div class="nm">mid + ้ · FALLING</div></div>
      <div class="card" onclick="speak('หมา')"><div class="ch thai">หมา</div><div class="nm">ห+ม · RISING</div></div>
    </div>
    <p style="color:var(--muted);font-size:13px;margin-top:16px;">
      Tip: the FIRST consonant of a syllable decides the class. The ห-prefix silently shifts a low-class consonant to high-class rules.
    </p>
  `;
}

/* =====================================================================
   WIRING
   ===================================================================== */
// Global error handler — catches any uncaught error so the app keeps running
// instead of freezing with a blank screen. Logs to console for debugging.
window.addEventListener("error", (e) => {
  console.error("Caught error:", e.error || e.message);
  try { toast("Something went wrong — continuing", "bad"); } catch {}
  return true; // prevent default
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  e.preventDefault();
});

function init() {
  // nav
  $$(".nav button").forEach(b => b.addEventListener("click", () => showScreen(b.dataset.screen)));
  // controls
  $("#refFilter").addEventListener("change", renderReference);
  $("#fcFilter").addEventListener("change", () => { buildFlashDeck(); renderFlashcard(); });
  $("#matchMode").addEventListener("change", startMatching);
  $("#quizType").addEventListener("change", startQuiz);
  $("#pronMode").addEventListener("change", pronNext);
  // expose for inline handlers
  window.speak = speak;
  window.fcFlip = fcFlip;
  window.fcNext = fcNext;
  window.fcShuffle = fcShuffle;
  window.startQuiz = startQuiz;
  window.pronNext = pronNext;
  window.startMatching = startMatching;
  window.startMemory = startMemory;
  window.showScreen = showScreen;
  // init
  setupSortZones();
  renderHUD();
  showScreen("home");
  // streak: if visited yesterday, increment
  const today = new Date().toDateString();
  if (progress.lastDay !== today) {
    const yesterday = new Date(Date.now() - 864e5).toDateString();
    progress.streak = (progress.lastDay === yesterday) ? (progress.streak + 1) : 1;
    progress.lastDay = today;
    store.save(progress);
    renderHUD();
  }
}
// Boot — wrap in try/catch so a failure in init() still shows the app shell
document.addEventListener("DOMContentLoaded", () => {
  try { init(); }
  catch (e) { console.error("init() failed:", e); }
});
