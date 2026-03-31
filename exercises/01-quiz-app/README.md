# Quiz App — Beginner

**Concepts:** Components · Props · useState · Event handling · Conditional rendering · Lists

---

## What you're building

A multiple-choice quiz that walks through 10 questions one at a time, gives immediate feedback on each answer, tracks the score, and shows a results screen at the end.

The questions are provided in `src/data/questions.js`. Each question has:

```js
{
  id: number,
  question: string,
  options: string[],   // always 4 options
  correct: number,     // index of the correct option in options[]
}
```

---

## Acceptance criteria

1. One question is displayed at a time, with all four answer options visible
2. Clicking an answer immediately marks it as correct (green) or incorrect (red); the correct answer is always highlighted
3. After an answer is selected, the user cannot change it or select another option for that question
4. A "Next" button appears only after an answer has been selected
5. The current question number and total are visible at all times (e.g. "Question 3 of 10")
6. The score updates correctly as the user progresses
7. When the last question is answered and "Next" is clicked, a results screen appears showing the final score out of 10
8. The results screen has a "Play Again" button that resets the quiz to question 1

---

## Design decision

Leave a comment in your code explaining **where you chose to put state and why**.
There is no single correct answer — the comment is what your coach reads first.

---

## Getting started

```bash
cd starter
npm install
npm run dev
```

The app renders a placeholder line. Everything else is yours to build.
You can create as many component files as you want inside `src/`.

---

## When you're stuck

[State: A Component's Memory — React Docs](https://react.dev/learn/state-a-components-memory)
