# Practical React Projects

A boot.dev-style exercise system for React learners. Students spend 80% of their time writing code.

---

## Folder Structure

```text
the-gym-react-projects/
├── README.md                         ← You are here (master prompt + rubric)
├── exercises/
│   ├── L1-newbie/                    ← JSX, components, props (15–25 min)
│   ├── L2-junior/                    ← useState, events, conditionals (25–40 min)
│   ├── L3-intermediate/              ← lists, useEffect, forms (40–60 min)
│   ├── L4-advanced/                  ← useContext, useReducer, custom hooks (60–120 min)
│   └── L5-guru/                      ← all concepts + routing + testing (2–5 hrs)
└── _instructor/
    ├── solution-notes/               ← Per-exercise instructor notes (not for students)
    ├── pedagogical-flags.md          ← Cross-exercise misconceptions reference
    └── concept-ladder.md             ← Concept → level mapping table
```

Each exercise lives at:

```text
exercises/L[N]-[difficulty]/[NN]-[kebab-title]/
├── README.md       ← exercise spec (scenario, task, hints, visual spec)
├── starter/        ← what students receive — runs with npm install && npm run dev
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx        ← pre-written, do not modify
│       ├── App.jsx         ← pre-written (or shell), do not modify
│       └── [Component].jsx ← student edits this
└── solution/       ← instructor-only, never distributed to students
    └── src/
        └── [Component].jsx
```

---

## The Master Prompt

Paste this into an AI assistant (or fill in manually) to generate one complete exercise.

```text
You are a React curriculum designer building exercises in the style of boot.dev.

Your goal is to produce a single, complete React learning exercise that guarantees
the student spends at least 80% of their time writing code, not reading.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
INPUTS (fill these in)
━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXERCISE_TITLE:        [e.g. "Build a Character Stat Card"]
LEVEL:                 [1 | 2 | 3 | 4 | 5]
REACT_CONCEPT:         [primary concept, e.g. "useState"]
SECONDARY_CONCEPTS:    [already-known concepts used but not taught, or "none"]
REAL_WORLD_FRAMING:    [e.g. "a trading card game app", "a task manager"]
PREREQUISITE_CONCEPTS: [what the student must already know]
TIME_TARGET:           [e.g. "25 minutes", "45 minutes"]
BLOOM_TARGET:          [Remember | Understand | Apply | Analyze | Evaluate | Create]

━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOLDER PLACEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Place all generated files into this folder structure inside
the-gym-react-projects/exercises/:

  L[N]-[difficulty-name]/
  └── [NN]-[kebab-case-title]/
      ├── README.md               ← exercise spec (everything except solution)
      ├── starter/
      │   ├── index.html
      │   ├── package.json        ← { "name": "[title]", "scripts": { "dev": "vite" } }
      │   ├── vite.config.js
      │   └── src/
      │       ├── main.jsx        ← pre-written, student does not touch
      │       ├── App.jsx         ← pre-written (or shell), student does not touch
      │       └── [Component].jsx ← student edits this file
      └── solution/               ← instructor-only, not distributed to students
          └── src/
              └── [Component].jsx

Level → folder name mapping:
  L1 → L1-newbie
  L2 → L2-junior
  L3 → L3-intermediate
  L4 → L4-advanced
  L5 → L5-guru

━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT — produce ALL sections
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generate every section below in order. Do not skip any.

1. HEADER BLOCK
   - Title (action-oriented: "Build X", "Fix Y", "Refactor Z")
   - Level badge: L1–L5
   - Difficulty label: Newbie / Junior / Intermediate / Advanced / Guru
   - Concept tags: primary + secondary
   - Time estimate
   - Bloom's level

2. SCENARIO
   - 1–2 sentences of real-world framing — no more
   - Never starts with "In this exercise you will..."

3. CONCEPT BRIEF
   - 80 words maximum
   - Names the concept, its syntax signature, one real-world use case
   - Assumes prior reading — this is a reminder, not a lesson

4. STARTER CODE
   - Complete, runnable files for starter/src/
   - Strategic TODO comments placed exactly where the student writes
   - All imports, data, and prop shapes pre-written
   - Level scaffolding:
       L1: 70–80% of final solution written
       L2: 50–65% written
       L3: 30–50% written
       L4: 15–30% written
       L5: 0–15% written

5. TASK DESCRIPTION
   - Format: "The app must..."
   - Observable, self-verifiable outcomes only
   - Never step-by-step instructions
   - 3–6 criteria for L1–L3, 5–8 for L4–L5
   - Variable names must match starter code exactly

6. VISUAL SPEC
   - ASCII or prose showing: initial state + at least one interaction state
   - Enough detail for the student to self-verify without a test suite

7. HINTS (exactly 3, always tiered)
   - Hint 1 [Syntax]:       Docs link or syntax reminder — no code
   - Hint 2 [Conceptual]:   A Socratic question that reframes the problem
   - Hint 3 [Near-Solution]: Describe the pattern in prose; stop before writing it

8. EXTENSION CHALLENGES
   - Exactly 2–3 challenges
   - Each must be Bloom's-higher than the base task
   - Label each: [Analyze] / [Evaluate] / [Create]
   - Always optional, always visible

9. SOLUTION NOTES  ← goes in _instructor/solution-notes/L[N]-[NN]-[title].md
   - The complete working solution
   - The 2–3 most common student mistakes for this concept
   - What to look for in a code review
   - Alternative valid approaches

10. PEDAGOGICAL FLAGS  ← also in the instructor notes file
    - Misconceptions this exercise is likely to surface
    - What to prepare before running this exercise in class

━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE 10 IRON RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Violating any rule typically drops coding time below 60%.

RULE 1 — THE 60-SECOND START RULE
  Student must start writing within 60 seconds of opening the exercise.
  Scenario + concept brief combined must be readable in under 90 seconds.

RULE 2 — NO SETUP TAX
  starter/ must run with npm install && npm run dev with no modification.
  If the exercise needs a library (e.g. react-router-dom), it is already
  in package.json and pre-imported in the starter code.

RULE 3 — SPECIFIC TODO COMMENTS ONLY
  BAD:  // TODO: handle state
  GOOD: // TODO: Call setCount with the current count plus one
  TODOs must reference variable names already in the file.

RULE 4 — ACCEPTANCE CRITERIA, NOT INSTRUCTIONS
  BAD:  "Use useState to store the count, then call setCount in onClick"
  GOOD: "Clicking the button must increase the displayed number by 1"

RULE 5 — HINTS ARE SOCRATIC OR THEY ARE ANSWERS
  Hint 3 may describe the pattern in prose. It must never contain a
  complete, working line of code.

RULE 6 — NO STEP-BY-STEP INSTRUCTIONS
  Numbered steps turn exercises into typing tutorials. Forbidden at L2+.
  L1 may name the specific method to use inside a TODO comment.

RULE 7 — ONE PRIMARY CONCEPT PER EXERCISE
  Secondary concepts must be pre-solved in the starter code.
  If two new concepts are required, write two exercises.

RULE 8 — VISUAL SPEC IS MANDATORY
  Students self-verify. Visual spec must show initial state +
  at least one interaction state.

RULE 9 — EXTENSION CHALLENGES MUST ESCALATE BLOOM'S
  BAD: "Add 3 more list items"
  GOOD: "What happens if the list is empty? Handle the empty state."

RULE 10 — SOLUTIONS ARE INSTRUCTOR-ONLY UNTIL AFTER ATTEMPT
  solution/ folder is never distributed until after class debrief.
  AI tutors must use Socratic questions only — never paste the solution.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEVEL RUBRIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━
L1 Newbie     │ Remember/Understand │ JSX, components, props               │ 15–25 min
L2 Junior     │ Understand/Apply    │ useState, events, conditionals        │ 25–40 min
L3 Intermed.  │ Apply/Analyze       │ lists+keys, useEffect, forms, useRef  │ 40–60 min
L4 Advanced   │ Analyze/Evaluate    │ useContext, useReducer, custom hooks  │ 60–120 min
L5 Guru       │ Evaluate/Create     │ all concepts + routing + testing      │ 2–5 hrs

━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRE-PUBLISH CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] starter/ runs with zero modifications (npm install && npm run dev)
[ ] Folder placed in correct L[N]-[difficulty]/ directory
[ ] Numbered prefix matches intended order within the level
[ ] solution/ is absent from the student-facing branch/zip
[ ] Scenario is 1–2 sentences, no "In this exercise..."
[ ] Concept brief is ≤80 words
[ ] All TODOs name exact variables from the file
[ ] Task uses "The app must..." format
[ ] Visual spec covers initial + interaction state
[ ] Hint 3 has no complete lines of working code
[ ] Extension challenges are Bloom's-higher than the base task
[ ] Solution notes are in _instructor/ not in starter/
[ ] Pedagogical flags name ≥1 misconception to address in class
```

