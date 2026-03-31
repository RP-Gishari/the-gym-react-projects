// INSTRUCTOR ONLY
import { useState } from 'react'
import { useTask } from '../context/TaskContext'
import { teamMembers } from '../data/team'

export default function AddTaskForm() {
  const { dispatch } = useTask()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [assigneeId, setAssigneeId] = useState(teamMembers[0].id)

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    dispatch({ type: 'ADD_TASK', payload: { title: title.trim(), priority, assigneeId: Number(assigneeId) } })
    setTitle('')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors shrink-0"
      >
        + New Task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 w-80 shrink-0">
      <input
        autoFocus
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title..."
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
      />
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-2 py-2 text-sm outline-none"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={assigneeId}
          onChange={e => setAssigneeId(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-2 py-2 text-sm outline-none"
        >
          {teamMembers.map(m => (
            <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700">Add</button>
        <button type="button" onClick={() => setOpen(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-50">Cancel</button>
      </div>
    </form>
  )
}
