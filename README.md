# VS Code, but it's my portfolio.

> A portfolio inspired by every dev's playground — VS Code; documenting my journey.

Built by **Kaustubh Bhabal** for the **AWS Student Builder Challenge: Build Your Tech Superpower**.

---

## Overview

This is a personal portfolio website designed to feel like a VS Code editor session. Instead of scrolling through a conventional webpage, visitors navigate through pages of my journey as if they were opening files in an editor — complete with a sidebar Explorer, editor tabs, line numbers, syntax highlighting and an interactive terminal called the **Curiosity Terminal**.

The interface uses a VS Code Dark theme with an Amethyst (`#9966CC`) colour identity throughout.

---

## Motivation & Concept

Every developer lives inside VS Code. It felt natural to build a portfolio inside the same environment — one that a developer visitor would feel immediately comfortable in.

The goal was to create something that feels genuinely familiar rather than just stylistically interesting: a place where you open files, switch tabs and use a terminal to discover who I am.

---

## Key Features

- **VS Code-inspired interface** — Activity bar, Explorer sidebar, tab bar, editor area with line numbers
- **Seven Explorer pages** — welcome, about, experience, projects, skills, achievements, contact
- **Syntax-highlighted welcome page** — The introduction is written as actual JS code with comment blocks, an ASCII cat and coloured tokens
- **Curiosity Terminal** — An interactive bottom panel (VS Code panel style) with commands: `help`, `whoami`, `skills`, `projects`, `experience`, `funfact`, `surprise`, `clear`
- **Draggable terminal panel** — Drag the top edge to resize; maximise/restore button included
- **Floating terminal bubble** — Bottom-right button to open/close the terminal panel
- **Keyboard-accessible** — Full keyboard navigation, tab autocomplete in terminal, arrow-key command history, skip-to-content link
- **Responsive layout** — Works across desktop, tablet and mobile
- **No dependencies** — Plain HTML, CSS and vanilla JavaScript; no frameworks, no build step

---

## Screenshots

> *(Screenshots coming soon — open the website to explore the live interface)*

---

## Technology Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 — custom properties, flexbox, responsive media queries |
| Interactions | Vanilla JavaScript (ES6+) |
| Typography | JetBrains Mono (Google Fonts) |
| Version control | Git + GitHub |
| Hosting | GitHub Pages (live), AWS Amplify (intended target) |

---

## Project Structure

```
kaustubh-portfolio/
├── index.html      — All markup: shell, sidebar, pages, terminal panel
├── styles.css      — Design system, layout, components, responsive styles
├── script.js       — Navigation, tabs, line numbers, Curiosity Terminal
├── README.md       — Project documentation
└── plan.md         — Project planning and specification notes
```

---

## Local Setup

No build step, no dependencies. Just open the file:

```
index.html  →  double-click or open in any browser
```

Or serve it with any static file server:

```bash
# Python (built-in)
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080` in your browser.

---

## Curiosity Terminal Commands

Open the terminal using the `>_` floating button (bottom-right), then type a command or click a chip.

| Command | Description |
|---|---|
| `help` | Display all available commands |
| `whoami` | Get to know Kaustubh |
| `skills` | Explore technical interests and tools |
| `projects` | Discover what's been built |
| `experience` | Explore roles and responsibilities |
| `funfact` | Find something unexpected |
| `surprise` | Rotating personal reveal — run multiple times |
| `clear` | Clear terminal output |

**Keyboard shortcuts in the terminal:**
- `↑` / `↓` — Navigate command history
- `Tab` — Autocomplete a partial command
- `Escape` — Blur the terminal input

---

## Live Website

**GitHub Pages:** [https://kauongit.github.io/AWS-Student-Builder-Challenge-Build-Your-Tech-Superpower-Submission](https://kauongit.github.io/AWS-Student-Builder-Challenge-Build-Your-Tech-Superpower-Submission)

---

## Repository

**GitHub:** [https://github.com/kauongit/AWS-Student-Builder-Challenge-Build-Your-Tech-Superpower-Submission](https://github.com/kauongit/AWS-Student-Builder-Challenge-Build-Your-Tech-Superpower-Submission)

---

## AWS Deployment — Status & Limitation

**Intended deployment target:** AWS Amplify Hosting

AWS Amplify Hosting was selected as the deployment platform for this submission. The plan was to connect this GitHub repository to AWS Amplify for automated CI/CD deployment.

**Actual deployment:** GitHub Pages

AWS account suspension prevented completion of the Amplify hosting process before the submission deadline. As a result, the website was published using GitHub Pages as the public hosting solution.

The portfolio was developed and tested entirely locally. The GitHub Pages URL above serves as the live public preview for this submission.

---

## Author

**Kaustubh Bhabal**
Third-year BE student — Artificial Intelligence & Machine Learning
Siddhant College of Engineering, Pune

- GitHub: [github.com/kauongit](https://github.com/kauongit)
- LinkedIn: [linkedin.com/in/sprclfrglstcxpldcs](https://www.linkedin.com/in/sprclfrglstcxpldcs/)
- Email: alwaysinrange007@gmail.com

---

## Challenge

**AWS Student Builder Challenge: Build Your Tech Superpower**
Submitted by Kaustubh Bhabal · Siddhant College of Engineering, Pune
