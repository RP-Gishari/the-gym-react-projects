# Practical React Projects

Three progressively challenging exercises built on the [Scrimba free React course](https://scrimba.com/learn/learnreact).
Each exercise gives you a running app and a spec. What you build in between is your decision.

---

## The Exercises

| # | Exercise | Level | Key concepts |
| --- | --- | --- | --- |
| 01 | [Quiz App](exercises/01-quiz-app/README.md) | Beginner | useState, events, conditional rendering, lists |
| 02 | [Movie Watchlist](exercises/02-movie-watchlist/README.md) | Intermediate | useEffect, controlled inputs, derived state, localStorage |
| 03 | [Team Task Board](exercises/03-team-task-board/README.md) | Advanced | useReducer, Context API, custom hooks, component architecture |

Work through them in order. Each one introduces the concepts the next one depends on.

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

### Step 3 — Create a branch for the exercise

One branch per exercise. Name it after the exercise:

```bash
git checkout -b quiz-app
```

### Step 4 — Build it

```bash
cd exercises/01-quiz-app/starter
npm install
npm run dev
```

Work inside that exercise's `starter/` folder. Do not touch other exercises on this branch.

### Step 5 — Push and open a PR

```bash
git add .
git commit -m "feat: quiz app"
git push origin quiz-app
```

Then open a Pull Request from your fork's `quiz-app` branch to the **instructor's `main` branch** (not your own fork's main).

Your coach will review with inline comments on the PR. Respond to feedback, push new commits, and the PR updates automatically.

> **One branch per exercise.** When you start the next exercise, go back to `main` and create a new branch.

```bash
git checkout main
git checkout -b movie-watchlist
```

---

## What your coach is looking for

1. **Does the app meet all acceptance criteria?**
2. **Did you leave the design decision comment?** This is read before any code.
3. **Is state minimal?** No derived values stored unnecessarily.
4. **Is the code readable?** Meaningful names, clear structure.

There is no single correct solution. The PR comments are a conversation, not a grade.

---

## Folder structure

```text
exercises/
├── 01-quiz-app/
│   ├── README.md        ← the spec you build from
│   └── starter/         ← your working directory (npm install && npm run dev)
├── 02-movie-watchlist/
│   ├── README.md
│   └── starter/
└── 03-team-task-board/
    ├── README.md
    └── starter/

_instructor/             ← coach reference material (not for students)
├── solution-notes/
└── concept-ladder.md
```