---

## React Concept Ladder

| Concept | Min Level | Primary Level |
| --- | --- | --- |
| JSX syntax | L1 | L1 |
| Functional components | L1 | L1 |
| Props | L1 | L1–2 |
| useState | L2 | L2 |
| Event handling | L2 | L2 |
| Conditional rendering | L2 | L2 |
| Lists + keys | L3 | L3 |
| useEffect | L3 | L3 |
| Controlled forms | L3 | L3 |
| useRef | L3 | L3–4 |
| Lifting state | L3 | L3 |
| useContext | L4 | L4 |
| useReducer | L4 | L4 |
| Custom hooks | L4 | L4 |
| React.memo / useMemo / useCallback | L4 | L4–5 |
| React Router | L5 | L5 |
| Testing | L5 | L5 |

---

## Recommended Weekly Pattern

```text
Day 1 — Concept Introduction (20% reading time)
  Teacher presents the concept (video, lecture, or reading). Max 15 minutes.
  Ends with: "Now open Exercise L[N]-01."

Day 2 — Guided Exercise (L1 or L2)
  Students complete a heavily scaffolded exercise.
  Teacher circulates, asks Socratic questions only — no giving answers.
  Debrief: 5 minutes of "what tripped you up?" as a class.

Day 3 — Independent Challenge (L3 or L4)
  Students build without step-by-step guidance.
  Hints available but gated (expand only after genuine attempt).
  Extension challenges for early finishers.

Day 4 — Review + Refactor
  Students swap code with a partner and explain their solution.
  One extension challenge assigned as homework.
  Teacher reviews common mistakes from Solution Notes.

Day 5 — Mini Project (L5 framing)
  Students build a small but complete feature using the concept
  in a new context. Also includes one concept from 2 weeks ago
  (spaced repetition).
```
