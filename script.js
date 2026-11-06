/**
 * VS Code, but it's my portfolio — script.js
 * Kaustubh Bhabal
 * Tab management · Line numbers · Terminal · Sidebar
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════════════ */
const state = {
  activePage: 'welcome',
  openTabs:   ['welcome'],
  termOpen:   false,
};

/* ═══════════════════════════════════════════════════════════
   PAGE METADATA
   ═══════════════════════════════════════════════════════════ */
const pages = {
  welcome:      { label: 'welcome',      icon: true },
  about:        { label: 'about',        icon: true },
  experience:   { label: 'experience',   icon: true },
  projects:     { label: 'projects',     icon: true },
  skills:       { label: 'skills',       icon: true },
  achievements: { label: 'achievements', icon: true },
  contact:      { label: 'contact',      icon: true },
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function fileIcon() {
  return `<svg class="tab__icon" viewBox="0 0 16 16" fill="currentColor" width="13" height="13" aria-hidden="true"><path d="M12 1H4L3 2v12l1 1h8l1-1V2l-1-1zm0 13H4V2h8v12z"/></svg>`;
}

/* ═══════════════════════════════════════════════════════════
   LINE NUMBERS
   ═══════════════════════════════════════════════════════════ */
function buildLineNumbers(pageId) {
  const page = document.getElementById('page-' + pageId);
  if (!page) return;

  const lineCol   = page.querySelector('.line-col');
  const contentEl = page.querySelector('.editor__content');
  if (!lineCol || !contentEl) return;

  const lines = contentEl.querySelectorAll('.line');
  lineCol.innerHTML = '';

  lines.forEach((_, i) => {
    const span = document.createElement('span');
    span.className = 'line-num';
    span.textContent = i + 1;
    lineCol.appendChild(span);
  });
}

function buildAllLineNumbers() {
  Object.keys(pages).forEach(id => buildLineNumbers(id));
}

/* ═══════════════════════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════════════════════ */
const tabBar = document.getElementById('tabBar');

function renderTabs() {
  tabBar.innerHTML = '';

  state.openTabs.forEach(id => {
    const meta = pages[id];
    if (!meta) return;

    const btn = document.createElement('button');
    btn.className = 'tab' + (id === state.activePage ? ' tab--active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', id === state.activePage ? 'true' : 'false');
    btn.setAttribute('aria-label', 'Open ' + meta.label);
    btn.setAttribute('data-page', id);

    btn.innerHTML =
      fileIcon() +
      `<span>${esc(meta.label)}</span>` +
      `<span class="tab__close" data-close="${esc(id)}" role="button" aria-label="Close ${esc(meta.label)}">×</span>`;

    tabBar.appendChild(btn);
  });
}

function openPage(id) {
  if (!pages[id]) return;

  if (!state.openTabs.includes(id)) {
    state.openTabs.push(id);
  }

  const currentPage = document.getElementById('page-' + state.activePage);
  if (currentPage) {
    currentPage.classList.remove('page--active');
    currentPage.style.display = '';
    currentPage.hidden = true;
  }

  state.activePage = id;
  const newPage = document.getElementById('page-' + id);
  if (newPage) {
    newPage.hidden = false;
    newPage.classList.add('page--active');
    newPage.style.display = 'flex';
  }

  updateSidebarHighlight(id);
  renderTabs();
  attachTabCloseListeners();
}

function closePage(id) {
  const idx = state.openTabs.indexOf(id);
  if (idx === -1) return;

  state.openTabs.splice(idx, 1);

  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.remove('page--active');
    page.style.display = '';
    page.hidden = true;
  }

  if (state.activePage === id) {
    if (state.openTabs.length > 0) {
      const nextId = state.openTabs[Math.min(idx, state.openTabs.length - 1)];
      openPage(nextId);
      return;
    } else {
      state.activePage = '';
    }
  }

  renderTabs();
  attachTabCloseListeners();
}

function attachTabCloseListeners() {
  tabBar.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      closePage(btn.getAttribute('data-close'));
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        closePage(btn.getAttribute('data-close'));
      }
    });
  });
}

