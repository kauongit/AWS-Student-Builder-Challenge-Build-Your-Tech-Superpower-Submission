/**
 * KAUSTUBH.EXE — script.js
 * VS Code Dark + Amethyst theme
 * Navigation · Curiosity Terminal · Scroll Reveal · Breadcrumb
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   1. SIDEBAR FILE HIGHLIGHT & BREADCRUMB UPDATE on scroll
   ═══════════════════════════════════════════════════════════ */
(function initScrollSpy() {
  const sections    = document.querySelectorAll('section[id]');
  const sidebarFiles = document.querySelectorAll('.sidebar__file, .sidebar__symbol');
  const bcSymbol    = document.getElementById('breadcrumb-symbol');
  const bcCurrent   = document.getElementById('breadcrumb-current');

  if (!sections.length) return;

  // Map section IDs to labels
  const labels = {
    hero:         { symbol: 'Hero',         file: 'index.html' },
    about:        { symbol: 'about()',       file: 'about.md'   },
    experience:   { symbol: 'experience',    file: 'experience.md' },
    superpowers:  { symbol: 'skills{}',      file: 'index.html' },
    projects:     { symbol: 'projects[]',    file: 'index.html' },
    achievements: { symbol: 'achievements[]',file: 'achievements.md' },
    terminal:     { symbol: 'terminal()',    file: 'terminal.js' },
    education:    { symbol: 'education[]',   file: 'index.html' },
    contact:      { symbol: 'connect()',     file: 'contact.md' },
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      const info = labels[id] || { symbol: id, file: 'index.html' };

      // Breadcrumb
      if (bcSymbol)  bcSymbol.textContent  = info.symbol;
      if (bcCurrent) bcCurrent.textContent = info.file;

      // Sidebar highlight
      sidebarFiles.forEach(el => {
        const href = el.getAttribute('href');
        el.classList.toggle('sidebar__file--active', href === `#${id}`);
      });
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -30% 0px' });

  sections.forEach(s => observer.observe(s));
})();


/* ═══════════════════════════════════════════════════════════
   2. SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = [
    '.power-card', '.project-card', '.achievement-card',
    '.edu-card', '.contact-card', '.timeline-item',
    '.about__text', '.about__meta', '.section__header',
  ];

  const els = document.querySelectorAll(targets.join(', '));
  els.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   3. CURIOSITY TERMINAL
   ═══════════════════════════════════════════════════════════ */
(function initTerminal() {

  const output   = document.getElementById('terminalOutput');
  const input    = document.getElementById('terminalInput');
  const runBtn   = document.getElementById('terminalRunBtn');
  const clearBtn = document.getElementById('terminalClearBtn');
  const chips    = document.querySelectorAll('.chip');

  if (!output || !input) return;

  /* ── Command history ─── */
  const history = [];
  let historyIndex = -1;

  /* ── Surprise rotation ── */
  const surprises = [
    {
      label: 'On curiosity',
      text: `I describe myself as a blend of <span class="t-hl">curiosity, imagination, and perseverance</span>.\nNot a bad stack for engineering problems.`
    },
    {
      label: 'Introvert mode',
      text: `Animal lover. Introvert. <span class="t-hl">Art</span> is a genuine field of interest — not just something I say.\nThe coding club lead thing is a contradiction I live with.`
    },
    {
      label: 'Language sidebar',
      text: `I speak Marathi natively, Hindi professionally, English fully — and <span class="t-hl">Japanese at elementary level</span>.\nYes, I'm studying Japanese. No, I don't know why either. Curiosity, remember?`
    },
    {
      label: 'ABVP chapter',
      text: `As Technical Head of ABVP–SCOE, I planned events for <span class="t-hl">schools and colleges across Maharashtra</span>.\nManaging teams for external events is different from building projects alone. Both are worth doing.`
    },
    {
      label: 'The Shaip gig',
      text: `I contributed speech data to <span class="t-hl">AI training pipelines at Shaip</span> for two months.\nSomeone's voice model might be slightly better because of sentences I recorded at odd hours.`
    },
    {
      label: 'On teams',
      text: `"I am a responsible person, especially when I am in a team. I try my best to\ncontribute and be helpful." — that's actually <span class="t-hl">from my LinkedIn summary</span>. I meant it.`
    },
    {
      label: 'Excel certification',
      text: `Yes, I have a <span class="t-hl">Microsoft Excel: From Zero to Hero</span> certification.\nDon't sleep on spreadsheets. Data lives there before it lives anywhere else.`
    },
  ];
  let surpriseIndex = 0;

  /* ── Commands ─── */
  const commands = {

    help() {
      return html`<span class="t-section">// available commands</span>
<div class="t-row"><span class="t-key t-yellow">whoami</span><span>who is Kaustubh Bhabal</span></div>
<div class="t-row"><span class="t-key t-yellow">superpower</span><span>what drives the approach to tech</span></div>
<div class="t-row"><span class="t-key t-yellow">skills</span><span>technical areas and tools</span></div>
<div class="t-row"><span class="t-key t-yellow">projects</span><span>current and completed projects</span></div>
<div class="t-row"><span class="t-key t-yellow">experience</span><span>roles and responsibilities</span></div>
<div class="t-row"><span class="t-key t-yellow">funfact</span><span>something unexpected</span></div>
<div class="t-row"><span class="t-key t-yellow">surprise</span><span>rotating reveal — run multiple times</span></div>
<div class="t-row"><span class="t-key t-yellow">clear</span><span>reset terminal output</span></div>`;
    },

    whoami() {
      return html`<span class="t-section">// identity</span>
<div class="t-row"><span class="t-key t-blue">name</span><span class="t-hl">Kaustubh Bhabal</span></div>
<div class="t-row"><span class="t-key t-blue">degree</span><span>BE, Artificial Intelligence & ML</span></div>
<div class="t-row"><span class="t-key t-blue">college</span><span>Siddhant College of Engineering, Pune</span></div>
<div class="t-row"><span class="t-key t-blue">year</span><span>2024 → 2028</span></div>
<div class="t-row"><span class="t-key t-blue">location</span><span>Pune, Maharashtra, India</span></div>
<div class="t-row"><span class="t-key t-blue">current_role</span><span class="t-hl">Lead @ Forge – The Coding Club</span></div>
<div class="t-row"><span class="t-key t-blue">also</span><span>Google Student Ambassador (India)</span></div>

<span class="t-section">// summary</span>
<span class="t-muted">"A blend of curiosity, imagination, and perseverance.</span>
<span class="t-muted"> Pragmatic and considerate. Animal lover. Introvert.</span>
<span class="t-muted"> Art is a genuine field of interest."</span>`;
    },

    superpower() {
      return html`<span class="t-section">// tech superpower</span>
<span class="t-hl">Curiosity-driven engineering.</span>

I don't pick tools because they're trending.
I pick them because a problem I care about <span class="t-hl">demands</span> them.

Sahi Bin needed on-device ML → learned Google ML Kit.
Pritha needed accessible design → went deep into Figma and colour systems.
Robotics challenge needed simulation → picked up CoppeliaSim.
Coding club needed leadership → became the lead.

<span class="t-muted">The superpower isn't any single skill.
It's being comfortable starting from nothing
when the problem is interesting enough.</span>`;
    },

    skills() {
      return html`<span class="t-section">// web</span>
<div class="t-row"><span class="t-key">HTML / CSS / JS</span><span>semantic, responsive, no frameworks</span></div>

<span class="t-section">// app development</span>
<div class="t-row"><span class="t-key">Flutter + Dart</span><span>cross-platform mobile</span></div>
<div class="t-row"><span class="t-key">Firebase</span><span>Firestore, Auth, real-time sync</span></div>

<span class="t-section">// AI / ML</span>
<div class="t-row"><span class="t-key">ML Fundamentals</span><span>model training basics</span></div>
<div class="t-row"><span class="t-key">Google ML Kit</span><span>on-device inference</span></div>

<span class="t-section">// robotics</span>
<div class="t-row"><span class="t-key">CoppeliaSim</span><span>robot simulation & path planning</span></div>
<div class="t-row"><span class="t-key">Arduino / ESP32</span><span>embedded microcontrollers</span></div>

<span class="t-section">// design & cloud</span>
<div class="t-row"><span class="t-key">Figma / Canva</span><span>UI/UX, visual identity</span></div>
<div class="t-row"><span class="t-key">AWS Amplify</span><span>static hosting, CI/CD</span></div>
<div class="t-row"><span class="t-key">Microsoft Excel ✓</span><span>certified — From Zero to Hero</span></div>`;
    },

    projects() {
      return html`<span class="t-section">// in development</span>
<div class="t-row"><span class="t-key t-hl">Sahi Bin</span><span>smart waste segregation</span></div>
<span class="t-muted">  → Flutter, Firebase, Google ML Kit</span>
<span class="t-muted">  → citizen / worker / admin role flows</span>
<span class="t-muted">  → on-device waste classification</span>

<span class="t-section">// design concept</span>
<div class="t-row"><span class="t-key t-yellow">Pritha</span><span>nutrition & wellness platform</span></div>
<span class="t-muted">  → Figma, product thinking, accessible UI</span>

<span class="t-section">// completed</span>
<div class="t-row"><span class="t-key t-green">Robotics Sim</span><span>Lam Research Challenge 2024</span></div>
<span class="t-muted">  → CoppeliaSim, inverse kinematics, path planning</span>`;
    },

    experience() {
      return html`<span class="t-section">// current</span>
<div class="t-row"><span class="t-key t-hl">Lead</span><span>Forge – The Coding Club · Aug 2026–present</span></div>
<div class="t-row"><span class="t-key t-hl">Ambassador</span><span>Google Student Ambassadors · May 2026–present</span></div>
<div class="t-row"><span class="t-key t-hl">NSS Volunteer</span><span>Siddhant CoE · Jun 2025–present</span></div>

<span class="t-section">// past</span>
<div class="t-row"><span class="t-key t-yellow">AI Data Contrib.</span><span>Shaip · Jul–Aug 2026</span></div>
<div class="t-row"><span class="t-key t-yellow">Technical Head</span><span>ABVP–SCOE · Nov 2025–Jul 2026</span></div>
<div class="t-row"><span class="t-key t-yellow">Marketing Intern</span><span>Eduveda Academy · Jan–Mar 2026</span></div>`;
    },

    funfact() {
      return html`<span class="t-section">// fun fact</span>
I'm simultaneously a <span class="t-hl">Google Student Ambassador</span>
and the <span class="t-hl">Lead of a coding club</span> at the same college.

So I explain Google's developer tools to the same people
who also ask me why their code won't compile.

<span class="t-muted">I also speak four languages including elementary Japanese.
That last one was entirely curiosity's fault.</span>`;
    },

    surprise() {
      const pick = surprises[surpriseIndex % surprises.length];
      surpriseIndex++;
      return html`<span class="t-section">// ${escHtml(pick.label)}</span>
${pick.text}`;
    },

    clear() {
      clearTerminal();
      return null;
    },
  };

  /* ── Utilities ── */
  function html(strings, ...values) {
    return strings.reduce((acc, str, i) =>
      acc + str + (values[i] !== undefined ? values[i] : ''), '');
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  /* ── Run ── */
  function runCommand(raw) {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return;

    if (history[0] !== trimmed) history.unshift(trimmed);
    if (history.length > 40) history.pop();
    historyIndex = -1;

    if (trimmed === 'clear') { clearTerminal(); return; }

    const entry = document.createElement('div');
    entry.className = 't-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 't-cmd-line';
    cmdLine.innerHTML =
      `<span class="t-prompt">` +
        `<span class="ps1-user">kaustubh</span>` +
        `<span class="ps1-sep">@</span>` +
        `<span class="ps1-host">portfolio</span>` +
        `<span class="ps1-sep">:</span>` +
        `<span class="ps1-dir">~</span>` +
        `<span class="ps1-dollar">$</span>` +
      `</span>` +
      `<span class="t-cmd-text"> ${escHtml(raw.trim())}</span>`;

    const outEl = document.createElement('div');
    outEl.className = 't-output';

    if (commands[trimmed]) {
      const result = commands[trimmed]();
      if (result === null) return;
      outEl.innerHTML = result;
    } else {
      outEl.innerHTML =
        `<span class="t-error">command not found: <strong>${escHtml(trimmed)}</strong></span>\n` +
        `<span class="t-muted">Type <strong>help</strong> to see available commands.</span>`;
    }

    entry.appendChild(cmdLine);
    entry.appendChild(outEl);
    output.appendChild(entry);

    requestAnimationFrame(() => {
      output.scrollTop = output.scrollHeight;
    });
  }

  function clearTerminal() {
    output.querySelectorAll('.t-entry').forEach(e => e.remove());
    input.value = '';
    input.focus();
  }

  /* ── Events ── */
  runBtn.addEventListener('click', () => {
    runCommand(input.value);
    input.value = '';
    input.focus();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input.value);
      input.value = '';
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex] || '';
        requestAnimationFrame(() =>
          input.setSelectionRange(input.value.length, input.value.length));
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex] || '';
      } else {
        historyIndex = -1;
        input.value = '';
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.trim().toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find(cmd => cmd.startsWith(partial));
      if (match) input.value = match;
      return;
    }

    if (e.key === 'Escape') {
      input.blur();
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (!cmd) return;
      runCommand(cmd);
      input.value = '';
      document.querySelector('.terminal')
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  clearBtn?.addEventListener('click', clearTerminal);

})();


/* ═══════════════════════════════════════════════════════════
   4. STATUS BAR LINE/COL UPDATE  (cosmetic)
   ═══════════════════════════════════════════════════════════ */
(function initStatusBar() {
  // Shows scroll position as "line" in status bar
  const lnCol = document.querySelector('.status-bar__right .status-item:last-of-type');
  const content = document.querySelector('.editor-content');
  if (!lnCol || !content) return;

  content.addEventListener('scroll', () => {
    const line = Math.round(content.scrollTop / 20) + 1;
    lnCol.textContent = `Ln ${line}, Col 1`;
  }, { passive: true });
})();
