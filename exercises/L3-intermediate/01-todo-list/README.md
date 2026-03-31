# [L3] Todo List

**Level:** L3 — Intermediate  
**Concept:** Lists + Keys · Controlled Input · Multiple useState · Derived State  
**Time:** 50 minutes  
**Bloom's level:** Apply → Analyze

---

## Scenario

A productivity app needs a todo list: add tasks, check them off, delete them, and filter
by status — the same core pattern used in Notion, Linear, and Todoist.

---

## Concept Brief

Rendering lists in React: call `.map()` on an array and return JSX, giving each element a stable
`key` prop (use a unique id, never the index). A controlled input is one whose `value` is bound to
state and whose `onChange` updates that state — React owns the value.
Derived state is data you can calculate from existing state; never put it in `useState`.
If `visibleTodos` can be computed from `todos` and `filter`, compute it inline — storing it in state
creates synchronisation bugs.

---

## Task

Open `src/TodoApp.jsx`.  
**The app must:**

1. Display the three seed todos on initial load (2 completed, 1 active)
2. Typing in the input and clicking **Add** (or pressing Enter) appends a new todo with `done: false`
3. Clicking the checkbox next to a todo toggles its `done` state
4. Clicking ✕ removes the todo from the list permanently
5. The **active** filter shows only incomplete todos; **completed** shows only finished todos; **all** shows everything
6. The filter buttons are independent — changing filter does not lose any todos
7. The footer count reads `"X item(s) left"` and updates correctly as todos are added or completed
8. Submitting an empty or whitespace-only input does nothing

Do not modify `App.jsx` or `main.jsx`.

---

## Visual Spec

**Initial state:**

```text
┌────────────────────────────────────────┐
│  My Tasks                              │
├────────────────────────────────────────┤
│  [ What needs to be done?    ] [ Add ] │
│  [all] [active] [completed]            │
│  ☑ Learn React props                   │
│  ☑ Learn useState                      │
│  ☐ Build a todo list                   │
│                                        │
│  1 item left                           │
└────────────────────────────────────────┘
```

**After typing "Learn useEffect" and clicking Add:**

```text
│  ☑ Learn React props                   │
│  ☑ Learn useState                      │
│  ☐ Build a todo list                   │
│  ☐ Learn useEffect    ← new item       │
│                                        │
│  2 items left                          │
```

**After clicking the [active] filter:**

```text
│  ☐ Build a todo list                   │
│  ☐ Learn useEffect                     │
│  (completed items hidden)              │
```

---

## Hints

<details>
<summary>Hint 1 — Syntax</summary>

- `Array.filter(predicate)` returns a new array with only items where `predicate` returns true.
- `Array.map(fn)` returns a new array with each item transformed.
- Spread a new item into a copy of the array: `[...todos, newItem]`.
- React docs on lists: [Rendering Lists](https://react.dev/learn/rendering-lists)

</details>

<details>
<summary>Hint 2 — Conceptual</summary>

`visibleTodos` is derived state — you should calculate it directly inside the function body,
not store it in `useState`. Why? If it were in state, you'd need to remember to update it every
time `todos` or `filter` changes. Inline calculation is always in sync.

For `handleToggle`: you need a new array where one todo is different. Which array method gives you
a new array with each item potentially transformed?

</details>

<details>
<summary>Hint 3 — Near-solution</summary>

`visibleTodos` pattern:
```text
todos.filter(todo => {
  if (filter === 'active') return !todo.done
  if (filter === 'completed') return todo.done
  return true
})
```

`handleToggle` pattern: use `.map()`. For the matching id, return `{ ...todo, done: !todo.done }`.
For all others, return the todo unchanged.

`handleDelete` pattern: use `.filter(todo => todo.id !== id)`.

</details>

---

## Extension Challenges

**EC-1 [Analyze]:** What happens if you use the array index as the `key` instead of `todo.id`?
Add a new todo, then delete the first item — does anything look wrong in the checkboxes?
Write a comment in the code explaining why this bug happens.

**EC-2 [Evaluate]:** Add a "Clear completed" button that removes all todos with `done: true` in one click.
Should this be a new function or can you reuse `handleDelete`? Defend your choice in a comment.

**EC-3 [Create]:** Add a drag-to-reorder feature using only `onDragStart`, `onDragOver`, and `onDrop`
HTML5 drag events (no libraries). Store the dragged item's id in a `useRef`. Reorder the `todos` array
on drop.