tabBar.addEventListener('click', e => {
  const tab = e.target.closest('[data-page]');
  if (!tab) return;
  if (e.target.hasAttribute('data-close')) return;
  openPage(tab.getAttribute('data-page'));
});

/* ═══════════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════════ */
function updateSidebarHighlight(id) {
  document.querySelectorAll('.sidebar__file').forEach(btn => {
    btn.classList.toggle('sidebar__file--active', btn.getAttribute('data-page') === id);
  });
}

document.querySelectorAll('.sidebar__file').forEach(btn => {
  btn.addEventListener('click', () => {
    openPage(btn.getAttribute('data-page'));
  });
});

const folderToggle = document.getElementById('folderToggle');
const fileList     = document.getElementById('fileList');

folderToggle?.addEventListener('click', () => {
  const expanded = folderToggle.getAttribute('aria-expanded') === 'true';
  folderToggle.setAttribute('aria-expanded', String(!expanded));
  fileList.hidden = expanded;
});

/* ═══════════════════════════════════════════════════════════
   TERMINAL TOGGLE
   ═══════════════════════════════════════════════════════════ */
const termPanel    = document.getElementById('terminalPanel');
const termToggle   = document.getElementById('termToggle');
const termClose    = document.getElementById('termClose');
const termMaximise = document.getElementById('termMaximise');
const panelResize  = document.getElementById('panelResize');

const PANEL_DEFAULT_H = 260;
const PANEL_MIN_H     = 120;
let panelMaximised    = false;
let panelNormalH      = PANEL_DEFAULT_H;

function openTerminal() {
  if (!termPanel) return;
  termPanel.hidden = false;
  termPanel.style.height = panelNormalH + 'px';
  state.termOpen = true;
  document.getElementById('termInput')?.focus();
}
function closeTerminal() {
  if (!termPanel) return;
  termPanel.hidden = true;
  state.termOpen = false;
  panelMaximised = false;
}

termToggle?.addEventListener('click', () => {
  state.termOpen ? closeTerminal() : openTerminal();
});
termClose?.addEventListener('click', closeTerminal);

termMaximise?.addEventListener('click', () => {
  if (!termPanel) return;
  panelMaximised = !panelMaximised;
  if (panelMaximised) {
    panelNormalH = termPanel.offsetHeight;
    termPanel.style.height = '70vh';
    termMaximise.setAttribute('title', 'Restore panel');
    termMaximise.setAttribute('aria-label', 'Restore panel');
  } else {
    termPanel.style.height = panelNormalH + 'px';
    termMaximise.setAttribute('title', 'Maximise panel');
    termMaximise.setAttribute('aria-label', 'Maximise panel');
  }
});

/* Drag-to-resize */
if (panelResize && termPanel) {
  let dragging = false;
  let startY   = 0;
  let startH   = 0;

  panelResize.addEventListener('mousedown', e => {
    dragging = true;
    startY   = e.clientY;
    startH   = termPanel.offsetHeight;
    document.body.style.cursor     = 'ns-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const delta = startY - e.clientY;
    const newH  = Math.max(PANEL_MIN_H, startH + delta);
    termPanel.style.height = newH + 'px';
    panelNormalH   = newH;
    panelMaximised = false;
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';
  });
}

/* ═══════════════════════════════════════════════════════════
   CURIOSITY TERMINAL — COMMANDS
   ═══════════════════════════════════════════════════════════ */
