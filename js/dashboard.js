// StreakUp - dashboard.js

// --DATA-- //

let habits = [
  { id: 1, name: "Drink Water", streak: 14, target: 30, done: true, color: "#4cc9f0", svg: `<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>` },
  { id: 2, name: "5-min Meditation", streak: 7, target: 30, done: false, color: "#c77dff", svg: `<path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 013.32-3.97A2.5 2.5 0 019.5 2z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-3.32-3.97A2.5 2.5 0 0014.5 2z"/>` },
  { id: 3, name: "Take the Stairs", streak: 21, target: 30, done: true, color: "#ff6b35", svg: `<path d="M4 16v-2.38C4 11 2 10 2 8a4 4 0 014-4 4 4 0 014 4c0 2-2 3-2 5.62V16"/><path d="M20 16v-2.38C20 11 22 10 22 8a4 4 0 00-4-4 4 4 0 00-4 4c0 2 2 3 2 5.62V16"/><rect x="2" y="16" width="8" height="4" rx="1"/><rect x="14" y="16" width="8" height="4" rx="1"/>` },
  { id: 4, name: "No-Phone Morning", streak: 3, target: 14, done: false, color: "#06d6a0", svg: `<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>` },
  { id: 5, name: "10 Deep Breaths", streak: 9, target: 21, done: true, color: "#ffce3d", svg: `<path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>` },

];


