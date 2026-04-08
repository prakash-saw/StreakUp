// StreakUp - dashboard.js

// --DATA-- //

let habits = [
    { id: 1, name: "Drink Water", streak: 14, target: 30, done: true, color: "#4cc9f0", svg: `<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>`},
    { id: 2, name: "5-min Meditation", streak: 7, target: 30, done: false, color: "#c77dff", svg: `<path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 013.32-3.97A2.5 2.5 0 019.5 2z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-3.32-3.97A2.5 2.5 0 0014.5 2z"/>`},
    { id: 3, name: "Take the Stairs", streak: 21, target: 30, done: true, color: "#ff6b35", svg: `<path d="M4 16v-2.38C4 11 2 10 2 8a4 4 0 014-4 4 4 0 014 4c0 2-2 3-2 5.62V16"/><path d="M20 16v-2.38C20 11 22 10 22 8a4 4 0 00-4-4 4 4 0 00-4 4c0 2 2 3 2 5.62V16"/><rect x="2" y="16" width="8" height="4" rx="1"/><rect x="14" y="16" width="8" height="4" rx="1"/>` },
    { id: 4, name: "No-Phone Morning", streak: 3, target: 14, done: false, color: "#06d6a0", svg:`<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>` },
    { id: 5, name:"10 Deep Breaths",  streak:9,  target:21, done:true,  color:"#ffce3d", svg:`<path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>` },

];


const FRIENDS = [
    { name: "Aanya", score: 94, streak:22, color: "#ffce3d", isMe: false },
    { name: "Joy", score: 91, streak: 14, color: "#ff6b35", isMe: true },
    { name:"Rohan", score:87, streak:18, color:"#4cc9f0", isMe:false },
    { name:"Priya", score:78, streak:11, color:"#c77dff", isMe:false },
];

const WEEK_DAYS = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let weekDone = [true,true,true,true,false,true,false];

const MOOD_DATA = [
    {d:"M",m:3},{d:"T",m:4},{d:"W",m:5}, {d:"T",m:4},{d:"F",m:2},{d:"S",m:4},{d:"S",m:3}
];

let challenges = [
  { id:1, name:"Hydration Hero",  desc:"Drink water 30 days straight",        progress:14, total:30, color:"#4cc9f0", reward:"Diamond Drop",  joined:true  },
  { id:2, name:"Dawn Detox",      desc:"No phone for first 20 mins, 14 days",  progress:3,  total:14, color:"#ffce3d", reward:"Mindful Badge", joined:true  },
  { id:3, name:"Stair Master",    desc:"Take stairs daily for 3 weeks",         progress:21, total:21, color:"#ff6b35", reward:"Elite Mover",   joined:true  },
  { id:4, name:"Mindful Warrior", desc:"Meditate 7 days in a row",              progress:0,  total:7,  color:"#c77dff", reward:"Zen Badge",     joined:false },
];

const MOODS = [
  {l:"Rough",c:"#e63946",svg:`<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`},
  {l:"Okay", c:"#ffce3d",svg:`<circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`},
  {l:"Good", c:"#06d6a0",svg:`<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`},
  {l:"Great",c:"#ff6b35",svg:`<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>`},
  {l:"On Fire",c:"#c77dff",svg:`<polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>`},
];

const COLORS = ["#4cc9f0","#c77dff","#ff6b35","#06d6a0","#ffce3d","#e63946","#adb5bd"];
let currentMood = null;

// ── HELPERS ──
const $ = id => document.getElementById(id);
const pct = (v,t) => Math.min((v/t)*100,100).toFixed(1);

function bar(v,t,c) {
  return `<div class="bar-track"><div class="bar-fill" style="width:${pct(v,t)}%;background:${c};box-shadow:0 0 8px ${c}55;"></div></div>`;
}

function iBox(svgInner, color, cls="ib-md") {
  const size = cls==='ib-lg'?22:cls==='ib-xl'?25:cls==='ib-sm'?16:18;
  return `<div class="ib ${cls}" style="background:${color}18;"><svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round">${svgInner}</svg></div>`;
}

function showToast(msg, color="#06d6a0") {
  const t = $('toast');
  t.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"><polyline points="20,6 9,17 4,12"/></svg><span>${msg}</span>`;
  t.style.borderColor = color + "44";
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}