const surprises = [
  {
    label: 'On curiosity',
    text: `I'd describe myself as a blend of <span class="t-hl">curiosity, imagination\nand perseverance</span>. Not a bad stack for engineering problems.`
  },
  {
    label: 'Four languages',
    text: `I speak Marathi natively, Hindi professionally, English at full\nprofessional level — and <span class="t-hl">Japanese at elementary level</span>.\nYes, I am studying Japanese. Curiosity's fault entirely.`
  },
  {
    label: 'On teams',
    text: `I am a responsible person, especially when in a team.\nI try my best to contribute and be helpful.\nBeing <span class="t-hl">pragmatic and considerate</span> helps me solve problems\nwhile understanding other people's perspectives.`
  },
  {
    label: 'Animal lover',
    text: `I am an animal lover, introvert and someone who finds\n<span class="t-hl">art to be a genuine field of interest</span>.\nLeading a coding club is a productive contradiction.`
  },
  {
    label: 'Speech data',
    text: `I contributed speech data to <span class="t-hl">AI training pipelines at Shaip</span>\nfor two months. Someone's language model might sound\nslightly better because of sentences I recorded.`
  },
  {
    label: 'Excel certified',
    text: `Yes, I have a <span class="t-hl">Microsoft Excel certification</span>.\nDo not sleep on spreadsheets.\nData lives there before it lives anywhere else.`
  },
  {
    label: 'AWS Campus Leader',
    text: `I participated in the <span class="t-hl">AWS Student Builder Campus Leader</span>\nprogram — introducing students to cloud technology,\nthe AWS ecosystem and developer resources.\nThis portfolio was built as part of that challenge.`
  },
];
let surpriseIdx = 0;

const termCommands = {

  help() {
    return `<span class="t-hl">Available commands</span>

<span class="t-blue">whoami     </span>  Get to know me
<span class="t-blue">skills     </span>  Explore my technical interests
<span class="t-blue">projects   </span>  Discover what I've been building
<span class="t-blue">experience </span>  Explore my roles and responsibilities
<span class="t-blue">funfact    </span>  Find something unexpected about me
<span class="t-blue">surprise   </span>  Rotating reveal — run multiple times
<span class="t-blue">clear      </span>  Clear terminal output`;
  },

  whoami() {
    return `<span class="t-hl">Kaustubh Bhabal</span>
<span class="t-blue">Degree    </span>  BE, Artificial Intelligence &amp; Machine Learning
<span class="t-blue">College   </span>  Siddhant College of Engineering, Pune
<span class="t-blue">Year      </span>  Third year (2024 – 2028)
<span class="t-blue">Location  </span>  Pune, Maharashtra, India
<span class="t-blue">Roles     </span>  Lead @ Forge — The Coding Club
<span class="t-blue">          </span>  Google Student Ambassador (India)
<span class="t-blue">          </span>  AWS Student Builder Campus Leader

<span class="t-dim">"Curiosity beats obsession.
 A blend of curiosity, imagination and perseverance.
 Interested in the intersection of hardware,
 software and creativity."</span>`;
  },

  skills() {
    return `<span class="t-hl">Technical Areas</span>

<span class="t-yel">Web             </span>  HTML · CSS · JavaScript
<span class="t-yel">App Dev         </span>  Flutter · Dart · Firebase
<span class="t-yel">AI / ML         </span>  AI/ML fundamentals · Model training · Google ML Kit
<span class="t-yel">Robotics        </span>  CoppeliaSim · Arduino · ESP32
<span class="t-yel">Design          </span>  Figma · Stitch · Canva
<span class="t-yel">Other           </span>  GitHub · Microsoft Excel

<span class="t-dim">Explored through projects, coursework and plenty
of random experimentation.</span>`;
  },

  projects() {
    return `<span class="t-hl">Projects</span>

<span class="t-yel">Sahi Bin              </span>  In Development
  Smart waste segregation — Flutter, Dart, Firebase, ML Kit.
  Role-based workflows, on-device image recognition.

<span class="t-yel">Pritha                </span>  Design Concept
  Nutrition and wellness platform — Figma.
  Calm, accessible product design and UX thinking.

<span class="t-green">Robotics Simulation   </span>  Completed · Lam Research Challenge 2024
  CoppeliaSim — inverse kinematics, path planning,
  team engineering.`;
  },

  experience() {
    return `<span class="t-hl">Experience</span>

<span class="t-blue">Current</span>
  AWS Student Builder Campus Leader
  Lead · Forge, The Coding Club · Aug 2026 – present
  Google Student Ambassador · May 2026 – present
  NSS Volunteer · Siddhant CoE · Jun 2025 – present

<span class="t-blue">Past</span>
  AI Speech Data Contributor · Shaip · Jul – Aug 2026
  Technical Head · ABVP–SCOE · Nov 2025 – Jul 2026
  Marketing Intern · Eduveda Academy · Jan – Mar 2026`;
  },

  funfact() {
    return `<span class="t-hl">Fun Fact</span>

I am simultaneously a <span class="t-hl">Google Student Ambassador</span>
and the <span class="t-hl">Lead of a coding club</span> at the same college.

That means I explain developer tools to the same people
who also ask me why their code will not compile.

I speak four languages. Japanese was entirely curiosity's fault.

Also: this portfolio is a VS Code-themed website
built as part of the <span class="t-hl">AWS Student Builder Challenge</span>.
The irony of using AWS tools to build something
that looks like VS Code is not lost on me.`;
  },

  surprise() {
    const pick = surprises[surpriseIdx % surprises.length];
    surpriseIdx++;
    return `<span class="t-hl">${esc(pick.label)}</span>\n\n${pick.text}`;
  },

  clear() {
    clearTerm();
    return null;
  },
};

