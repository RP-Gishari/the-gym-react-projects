# Team Task Board — Advanced

**Concepts:** useReducer · Context API · Custom hooks · Component architecture · Derived state

---

## What you're building

A task management board for a small team. Tasks are created with a title, priority, and assignee, then moved across three status columns: **To Do**, **In Progress**, and **Done**.

The team member data is in `src/data/team.js`. Each member has an `id`, `name`, `role`, and `avatar` URL. Tasks are not pre-seeded — the user creates them.

---

## Acceptance criteria

1. A form lets the user create a task with: a title (text), a priority (high / medium / low), and an assignee chosen from the team
2. Tasks are displayed in three columns by status: To Do, In Progress, Done
3. Each task can be moved to a different status column
4. Each task can be deleted
5. A sidebar or header shows each team member alongside their total task count and how many are done
6. Filter controls let the user view tasks by assignee and/or by priority — both filters must work together
7. **Task state is managed with `useReducer`** — you decide the action types, but they must be documented in a comment at the top of your reducer file
8. **The state is shared via React Context** — no component may receive task data or dispatch through props; all components access the context directly
9. `useState` must not be used for task data anywhere in the app

---

## Design decision

At the top of your reducer file, write a comment listing your action types and a one-sentence explanation of why you chose each one. This is what your coach reads during review.

---

## Getting started

```bash
cd starter
npm install
npm run dev
```

The app renders a placeholder line showing team member count. Everything else is yours to build — component structure, file layout, and context design are all your decisions.

---

## Extension (optional, for the next session)

This project is designed to grow. Come back to it when you cover:
- **React Router** — add a route per team member showing only their tasks
- **Persistence** — save tasks to `localStorage` so the board survives a refresh

---

## When you're stuck

[Scaling Up with Reducer and Context — React Docs](https://react.dev/learn/scaling-up-with-reducer-and-context)
