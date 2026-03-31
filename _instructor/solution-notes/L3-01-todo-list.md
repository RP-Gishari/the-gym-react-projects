# Instructor Notes — L3-01: Todo List

## Working Solution

```jsx
const visibleTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.done
  if (filter === 'completed') return todo.done
  return true
})

function handleAdd(e) {
  e.preventDefault()
  if (!inputValue.trim()) return
  setTodos([...todos, { id: Date.now(), text: inputValue.trim(), done: false }])
  setInputValue('')
}

function handleToggle(id) {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  ))
}

function handleDelete(id) {
  setTodos(todos.filter(todo => todo.id !== id))
}

// In JSX:
{visibleTodos.map(todo => (
  <li key={todo.id} className="todo-item">
    <input
      type="checkbox"
      className="todo-checkbox"
      checked={todo.done}
      onChange={() => handleToggle(todo.id)}
    />
    <span className={todo.done ? 'todo-text done' : 'todo-text'}>
      {todo.text}
    </span>
    <button className="delete-btn" onClick={() => handleDelete(todo.id)}>✕</button>
  </li>
))}
```

## Common Student Mistakes

1. **Storing `visibleTodos` in useState** — classic derived-state anti-pattern. Students add a
   `const [visibleTodos, setVisibleTodos] = useState(todos)` and then struggle to keep it in sync.
   The correct pattern: always calculate derived state inline.

2. **Direct array mutation** — `todos.push(newTodo)` and then `setTodos(todos)`. React does a
   reference equality check. Since `todos` is still the same reference, no re-render happens.
   Fix: always return a new array (`[...todos, newTodo]`).

3. **Missing `key` prop** — renders without crashing but produces a console warning.
   Use `todo.id`, not the array index.

4. **Forgetting `e.preventDefault()` in handleAdd** — the form causes a page reload on submit.

5. **Checkbox onChange** — students write `onChange={handleToggle(todo.id)}` instead of
   `onChange={() => handleToggle(todo.id)}`. The former calls `handleToggle` immediately during render.

## Code Review Focus

- Is `visibleTodos` computed inline (not in state)?
- Does `handleToggle` use `.map()` without mutating the original array?
- Does each `<li>` have `key={todo.id}`, not `key={index}`?
- Is the empty input guard present in `handleAdd`?

## Pedagogical Flags

- **Derived state anti-pattern** — this is the single most important concept to reinforce at L3.
  If students derive it correctly, they will avoid countless bugs in future projects.
- **Immutability** — connecting "React needs a new reference to re-render" to "never push/splice" is
  a key mental model shift. Live demo: push and watch nothing update vs. spread and watch it update.
- **EC-1 is very valuable** — having students observe the key-index bug live makes the concept stick
  far better than any explanation.