/* ── Terminal run ── */
const termOutput = document.getElementById('termOutput');
const termInput  = document.getElementById('termInput');
const termRun    = document.getElementById('termRun');

const termHistory = [];
let termHistIdx   = -1;

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  if (termHistory[0] !== cmd) termHistory.unshift(cmd);
  if (termHistory.length > 40) termHistory.pop();
  termHistIdx = -1;

  if (cmd === 'clear') { clearTerm(); return; }

  const entry = document.createElement('div');
  entry.className = 't-entry';

  const cmdLine = document.createElement('div');
  cmdLine.className = 't-cmd';
  cmdLine.innerHTML =
    `<span class="term-ps1"><span class="ps1-u">kaustubh</span><span class="ps1-s">@</span>` +
    `<span class="ps1-h">portfolio</span><span class="ps1-d">:~$</span></span> ` +
    `<span style="color:var(--tx-primary)">${esc(raw.trim())}</span>`;

  const outEl = document.createElement('div');
  outEl.className = 't-out';

  if (termCommands[cmd]) {
    const result = termCommands[cmd]();
    if (result === null) return;
    outEl.innerHTML = result;
  } else {
    outEl.innerHTML =
      `<span class="t-err">command not found: ${esc(cmd)}</span>\n` +
      `<span class="t-dim">Type <span class="t-hl">help</span> to see available commands.</span>`;
  }

  entry.appendChild(cmdLine);
  entry.appendChild(outEl);
  termOutput.appendChild(entry);

  requestAnimationFrame(() => { termOutput.scrollTop = termOutput.scrollHeight; });
}

function clearTerm() {
  termOutput.querySelectorAll('.t-entry').forEach(e => e.remove());
  if (termInput) { termInput.value = ''; termInput.focus(); }
}

termRun?.addEventListener('click', () => {
  if (!termInput) return;
  runCommand(termInput.value);
  termInput.value = '';
  termInput.focus();
});

termInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    runCommand(termInput.value);
    termInput.value = '';
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (termHistIdx < termHistory.length - 1) {
      termHistIdx++;
      termInput.value = termHistory[termHistIdx] || '';
      requestAnimationFrame(() =>
        termInput.setSelectionRange(termInput.value.length, termInput.value.length));
    }
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (termHistIdx > 0) { termHistIdx--; termInput.value = termHistory[termHistIdx] || ''; }
    else                 { termHistIdx = -1; termInput.value = ''; }
    return;
  }
  if (e.key === 'Tab') {
    e.preventDefault();
    const partial = termInput.value.trim().toLowerCase();
    const match = Object.keys(termCommands).find(c => c.startsWith(partial));
    if (match) termInput.value = match;
    return;
  }
  if (e.key === 'Escape') { termInput.blur(); }
});

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const cmd = chip.getAttribute('data-cmd');
    if (!cmd) return;
    if (!state.termOpen) openTerminal();
    runCommand(cmd);
    if (termInput) termInput.value = '';
  });
});

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
(function init() {
  buildAllLineNumbers();
  openPage('welcome');
})();
