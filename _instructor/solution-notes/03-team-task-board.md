# Instructor Notes — Team Task Board (Advanced)

## What good code looks like vs. what passing code looks like

**Passing:** Tasks are created, moved, deleted. Filters work. Context is used. Reducer is used.

**Good:**
- Action types are named after events (what happened), not commands: `TASK_ADDED` not `ADD_TASK` — discuss the convention tradeoff
- Reducer is a pure function: given the same state + action, always returns the same new state, never mutates
- Context exposes only what consumers need — not the raw `state` object and `dispatch`, but a curated interface
- Filter state lives near the context (or in a separate UI context) — not duplicated in every component
- `useTask()` hook throws a clear error when used outside the provider

**Excellent:**
- Student splits context into task data context and filter context (separates concerns)
- Student documents action types with a comment at the top of the reducer — as required by the spec
- Derived values (visible tasks, counts per assignee) are calculated at the context level, not in each component
- Student can articulate why `useReducer` is better than multiple `useState` calls here (named actions, predictable shape)

## Common mistakes to look for in PRs

1. **State mutation in reducer** — `state.tasks.push(...)` then `return state`. React's reference equality check means no re-render. Fix: return new array with spread.
2. **Missing `default` case in reducer** — returns `undefined` for unknown actions, crashing the app
3. **Prop drilling alongside context** — student creates context but still passes tasks down as props to some components. Point out the inconsistency.
4. **`useState` for task data** — spec explicitly forbids this. If present, the student has not understood the exercise constraint.
5. **Context value changing on every render** — passing `{ tasks, dispatch }` as a literal object in JSX creates a new reference each render, causing all consumers to re-render. Fix: useMemo or move the value outside the JSX.
6. **Filters inside each component** — student duplicates filter logic instead of lifting it to context. Now filters are not coordinated.

## Questions to ask during PR review

- "Read me the comment at the top of your reducer. Why did you choose those action types?"
- "What is a pure function? Is your reducer one? How can you tell?"
- "What would happen if two components both called `useTask()` — would they get the same data or different data?"
- "Where do your filters live? Why there and not in the Board component?"
- "How would you add localStorage persistence to this app? What would you change?"

## What to look for in the state design decision comment

This comment is the most important thing you read during review. A student who can clearly explain their architectural choices is a student who understands React. Look for:
- They identified the tradeoff between storing and deriving
- They can name what each action does in plain English
- They have an opinion about where state belongs, not just "I put it there because it works"

## Extension paths (next session)

- **React Router**: add `/team/:memberId` route showing only that member's tasks
- **localStorage**: persist tasks across refresh (and discuss optimistic vs. committed saves)
- **Drag and drop**: move tasks between columns with HTML5 drag events (no library)
- **React Redux**: refactor the reducer + context into a Redux store (direct comparison)
