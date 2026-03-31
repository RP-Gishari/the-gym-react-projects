# Cross-Exercise Pedagogical Flags

Common misconceptions that surface repeatedly across levels.
Review the relevant ones before running each session.

---

## JSX / Props (L1–L2)

- **`alt="{name}"` renders a literal string** — curly braces inside quotes are not evaluated.
  The correct form is `alt={name}` (no quotes around the braces).
- **`props.name` after destructuring** — if the parameter is `({ name })`, writing
  `props.name` throws `props is not defined`. Students often copy patterns from tutorials
  that don't use destructuring.
- **"JSX is HTML"** — students try `class=` instead of `className=`, or `for=` instead of
  `htmlFor=`. React's JSX attribute names are camelCase.

---

## useState / Events (L2)

- **`onClick={handler()}`** — calling the function immediately (with parentheses) instead of
  passing a reference. This causes an infinite render loop.
  The correct form is `onClick={handler}` or `onClick={() => handler(arg)}`.
- **setState is asynchronous** — students expect `setValue(x); console.log(value)` to log
  the new value. It logs the old one. State updates are batched.
- **Mutation instead of replacement** — `arr.push(item)` does not trigger a re-render.
  State must be replaced with a new reference: `setArr([...arr, item])`.

---

## Lists + Keys (L3)

- **Index as key** — `key={index}` causes subtle bugs when items are reordered or removed.
  Keys should be stable, unique identifiers (e.g. a database id).
- **Key on the wrong element** — the `key` prop goes on the outermost element returned
  by `.map()`, not on a child inside it.

---

## useEffect (L3)

- **Missing dependency array** — effect runs on every render, not just on mount.
- **Empty array `[]` misunderstanding** — students think `[]` means "run this repeatedly".
  It means "run once on mount, cleanup on unmount."
- **Stale closures** — reading state inside an effect without listing it as a dependency
  gives the value from when the effect was created, not the current value.

---

## Derived State Anti-pattern (L3+)

- **Storing derived data in useState** — if a value can be calculated from existing state
  or props, it should be calculated inline, not stored in a separate `useState`.
  This is the #1 architecture mistake beginners make.
  Example: `filteredList` derived from `query` should NOT be in state.

---

## Custom Hooks (L4)

- **Hook rules violation** — calling a hook inside a condition, loop, or regular function.
  Hooks must always be called at the top level of a React function.
- **Returning an array vs. object** — for hooks returning 2+ values, an object
  `{ value, setValue }` is more readable than an array. Both are valid; be consistent.