function confetti() {
  const cols = ["#ff6b35","#ffce3d","#4cc9f0","#c77dff","#06d6a0"];
  for (let i=0;i<32;i++) {
    const el = document.createElement("div");
    el.className = "confetti-p";
    el.style.cssText = `left:${Math.random()*100}%;width:${i%3===0?9:6}px;height:${i%3===0?9:14}px;border-radius:${i%2===0?"50%":"2px"};background:${cols[i%cols.length]};animation-duration:${1.3+Math.random()*0.8}s;animation-delay:${Math.random()*0.4}s;`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),2600);
  }
}

// ── NAVIGATION ──
function navigate(page) {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.page===page));
  document.querySelectorAll('.page').forEach(el => el.classList.toggle('active', el.id==='page-'+page));
  if (page==='dashboard')  renderDashboard();
  if (page==='squad')      renderSquad();
  if (page==='insights')   renderInsights();
  if (page==='challenges') renderChallenges();
  if (page==='profile')    renderProfile();
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open');
}

function goToLogin() {
  if (confirm('Are you sure you want to logout?')) window.location.href='login.html';
}

// ── DASHBOARD ──
function renderDashboard() {
  const done = habits.filter(h=>h.done).length;
  const score = Math.round(60 + (done/habits.length)*31);
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
    <div class="habit-card" id="hcard-${h.id}" style="${h.done?`border-color:${h.color}30;background:${h.color}07`:""}">
      <div class="ib ib-lg" style="background:${h.done?h.color:`${h.color}18`};box-shadow:${h.done?`0 5px 18px ${h.color}33`:""};transition:all .3s;flex-shrink:0;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${h.done?"#fff":h.color}" stroke-width="1.8" stroke-linecap="round">${h.svg}</svg>
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
      <button class="check-btn" onclick="toggleHabit(${h.id})" title="${h.done?'Mark undone':'Mark done'}"
        style="${h.done?`background:linear-gradient(135deg,${h.color},${h.color}cc);box-shadow:0 4px 14px ${h.color}44`:"background:#141428"}">
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
  grid.innerHTML = WEEK_DAYS.map((d,i) => `
    <div class="week-col" onclick="toggleDay(${i})" style="cursor:pointer;" title="Toggle ${d}">
      <span class="week-lbl">${d[0]}</span>
      <div class="week-box ${weekDone[i]?"done":""}" id="wday-${i}">
        ${weekDone[i]?`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" stroke-width="2.5" stroke-linecap="round"><polyline points="20,6 9,17 4,12"/></svg>`:""}
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
  const h = habits.find(x=>x.id===id);
  if (!h) return;
  h.done = !h.done;
  h.streak = h.done ? h.streak+1 : Math.max(0,h.streak-1);
  if (h.done) { confetti(); setTimeout(()=>showMoodModal(), 700); showToast(`${h.name} completed! 🔥`, h.color); }
  else { showToast(`${h.name} unmarked`); }
  renderHabits();
  const done = habits.filter(x=>x.done).length;
  const dc = $('stat-done'); if(dc) dc.textContent=`${done}/${habits.length}`;
  const hc = $('habit-count'); if(hc) hc.textContent=`${done} of ${habits.length} done`;
  const sc = $('stat-score'); if(sc) sc.textContent=Math.round(60+(done/habits.length)*31);
  const ss = $('sidebar-score'); if(ss) ss.textContent=Math.round(60+(done/habits.length)*31);
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
            ${COLORS.map((c,i)=>`<div class="color-dot ${i===0?"selected":""}" style="background:${c};" onclick="selectColor(this,'${c}')" title="${c}"></div>`).join("")}
          </div>
        </div>
        <button class="btn btn-primary btn-full mt-8" onclick="addHabit()" style="margin-top:8px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Habit
        </button>
      </div>
    </div>
  `;
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

let selectedColor = COLORS[0];
function selectColor(el, c) {
  selectedColor = c;
  document.querySelectorAll('.color-dot').forEach(d=>d.classList.remove('selected'));
  el.classList.add('selected');
}

function addHabit() {
  const name = $('new-name').value.trim();
  if (!name) return showToast('Please enter habit name!', '#e63946');
  const target = parseInt($('new-target').value);
  const simpleSVG = `<circle cx="12" cy="12" r="5"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>`;
  habits.push({ id: Date.now(), name, streak:0, target, done:false, color:selectedColor, svg:simpleSVG });
  $('add-modal').remove();
  renderDashboard();
  showToast(`${name} added! Start your streak 🔥`, selectedColor);
}
