# [L1] Build a Character Stat Card

**Level:** L1 — Newbie  
**Concept:** Props  
**Also uses:** JSX, functional components  
**Time:** 20 minutes  
**Bloom's level:** Remember → Understand

---

## Scenario

The team at RosterApp needs a reusable card to display player stats.
Wire up the `StatCard` component so it renders real data instead of placeholder text.

---

## Concept Brief

Props are the inputs to a React component — read-only values passed from a parent.
Access them via destructuring in the function parameter: `({ name, score })`.
JSX embeds JavaScript expressions using curly braces: `<p>{name}</p>`.
Props make components reusable: the same `StatCard` can display any player by
receiving different prop values each time it is called.

---

## Task

**The app must:**

1. Render the player's name (`"Aria Voss"`) inside the `<h2>` element
2. Render the position (`"Midfielder"`) inside the `<p>` element
3. Render the score (`92`) inside the `.score-badge` div
4. Set the image `alt` text to the player's name (not the string `"PLACEHOLDER"`)
5. Produce no console errors or warnings

Open `src/StatCard.jsx` and replace every `PLACEHOLDER` with the correct prop value.
Do not modify `App.jsx` or `main.jsx`.

---

## Visual Spec

**Initial render:**

```text
┌──────────────────────┐
│  [avatar image]      │
│  Aria Voss           │
│  Midfielder          │
│  [ 92 ]              │
└──────────────────────┘
```

---

## Hints

<details>
<summary>Hint 1 — Syntax</summary>

Inside JSX, you embed a JavaScript expression using curly braces.
The variable name must match the destructured parameter exactly.
Docs: [Passing Props to a Component — react.dev](https://react.dev/learn/passing-props-to-a-component)

</details>

<details>
<summary>Hint 2 — Conceptual</summary>

The component already receives `name` as a destructured parameter.
How do you make JSX display the *value* of a variable rather than the
literal word `"PLACEHOLDER"`?

</details>

<details>
<summary>Hint 3 — Near-solution</summary>

Replace the word `PLACEHOLDER` with `{name}` (no quotes).
For the `alt` attribute specifically, the syntax is `alt={name}` —
the curly braces replace the entire quoted string, not just the text inside it.

</details>

---

## Extension Challenges

**EC-1 [Understand]:** Add a new prop called `isActive` (boolean).
Render the card with a green border when `isActive` is `true`, and a grey border when `false`,
using a `className` swap.

**EC-2 [Apply]:** Add default parameter values so `StatCard` renders
`"Unknown Player"` as the name if no `name` prop is provided.

**EC-3 [Analyze]:** Render three different `StatCard` components in `App.jsx`,
each with different player data. What do you notice about reusability?
Write a one-sentence comment in the code explaining what you observed.