const FRIENDS = [
  { name: "Aanya", score: 94, streak: 22, color: "#ffce3d", isMe: false },
  { name: "Joy", score: 91, streak: 14, color: "#ff6b35", isMe: true },
  { name: "Rohan", score: 87, streak: 18, color: "#4cc9f0", isMe: false },
  { name: "Priya", score: 78, streak: 11, color: "#c77dff", isMe: false },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let weekDone = [true, true, true, true, false, true, false];

const MOOD_DATA = [
  { d: "M", m: 3 }, { d: "T", m: 4 }, { d: "W", m: 5 }, { d: "T", m: 4 }, { d: "F", m: 2 }, { d: "S", m: 4 }, { d: "S", m: 3 }
];

let challenges = [
  { id: 1, name: "Hydration Hero", desc: "Drink water 30 days straight", progress: 14, total: 30, color: "#4cc9f0", reward: "Diamond Drop", joined: true },
  { id: 2, name: "Dawn Detox", desc: "No phone for first 20 mins, 14 days", progress: 3, total: 14, color: "#ffce3d", reward: "Mindful Badge", joined: true },
  { id: 3, name: "Stair Master", desc: "Take stairs daily for 3 weeks", progress: 21, total: 21, color: "#ff6b35", reward: "Elite Mover", joined: true },
  { id: 4, name: "Mindful Warrior", desc: "Meditate 7 days in a row", progress: 0, total: 7, color: "#c77dff", reward: "Zen Badge", joined: false },
];

const MOODS = [
  { l: "Rough", c: "#e63946", svg: `<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>` },
  { l: "Okay", c: "#ffce3d", svg: `<circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>` },
  { l: "Good", c: "#06d6a0", svg: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>` },
  { l: "Great", c: "#ff6b35", svg: `<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>` },
  { l: "On Fire", c: "#c77dff", svg: `<polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>` },
];

const COLORS = ["#4cc9f0", "#c77dff", "#ff6b35", "#06d6a0", "#ffce3d", "#e63946", "#adb5bd"];
let currentMood = null;

// ── HELPERS ──
const $ = id => document.getElementById(id);
const pct = (v, t) => Math.min((v / t) * 100, 100).toFixed(1);

function bar(v, t, c) {
  return `<div class="bar-track"><div class="bar-fill" style="width:${pct(v, t)}%;background:${c};box-shadow:0 0 8px ${c}55;"></div></div>`;
}

function iBox(svgInner, color, cls = "ib-md") {
  const size = cls === 'ib-lg' ? 22 : cls === 'ib-xl' ? 25 : cls === 'ib-sm' ? 16 : 18;
  return `<div class="ib ${cls}" style="background:${color}18;"><svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round">${svgInner}</svg></div>`;
}

function showToast(msg, color = "#06d6a0") {
  const t = $('toast');
  t.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"><polyline points="20,6 9,17 4,12"/></svg><span>${msg}</span>`;
  t.style.borderColor = color + "44";
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}

function confetti() {
  const cols = ["#ff6b35", "#ffce3d", "#4cc9f0", "#c77dff", "#06d6a0"];
  for (let i = 0; i < 32; i++) {
    const el = document.createElement("div");
    el.className = "confetti-p";
    el.style.cssText = `left:${Math.random() * 100}%;width:${i % 3 === 0 ? 9 : 6}px;height:${i % 3 === 0 ? 9 : 14}px;border-radius:${i % 2 === 0 ? "50%" : "2px"};background:${cols[i % cols.length]};animation-duration:${1.3 + Math.random() * 0.8}s;animation-delay:${Math.random() * 0.4}s;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }
}

// ── NAVIGATION ──
function navigate(page) {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.querySelectorAll('.page').forEach(el => el.classList.toggle('active', el.id === 'page-' + page));
  if (page === 'dashboard') renderDashboard();
  if (page === 'squad') renderSquad();
  if (page === 'insights') renderInsights();
  if (page === 'challenges') renderChallenges();
  if (page === 'profile') renderProfile();
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open');
}

function goToLogin() {
  if (confirm('Are you sure you want to logout?')) window.location.href = 'login.html';
}

// ── DASHBOARD ──
function renderDashboard() {
  const done = habits.filter(h => h.done).length;
  const score = Math.round(60 + (done / habits.length) * 31);
  $('sidebar-score').textContent = score;

  $('page-dashboard').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-eyebrow">Good Morning</div>
        <div class="page-title">Dashboard</div>
      </div>
      <button class="btn btn-primary" onclick="showAddHabit()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Habit
      </button>
    </div>

    <div class="g4">
      <div class="stat-card">
        ${iBox(`<polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>`, "#ff6b35", "ib-sm")}
        <div class="stat-val" id="stat-score">${score}</div>
        <div class="stat-lbl">Consistency Score</div>
        <div class="stat-sub">Top 8% this week</div>
      </div>
      <div class="stat-card">
        ${iBox(`<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>`, "#06d6a0", "ib-sm")}
        <div class="stat-val" id="stat-done">${done}/${habits.length}</div>
        <div class="stat-lbl">Done Today</div>
        <div class="stat-sub">habits completed</div>
      </div>
      <div class="stat-card">
        ${iBox(`<path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>`, "#ffce3d", "ib-sm")}
        <div class="stat-val">21</div>
        <div class="stat-lbl">Best Streak</div>
        <div class="stat-sub">Take the Stairs</div>
      </div>
      <div class="stat-card">
        ${iBox(`<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5 5-5-5"/><path d="M17 17l-5-5-5 5"/><line x1="2" y1="12" x2="22" y2="12"/>`, "#4cc9f0", "ib-sm")}
        <div class="stat-val" id="stat-tokens">3</div>
        <div class="stat-lbl">Freeze Tokens</div>
        <div class="stat-sub">click habit to use</div>
      </div>
    </div>

    <div class="g2">
      <div>
        <div class="flex items-c justify-b mb-16">
          <div class="fw-7 fs-16">Today's Habits</div>
          <div class="fs-12 clr-muted" id="habit-count">${done} of ${habits.length} done</div>
        </div>
        <div id="habits-list"></div>
      </div>

      <div class="flex flex-col gap-16">
        <div class="card">
          <div class="flex items-c gap-8 mb-16">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span class="fw-7 fs-14">This Week</span>
            <span class="fs-11 clr-dim ml-auto">${weekDone.filter(Boolean).length}/7 days</span>
          </div>
          <div class="week-grid" id="week-grid"></div>
        </div>

        <div class="card card-blue">
          <div class="flex items-c gap-12">
            ${iBox(`<polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>`, "#4cc9f0")}
            <div style="flex:1;">
              <div class="fw-7 fs-14 mb-4">Morning Chain Active</div>
              <div class="fs-12 clr-muted">Water + Breathing = bonus</div>
              </div>
            <span class="pill pill-blue">+50 XP</span>
          </div>
        </div>

        <div class="card card-grey">
          <div class="flex items-c gap-12">
            ${iBox(`<path d="M9 10h.01M15 10h.01M12 2a8 8 0 018 8v12l-4-4-4 4-4-4-4 4V10a8 8 0 018-8z"/>`, "#adb5bd")}
            <div style="flex:1;">
              <div class="fw-7 fs-14 mb-4">Ghost Mode</div>
              <div class="fs-12 clr-muted">Past-you had 19 days. Gap: 5!</div>
            </div>
            <div class="text-r">
              <div class="fw-8 fs-18" style="color:#adb5bd;">19</div>
              <div class="fs-11 clr-dim">vs 14</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  renderHabits();
  renderWeek();
}

function renderHabits() {
  const list = $('habits-list');
  if (!list) return;
  list.innerHTML = habits.map(h => `
    <div class="habit-card" id="hcard-${h.id}" style="${h.done ? `border-color:${h.color}30;background:${h.color}07` : ""}">
      <div class="ib ib-lg" style="background:${h.done ? h.color : `${h.color}18`};box-shadow:${h.done ? `0 5px 18px ${h.color}33` : ""};transition:all .3s;flex-shrink:0;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${h.done ? "#fff" : h.color}" stroke-width="1.8" stroke-linecap="round">${h.svg}</svg>
      </div>
      <div style="flex:1;min-width:0;">
        <div class="flex items-c gap-8 mb-8">
          <span class="habit-name">${h.name}</span>
          <span class="pill pill-orange">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" stroke-width="1.8" stroke-linecap="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg>
            ${h.streak}d
          </span>
        </div>
        ${bar(h.streak, h.target, h.color)}
        <div class="habit-meta">${h.streak}/${h.target} days to badge</div>
      </div>
      <button class="check-btn" onclick="toggleHabit(${h.id})" title="${h.done ? 'Mark undone' : 'Mark done'}"
        style="${h.done ? `background:linear-gradient(135deg,${h.color},${h.color}cc);box-shadow:0 4px 14px ${h.color}44` : "background:#141428"}">
        ${h.done
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/></svg>`}
      </button>
    </div>
  `).join("");
}

function renderWeek() {
  const grid = $('week-grid');
  if (!grid) return;
  grid.innerHTML = WEEK_DAYS.map((d, i) => `
    <div class="week-col" onclick="toggleDay(${i})" style="cursor:pointer;" title="Toggle ${d}">
      <span class="week-lbl">${d[0]}</span>
      <div class="week-box ${weekDone[i] ? "done" : ""}" id="wday-${i}">
        ${weekDone[i] ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" stroke-width="2.5" stroke-linecap="round"><polyline points="20,6 9,17 4,12"/></svg>` : ""}
      </div>
    </div>
  `).join("");
}

function toggleDay(i) {
  weekDone[i] = !weekDone[i];
  renderWeek();
  showToast(weekDone[i] ? `${WEEK_DAYS[i]} marked done!` : `${WEEK_DAYS[i]} unmarked`);
}

function toggleHabit(id) {
  const h = habits.find(x => x.id === id);
  if (!h) return;
  h.done = !h.done;
  h.streak = h.done ? h.streak + 1 : Math.max(0, h.streak - 1);
  if (h.done) { confetti(); setTimeout(() => showMoodModal(), 700); showToast(`${h.name} completed! 🔥`, h.color); }
  else { showToast(`${h.name} unmarked`); }
  renderHabits();
  const done = habits.filter(x => x.done).length;
  const dc = $('stat-done'); if (dc) dc.textContent = `${done}/${habits.length}`;
  const hc = $('habit-count'); if (hc) hc.textContent = `${done} of ${habits.length} done`;
  const sc = $('stat-score'); if (sc) sc.textContent = Math.round(60 + (done / habits.length) * 31);
  const ss = $('sidebar-score'); if (ss) ss.textContent = Math.round(60 + (done / habits.length) * 31);
}

// ── ADD HABIT MODAL ──
function showAddHabit() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-bg';
  overlay.id = 'add-modal';
  overlay.innerHTML = `
    <div class="modal-box" style="text-align:left;max-width:420px;">
      <div class="flex items-c justify-b mb-20">
        <div class="fw-8 fs-18">Add New Habit</div>
        <button onclick="$('add-modal').remove()" style="background:none;border:none;cursor:pointer;color:#555;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="add-habit-form">
        <div>
          <label class="form-label">Habit Name</label>
          <input class="field" id="new-name" placeholder="e.g. Morning Walk" style="padding-left:14px;"/>
        </div>
        <div>
        <label class="form-label">Target Days</label>
          <select class="form-select" id="new-target">
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="21">21 days</option>
            <option value="30" selected>30 days</option>
          </select>
        </div>
        </div>
        <label class="form-label">Pick Color</label>
          <div class="color-picker" id="color-picker">
            ${COLORS.map((c, i) => `<div class="color-dot ${i === 0 ? "selected" : ""}" style="background:${c};" onclick="selectColor(this,'${c}')" title="${c}"></div>`).join("")}
          </div>
        </div>
        <button class="btn btn-primary btn-full mt-8" onclick="addHabit()" style="margin-top:8px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Habit
        </button>
      </div>
    </div>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

let selectedColor = COLORS[0];
function selectColor(el, c) {
  selectedColor = c;
  document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
}

function addHabit() {
  const name = $('new-name').value.trim();
  if (!name) return showToast('Please enter habit name!', '#e63946');
  const target = parseInt($('new-target').value);
  const simpleSVG = `<circle cx="12" cy="12" r="5"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>`;
  habits.push({ id: Date.now(), name, streak: 0, target, done: false, color: selectedColor, svg: simpleSVG });
  $('add-modal').remove();
  renderDashboard();
  showToast(`${name} added! Start your streak 🔥`, selectedColor);
}

// .............SQUAD ............

function renderSquad() {
  const sorted = [...FRIENDS].sort((a, b) => b.score - a.score);
  const rankCls = ["rank-1", "rank-2", "rank-3", ""];

  $('page-squad').innerHTML = `
    <div class="page-header">
      <div><div class="page-eyebrow">Social</div><div class="page-title">Your Squad</div></div>
      <button class="btn btn-primary" onclick="inviteFriend()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Invite Friend
      </button>
    </div>

    <div class="g2b">
      <div>
        <div class="fs-11 fw-7 uppercase tracking clr-dim mb-16">Weekly Leaderboard</div>
        ${sorted.map((f, i) => `
          <div class="lb-row ${f.isMe ? "me" : ""}">
            <div class="rank ${rankCls[i] || ""}">#${i + 1}</div>
            <div class="ib ib-md" style="background:${f.color}18;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${f.color}" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </div>
            <div style="flex:1;">
              <div class="flex items-c gap-8 mb-4">
                <span class="fw-7 fs-14">${f.name}</span>
                ${f.isMe ? `<span class="pill-you">YOU</span>` : ""}
              </div>

              <div class="flex items-c gap-8 fs-12 clr-muted">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" stroke-width="1.8" stroke-linecap="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg>
                ${f.streak} day streak
              </div>
            </div>
            <div class="score-badge">${f.score}</div>
          </div>
        `).join("")}
      </div>

      <div class="flex flex-col gap-16">
        <div class="card card-purple">
          <div class="flex items-c gap-8 mb-16">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c77dff" stroke-width="1.8" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            <span class="fs-11 fw-7 uppercase tracking" style="color:#c77dff;">Squad Challenge</span>
          </div>

          <div class="fw-7 mb-8" style="font-size:16px;">7-Day Mindfulness Sprint</div>
          <div class="fs-13 clr-muted mb-20" style="line-height:1.6;">All 4 members meditate daily to unlock Zen Squad badge</div>
          <div class="flex gap-8 mb-12">
            ${FRIENDS.map((f, i) => `
              <div style="flex:1;padding:10px 6px;border-radius:11px;text-align:center;background:${i < 2 ? "rgba(76,201,240,0.1)" : "#141428"};border:1px solid ${i < 2 ? "rgba(76,201,240,0.2)" : "transparent"};">
                <div class="fs-11 fw-6" style="color:${i < 2 ? "#4cc9f0" : "#444"};">${f.name}</div>
                ${i < 2 ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#06d6a0" stroke-width="2.5" stroke-linecap="round" style="margin-top:4px;"><polyline points="20,6 9,17 4,12"/></svg>` : ""}
              </div>
            `).join("")}
          </div>
          <div class="fs-12 clr-muted text-c">2 of 4 members on track</div>
        </div>

        <div class="card card-orange">
          <div class="flex items-c gap-12 mb-14">
            ${iBox(`<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>`, "#ff9a3c")}
            <div>
              <div class="fw-7 fs-14 mb-4">Smart Nudge</div>
              <div class="fs-12 clr-muted">Based on your patterns</div>
            </div>
          </div>
          <div class="fs-13 mb-16" style="color:#888;line-height:1.6;">You usually meditate at 8 PM. Set a reminder?</div>
          <button class="btn btn-primary btn-full" onclick="setReminder()">Set Reminder</button>
        </div>
      </div>
    </div>
  `;
}

function inviteFriend() {
  const email = prompt("Enter friend's email to invite:");
  if (email && email.includes("@")) showToast(`Invite sent to ${email}! 🎉`);
  else if (email) showToast("Please enter a valid email", "#e63946");
}

function setReminder() {
  showToast("Reminder set for 8 PM tonight! 🔔");
}

// ----- INSIGHTS -----

function renderInsights() {
  $('page-insights').innerHTML = `
    <div class="page-header">
      <div><div class="page-eyebrow">Analytics</div><div class="page-title">Your Insights</div></div>
    </div>

    <div class="g2eq">
      <div class="card">
        <div class="flex items-c gap-8 mb-20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" stroke-width="1.8" stroke-linecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>
          <span class="fw-7 fs-15">Mood This Week</span>
        </div>

        <div style="display:flex;gap:10px;align-items:flex-end;height:110px;">
          ${MOOD_DATA.map(m => {
    const c = m.m >= 4 ? "#ff6b35" : m.m === 3 ? "#4cc9f0" : "#252535";
    return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:7px;">
              <div style="width:28px;height:28px;border-radius:9px;background:${c}18;display:flex;align-items:center;justify-content:center;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
              </div>

              <div style="width:100%;height:${m.m * 17}px;background:${c};border-radius:6px 6px 3px 3px;box-shadow:0 0 10px ${c}44;min-height:8px;transition:height .8s;"></div>
              <span class="fs-10 clr-dim fw-6">${m.d}</span>
            </div>`;
  }).join("")}
        </div>
      </div>

      <div class="card">
        <div class="flex items-c gap-8 mb-20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" stroke-width="1.8" stroke-linecap="round"><path d="M9 10h.01M15 10h.01M12 2a8 8 0 018 8v12l-4-4-4 4-4-4-4 4V10a8 8 0 018-8z"/></svg>
          <span class="fw-7 fs-15">Ghost Mode</span>
        </div>

        <div class="flex items-c gap-16 mb-16">
          <div style="flex:1;text-align:center;padding:18px;background:rgba(108,117,125,0.08);border-radius:14px;">
            <div class="fw-8 fs-24" style="color:#adb5bd;">19</div>
            <div class="fs-12 clr-dim mt-4 fw-6">Past You</div>
          </div>

          <div class="fw-8 fs-18 clr-dim">VS</div>
          <div style="flex:1;text-align:center;padding:18px;background:rgba(255,107,53,0.08);border-radius:14px;">
            <div class="fw-8 fs-24 clr-orange">14</div>
            <div class="fs-12 clr-dim mt-4 fw-6">Current You</div>
          </div>
        </div>
        <div class="fs-13 text-c clr-muted" style="line-height:1.6;">5 days behind your best. You can do it!</div>
        <button class="btn btn-ghost btn-full mt-12" onclick="showToast('Challenge accepted! 💪')">Accept Challenge</button>
      </div>
    </div>

    <div class="g4">
      ${[
      { ico: `<path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>`, c: "#ff6b35", v: "21 days", l: "Best Streak", s: "Take the Stairs" },
      { ico: `<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>`, c: "#06d6a0", v: "47", l: "Completions", s: "this month" },
      { ico: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`, c: "#ffce3d", v: "Wednesday", l: "Top Mood Day", s: "after walking" },
      { ico: `<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5 5-5-5"/><path d="M17 17l-5-5-5 5"/><line x1="2" y1="12" x2="22" y2="12"/>`, c: "#4cc9f0", v: "3 left", l: "Freeze Tokens", s: "use wisely" },
    ].map(s => `

        <div class="stat-card" style="cursor:pointer;" onclick="showToast('${s.l}: ${s.v}')">
          <div class="ib ib-sm" style="background:${s.c}15;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${s.c}" stroke-width="1.8" stroke-linecap="round">${s.ico}</svg></div>
          <div class="stat-val">${s.v}</div>
          <div class="stat-lbl">${s.l}</div>
          <div class="stat-sub">${s.s}</div>
        </div>
      `).join("")}
    </div>
  `;
}

// --------CHALLENGES --------

function renderChallenges() {
  $('page-challenges').innerHTML = `
    <div class="page-header">
      <div><div class="page-eyebrow">Goals</div><div class="page-title">Challenges</div></div>
    </div>

    <div class="g3">
      ${challenges.map(c => {
    const p = pct(c.progress, c.total);
    const done = c.progress === c.total;
    return `
          <div class="challenge-card" style="${done ? `border-color:${c.color}33` : ""}">
            ${done ? `<div class="done-badge">Done!</div>` : ""}
            <div class="ib ib-xl mb-16" style="background:${c.color}15;box-shadow:0 0 20px ${c.color}1a;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c.color}" stroke-width="1.8" stroke-linecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
            </div>

            <div class="fw-7 mb-8" style="font-size:16px;">${c.name}</div>
            <div class="fs-13 clr-muted mb-16" style="line-height:1.6;">${c.desc}</div>
            ${bar(c.progress, c.total, c.color)}
            <div class="flex justify-b items-c mt-8 mb-12">
              <span class="fs-12 clr-muted fw-6">${c.progress}/${c.total} days</span>
              <span class="fs-12 fw-7" style="color:${c.color};">${c.reward}</span>
            </div>

            <div class="fs-11 fw-7 text-r mb-12" style="color:${c.color};">${p}% complete</div>
            ${!done && !c.joined
        ? `<button class="btn btn-primary btn-full" onclick="joinChallenge(${c.id})">Join Challenge</button>`
        : done
          ? `<button class="btn btn-ghost btn-full" onclick="showToast('${c.name} completed! 🏆')">Share Achievement</button>`
          : `<button class="btn btn-ghost btn-full" onclick="logProgress(${c.id})">Log Today's Progress</button>`
      }
          </div>
        `;
  }).join("")}
    </div>
  `;
}

function joinChallenge(id) {
  const c = challenges.find(x => x.id === id);
  if (c) { c.joined = true; renderChallenges(); showToast(`Joined ${c.name}! 🎯`, c.color); }
}

function logProgress(id) {
  const c = challenges.find(x => x.id === id);
  if (c && c.progress < c.total) {
    c.progress++;
    renderChallenges();
    if (c.progress === c.total) { confetti(); showToast(`${c.name} completed! 🏆`, c.color); }
    else showToast(`Progress logged for ${c.name}! +1 day`, c.color);
  }
}

// -------- PROFILE ---------

function renderProfile() {
  const done = habits.filter(h => h.done).length;
  const score = Math.round(60 + (done / habits.length) * 31);

  $('page-profile').innerHTML = `
    <div class="page-header">
      <div><div class="page-eyebrow">Account</div><div class="page-title">My Profile</div></div>
      <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
    </div>

    <div class="profile-header">
      <div class="profile-avatar">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </div>
      <div>
        <div class="fw-8 fs-24 mb-4">Joy</div>
        <div class="fs-13 clr-muted mb-8">joy@example.com</div>
        <div class="flex gap-12">
          <span class="pill pill-orange">Score: ${score}</span>
          <span class="pill pill-blue">${habits.filter(h => h.done).length} done today</span>
        </div>
      </div>
    </div>

    <div class="g2sm">
      <div class="card">
        <div class="fw-7 fs-16 mb-16">Edit Profile</div>
        <div class="field-wrap">
          <span class="field-ico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2e2e45" stroke-width="1.8" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
          <input class="field" id="p-name" placeholder="Full name" value="Joy"/>
        </div>

        <div class="field-wrap">
          <span class="field-ico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2e2e45" stroke-width="1.8" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
          <input class="field" id="p-email" type="email" placeholder="Email" value="joy@example.com"/>
        </div>

        <div class="field-wrap">
          <span class="field-ico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2e2e45" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
          <input class="field" id="p-pass" type="password" placeholder="New password"/>
        </div>
      </div>

      <div class="card">
        <div class="fw-7 fs-16 mb-16">Your Stats</div>
        ${[
      { l: "Total Habits", v: habits.length },
      { l: "Habits Done", v: habits.filter(h => h.done).length },
      { l: "Best Streak", v: "21 days" },
      { l: "Consistency", v: `${score}%` },
      { l: "Freeze Tokens", v: "3" },
      { l: "Badges Earned", v: "3" },
    ].map(s => `
          <div class="flex justify-b items-c mb-12">
            <span class="fs-13 clr-muted">${s.l}</span>
            <span class="fs-13 fw-7">${s.v}</span>
          </div>
        `).join("")}
        <div class="divider"></div>
        <button class="btn btn-danger btn-full" onclick="goToLogin()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
    </div>
  `;
}

function saveProfile() {
  const name = $('p-name')?.value.trim();
  if (!name) return showToast('Name cannot be empty!', '#e63946');
  showToast('Profile saved successfully! ✅');
}

// ------ MOOD MODAL -------

function showMoodModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-bg';
  overlay.id = 'mood-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="ib ib-md" style="background:rgba(255,107,53,0.15);margin:0 auto 16px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
      </div>

      <div class="fw-8 fs-18 mb-8">Habit Complete!</div>
      <div class="fs-13 clr-muted mb-24">How are you feeling right now?</div>
      <div class="mood-grid">
        ${MOODS.map(m => `
          <button class="mood-btn" onclick="selectMood('${m.l}','${m.c}')">
            <div style="width:48px;height:48px;border-radius:14px;background:${m.c}15;border:1px solid ${m.c}22;display:flex;align-items:center;justify-content:center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${m.c}" stroke-width="1.8" stroke-linecap="round">${m.svg}</svg>
            </div>
            <span class="fs-11 clr-muted fw-6">${m.l}</span>
          </button>
        `).join("")}
      </div>
      <button class="btn btn-ghost btn-full mt-16" onclick="$('mood-modal').remove()">Skip</button>
    </div>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function selectMood(label, color) {
  currentMood = { label, color };
  $('mood-modal')?.remove();
  const mp = $('mood-pill');
  if (mp) {
    mp.classList.remove('hidden');
    mp.style.display = 'flex';
    mp.style.background = color + "12";
    mp.style.border = `1px solid ${color}25`;
    mp.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg><span class="fs-12 fw-6" style="color:${color};">${label}</span>`;
  }
  showToast(`Mood logged: ${label}`, color);
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('dashboard');
});

