import { useState } from 'react'

const FILTERS = ['all', 'active', 'completed']

const INITIAL_TODOS = [
  { id: 1, text: 'Learn React props', done: true },
  { id: 2, text: 'Learn useState', done: true },
  { id: 3, text: 'Build a todo list', done: false },
]

function TodoApp() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')

  // TODO: Derive `visibleTodos` by filtering `todos` based on `filter`.
  // 'all'       → return all todos
  // 'active'    → return todos where done is false
  // 'completed' → return todos where done is true
  // Do not store this in state — calculate it inline here.
  const visibleTodos = todos

  function handleAdd(e) {
    e.preventDefault()
    if (!inputValue.trim()) return
    // TODO: Add a new todo object to `todos` using setTodos.
    // The new todo must have:
    //   id:   Date.now()
    //   text: inputValue.trim()
    //   done: false
    // After adding, reset inputValue to an empty string with setInputValue.
  }

  function handleToggle(id) {
    // TODO: Set todos to a new array where the todo matching `id`
    //       has its `done` property flipped (true → false, false → true).
    //       All other todos must be unchanged.
    //       Use setTodos with .map() — do not mutate the existing array.
  }

  function handleDelete(id) {
    // TODO: Set todos to a new array with the todo matching `id` removed.
    //       Use setTodos with .filter().
  }

  const activeCount = todos.filter(t => !t.done).length

  return (
    <div className="todo-app">
      <div className="todo-header">
        <h1>My Tasks</h1>
      </div>
      <div className="todo-body">
        <form onSubmit={handleAdd} className="add-form">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="add-input"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        <div className="filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={filter === f ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          {visibleTodos.length === 0 && (
            <li className="empty-state">Nothing here yet!</li>
          )}
          {/* TODO: Map over visibleTodos and render a <li className="todo-item"> for each.
              Each <li> must have a unique key prop using the todo's id.
              Inside each <li> render:
                1. <input type="checkbox" className="todo-checkbox"
                          checked={todo.done}
                          onChange={() => handleToggle(todo.id)} />
                2. <span className={todo.done ? 'todo-text done' : 'todo-text'}>
                     {todo.text}
                   </span>
                3. <button className="delete-btn" onClick={() => handleDelete(todo.id)}>✕</button>
          */}
        </ul>
      </div>
      <div className="todo-footer">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </div>
    </div>
  )
}

export default TodoApp
