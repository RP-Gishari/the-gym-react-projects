# [L2] Like Button

**Level:** L2 — Junior  
**Concept:** useState · Event Handling · Conditional Rendering  
**Time:** 30 minutes  
**Bloom's level:** Understand → Apply

---

## Scenario

A social feed app needs a like button on each post.
Clicking the heart icon must toggle the liked state and update the count — just like Twitter or Instagram.

---

## Concept Brief

`useState` gives a component memory between renders: `const [value, setValue] = useState(initial)`.
Reading `value` gives the current state; calling `setValue(newValue)` schedules a re-render.
Event handlers attach to JSX elements with camelCase props: `onClick={handleClick}` — pass the function
reference, never the call result (`onClick={handleClick()}` runs immediately, not on click).
Conditional expressions inside JSX use ternary (`a ? b : c`) or logical AND (`flag && <JSX />`).

---

## Task

Open `src/PostCard.jsx`.  
**The app must:**

1. Show `♡` (unliked) when first rendered; clicking changes it to `♥` (liked)
2. Show `♥` when liked; clicking again returns it to `♡` (the button toggles)
3. The like count starts at `initialLikes` and increments by 1 when liked
4. The like count decrements by 1 when unliked (returns to the original count)
5. The button's background and border change visually between liked and unliked states
6. Two `PostCard` components rendered on the page toggle independently of each other

Do not modify `App.jsx` or `main.jsx`.

---

## Visual Spec

**Initial state (unliked):**

```text
┌──────────────────────────────────────┐
│  [avatar]  Sarah Chen                │
│                                      │
│  Just deployed my first full-stack   │
│  app...                              │
│                                      │
│  ♡   24                              │
└──────────────────────────────────────┘
```

**After clicking (liked):**

```text
┌──────────────────────────────────────┐
│  [avatar]  Sarah Chen                │
│                                      │
│  Just deployed my first full-stack   │
│  app...                              │
│                                      │
│  ♥   25    ← count went up by 1      │
└──────────────────────────────────────┘
```

---

## Hints

<details>
<summary>Hint 1 — Syntax</summary>

`useState` returns an array of two items — destructure them:
```text
const [something, setSomething] = useState(startingValue)
```
Both `liked` (boolean) and `likeCount` (number) need their own `useState` call.

</details>

<details>
<summary>Hint 2 — Conceptual</summary>

`handleLike` needs to do two things at once.
If each job has its own setter, can both setters be called in the same function?
What determines whether to add or subtract from the count — the current value of `liked` before or after the toggle?

</details>

<details>
<summary>Hint 3 — Near-solution</summary>

Read the current value of `liked` first (it's still the old value inside the function body).
Call `setLiked(!liked)` to flip it.
For the count: if `liked` is currently true (you're un-liking), subtract 1; otherwise add 1.
For the className and icon: a ternary like `liked ? 'value-a' : 'value-b'` gives you a different
string depending on the current state.

</details>

---

## Extension Challenges

**EC-1 [Analyze]:** Open the browser DevTools and watch the component re-render on each click.
How many state updates happen per click? Why does the like count not flicker?
Write a comment in the code explaining what you observed about React's batching.

**EC-2 [Evaluate]:** Right now `handleLike` reads `liked` directly (a stale closure risk in edge cases).
Refactor both `setLiked` and `setLikeCount` calls to use the functional update form: `setPrev(prev => ...)`.
What problem does this solve?

**EC-3 [Create]:** Add a `BookmarkButton` component in a new file. It should work like the `LikeButton`
but show `☆` / `★` and say "Saved" / "Save". Reuse as much logic as possible.
