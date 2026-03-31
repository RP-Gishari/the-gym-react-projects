// INSTRUCTOR ONLY — do not distribute until after class debrief.
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
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="todo-footer">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </div>
    </div>
  )
}

export default TodoApp
