/**
 * KAUSTUBH.EXE — script.js
 * Navigation · Curiosity Terminal · Scroll Reveal
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   1. NAVIGATION
   ═══════════════════════════════════════════════════════════ */
(function initNav() {
  const toggle   = document.querySelector('.nav__toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  // Close on click outside
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ═══════════════════════════════════════════════════════════
   2. SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealTargets = [
    '.power-card',
    '.project-card',
    '.achievement-card',
    '.learning-item',
    '.contact-card',
    '.about__text',
    '.about__meta',
    '.section__header',
  ];

  const elements = document.querySelectorAll(revealTargets.join(', '));
  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   3. CURIOSITY TERMINAL
   ═══════════════════════════════════════════════════════════ */
(function initTerminal() {

  /* ── DOM refs ─────────────────────────────────────────── */
  const output   = document.getElementById('terminalOutput');
  const input    = document.getElementById('terminalInput');
  const runBtn   = document.getElementById('terminalRunBtn');
  const clearBtn = document.getElementById('terminalClearBtn');
  const chips    = document.querySelectorAll('.chip');

  if (!output || !input || !runBtn || !clearBtn) return;

  /* ── Command history (keyboard ↑↓) ───────────────────── */
  const history = [];
  let historyIndex = -1;

  /* ── Surprise pool ────────────────────────────────────── */
  const surprises = [
    {
      label: 'Philosophy corner',
      text: 'The question that got me into AI: <span class="t-highlight">is curiosity itself a kind of intelligence?</span> Still thinking about it.'
    },
    {
      label: 'Robotics confession',
      text: 'My first CoppeliaSim robot arm knocked over its virtual target every time. <span class="t-muted">Progress looked like failure for a long time.</span>'
    },
    {
      label: 'Design instinct',
      text: 'I redesigned the same screen in Pritha <span class="t-highlight">seven times</span> before I was satisfied. Accessibility was the reason six of those iterations failed.'
    },
    {
      label: 'Mobile-first reality',
      text: 'Sahi Bin\'s waste-scanning feature was designed assuming <span class="t-highlight">low-end Android devices</span> — that constraint shaped the entire architecture.'
    },
    {
      label: 'Late-night build',
      text: 'This portfolio was built at a time when the only people awake were developers, street dogs, and people with deadlines. <span class="t-muted">All three groups understand pressure.</span>'
    },
    {
      label: 'On learning',
      text: 'I haven\'t taken a course on every technology in my stack. Most of what I know came from a project demanding it — <span class="t-highlight">need is a better teacher than curiosity alone</span>.'
    },
    {
      label: 'On college',
      text: '"Beyond the conventional classroom experience" is code for: <span class="t-muted">I learned more debugging at 11pm than in most lab sessions. That\'s not a complaint — it\'s how it works.</span>'
    },
  ];

  let surpriseIndex = 0;

  /* ── Command definitions ──────────────────────────────── */
  const commands = {

    help() {
      return html`<span class="t-section">available commands</span>
<div class="t-row"><span class="t-key">help</span><span>show this list</span></div>
<div class="t-row"><span class="t-key">superpower</span><span>what drives my approach to tech</span></div>
<div class="t-row"><span class="t-key">skills</span><span>technical areas I work in</span></div>
<div class="t-row"><span class="t-key">projects</span><span>things I'm building</span></div>
<div class="t-row"><span class="t-key">funfact</span><span>something you wouldn't expect</span></div>
<div class="t-row"><span class="t-key">surprise</span><span>a rotating reveal — run it again</span></div>
<div class="t-row"><span class="t-key">clear</span><span>reset the terminal</span></div>`;
    },

    superpower() {
      return html`<span class="t-section">tech superpower</span>
<span class="t-highlight">Curiosity-driven engineering.</span>

I don't pick technologies because they're popular.
I pick them because a problem I care about <span class="t-highlight">demands</span> them.

Sahi Bin needed on-device ML → learned Google ML Kit.
Pritha needed accessible design → went deep into colour contrast and spacing systems.
The Lam Research robotics challenge needed simulation → picked up CoppeliaSim.

<span class="t-muted">The real superpower isn't any single skill.
It's being comfortable starting from nothing when the problem is interesting enough.</span>`;
    },

    skills() {
      return html`<span class="t-section">web</span>
<div class="t-row"><span class="t-key">HTML / CSS / JS</span><span>semantic, responsive, no frameworks</span></div>

<span class="t-section">app development</span>
<div class="t-row"><span class="t-key">Flutter</span><span>cross-platform mobile, Dart</span></div>
<div class="t-row"><span class="t-key">Firebase</span><span>Firestore, Auth, real-time sync</span></div>

<span class="t-section">AI / ML</span>
<div class="t-row"><span class="t-key">ML Fundamentals</span><span>model training basics</span></div>
<div class="t-row"><span class="t-key">Google ML Kit</span><span>on-device inference</span></div>

<span class="t-section">robotics</span>
<div class="t-row"><span class="t-key">CoppeliaSim</span><span>robot simulation</span></div>
<div class="t-row"><span class="t-key">Arduino / ESP32</span><span>embedded microcontrollers</span></div>

<span class="t-section">design & cloud</span>
<div class="t-row"><span class="t-key">Figma / Stitch</span><span>UI/UX, visual identity</span></div>
<div class="t-row"><span class="t-key">AWS Amplify</span><span>static hosting, CI/CD</span></div>`;
    },

    projects() {
      return html`<span class="t-section">in development</span>
<div class="t-row"><span class="t-key">Sahi Bin</span><span>smart waste segregation — Flutter, Firebase, ML Kit</span></div>
<span class="t-muted">  → multi-role app: citizen / worker / admin workflows</span>
<span class="t-muted">  → on-device image recognition for waste categories</span>

<span class="t-section">design concept</span>
<div class="t-row"><span class="t-key">Pritha</span><span>nutrition & wellness platform — Figma</span></div>
<span class="t-muted">  → calm, accessible UI; visual identity; full user flows</span>

<span class="t-section">completed</span>
<div class="t-row"><span class="t-key">Robotics Sim</span><span>Lam Research Challenge 2024 — CoppeliaSim</span></div>
<span class="t-muted">  → path planning, inverse kinematics, team collaboration</span>`;
    },

    funfact() {
      return html`<span class="t-section">fun fact</span>
I'm an AWS Student Builder <span class="t-highlight">Campus Leader</span> and a
<span class="t-highlight">Google Student Ambassador</span> at the same time.

That means I'm simultaneously explaining cloud infrastructure
and Google developer tools to the same group of people
who just want their code to stop throwing errors.

<span class="t-muted">I don't think that's ironic. I think it's just Tuesday.</span>`;
    },

    surprise() {
      const pick = surprises[surpriseIndex % surprises.length];
      surpriseIndex++;
      return html`<span class="t-section">${pick.label}</span>
${pick.text}`;
    },

    clear() {
      clearTerminal();
      return null; // Handled by clearTerminal()
    },

  };

  /* ── Template literal helper (no-op tag for syntax highlighting) */
  function html(strings, ...values) {
    return strings.reduce((acc, str, i) => acc + str + (values[i] !== undefined ? values[i] : ''), '');
  }

  /* ── Run a command string ─────────────────────────────── */
  function runCommand(raw) {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return;

    // Save to history
    if (history[0] !== trimmed) history.unshift(trimmed);
    if (history.length > 30) history.pop();
    historyIndex = -1;

    if (trimmed === 'clear') {
      clearTerminal();
      return;
    }

    // Build output node
    const entry = document.createElement('div');
    entry.className = 't-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 't-cmd-line';
    cmdLine.innerHTML = `<span class="t-prompt" aria-hidden="true">❯</span><span class="t-cmd-text">${escHtml(raw.trim())}</span>`;

    const outputEl = document.createElement('div');
    outputEl.className = 't-output';

    if (commands[trimmed]) {
      const result = commands[trimmed]();
      if (result === null) return; // handled by clearTerminal
      outputEl.innerHTML = result;
    } else {
      outputEl.innerHTML = `<span class="t-error">command not found: <strong>${escHtml(trimmed)}</strong></span>\n<span class="t-muted">Type <strong>help</strong> to see available commands.</span>`;
    }

    entry.appendChild(cmdLine);
    entry.appendChild(outputEl);
    output.appendChild(entry);

    // Scroll to bottom
    requestAnimationFrame(() => {
      output.scrollTop = output.scrollHeight;
    });
  }

  /* ── Clear terminal ───────────────────────────────────── */
  function clearTerminal() {
    // Remove all entries except the welcome line
    const entries = output.querySelectorAll('.t-entry');
    entries.forEach(e => e.remove());
    input.value = '';
    input.focus();
  }

  /* ── Escape HTML ──────────────────────────────────────── */
  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Event: Run button ────────────────────────────────── */
  runBtn.addEventListener('click', () => {
    runCommand(input.value);
    input.value = '';
    input.focus();
  });

  /* ── Event: Enter key in input ────────────────────────── */
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input.value);
      input.value = '';
      return;
    }

    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex] || '';
        // Move cursor to end
        requestAnimationFrame(() => {
          input.setSelectionRange(input.value.length, input.value.length);
        });
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
  });

  /* ── Event: Command chips ─────────────────────────────── */
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (!cmd) return;
      input.value = cmd;
      runCommand(cmd);
      input.value = '';
      // Scroll terminal into view on mobile
      const terminalEl = document.querySelector('.terminal');
      if (terminalEl) {
        terminalEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  /* ── Event: Clear button ──────────────────────────────── */
  clearBtn.addEventListener('click', () => {
    clearTerminal();
  });

  /* ── Tab autocomplete ─────────────────────────────────── */
  input.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const partial = input.value.trim().toLowerCase();
    if (!partial) return;
    const match = Object.keys(commands).find(cmd => cmd.startsWith(partial));
    if (match) {
      input.value = match;
    }
  });

  /* ── Trap prevention: Escape blurs terminal input ─────── */
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.blur();
    }
  });

})();


/* ═══════════════════════════════════════════════════════════
   4. ACTIVE NAV LINK on scroll
   ═══════════════════════════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('nav__link--active', href === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
})();
