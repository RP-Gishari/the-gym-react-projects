# Practical React Projects

Four progressively challenging exercises. Each one introduces the concepts the next depends on.
Work through them in order.

---

## The Exercises

| # | Exercise | Level | Key concepts |
| --- | --- | --- | --- |
| 01 | [Quiz App](exercises/01-quiz-app/README.md) | Beginner | Components, props, useState, event handling, conditional rendering |
| 02 | [Movie Watchlist](exercises/02-movie-watchlist/README.md) | Intermediate | useEffect, controlled inputs, derived state, localStorage |
| 03 | [Team Task Board](exercises/03-team-task-board/README.md) | Advanced | useReducer, Context API, custom hooks, component architecture |
| 04 | [Blog App](exercises/04-blog-app/README.md) | Advanced+ | React Router v7, Redux Toolkit, TypeScript, json-server, real dev workflow |

Exercises 01–03 are single-session projects: one app, one branch, one PR.
Exercise 04 is a multi-milestone project built over several sessions, with its own branching workflow documented in its README.

---

## How to submit your work

This repo uses a **fork + PR** workflow. It mirrors how professional code review works.

### Step 1 — Fork

Click **Fork** at the top of this GitHub page. This creates your own copy of the repo.

### Step 2 — Clone your fork

```bash
git clone https://github.com/YOUR-USERNAME/the-gym-react-projects.git
cd the-gym-react-projects
```

### Step 3 — Create a branch

**Exercises 01–03:** one branch per exercise, named after the exercise.

```bash
git checkout -b quiz-app
```

**Exercise 04:** has its own branching workflow. Read [exercises/04-blog-app/README.md](exercises/04-blog-app/README.md) before starting.

### Step 4 — Build it

```bash
# Exercises 01–03
cd exercises/01-quiz-app/starter
npm install
npm run dev

# Exercise 04
cd exercises/04-blog-app/starter
npm install
npm start        # starts both the dev server and the mock API
```

Work inside that exercise's `starter/` folder. Do not touch other exercises on the same branch.

### Step 5 — Push and open a PR

```bash
git add .
git commit -m "feat: quiz app"
git push origin quiz-app
```

Open a Pull Request from your branch to the **instructor's `main` branch** (not your own fork's main).

Your coach will review with inline comments. Respond to feedback, push new commits — the PR updates automatically.

> **One branch per exercise** for exercises 01–03. When starting the next exercise, go back to `main` and create a new branch.

```bash
git checkout main
git checkout -b movie-watchlist
```

---

## Commit message convention

Use this format on every commit, across all exercises:

```text
feat: add score tracking to quiz
fix: watchlist count not updating on remove
chore: install react-router-dom
refactor: extract TaskCard into its own component
```

---

## What your coach is looking for

1. **Does the app meet all acceptance criteria?**
2. **Did you leave the design decision comment?** This is read before any code.
3. **Is state minimal?** No derived values stored unnecessarily.
4. **Is the code readable?** Meaningful names, clear structure.

There is no single correct solution. PR comments are a conversation, not a grade.

---

## Folder structure

```text
exercises/
├── 01-quiz-app/
│   ├── README.md        ← the spec
│   └── starter/         ← your working directory
├── 02-movie-watchlist/
│   ├── README.md
│   └── starter/
├── 03-team-task-board/
│   ├── README.md
│   └── starter/
└── 04-blog-app/
    ├── README.md        ← spec + all 5 milestones + git workflow
    ├── post-card-reference.png
    └── starter/         ← npm install && npm start
```
