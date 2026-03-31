// INSTRUCTOR ONLY
import { useTask } from '../context/TaskContext'
import { teamMembers } from '../data/team'

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-green-100 text-green-700',
}

const STATUS_OPTIONS = ['todo', 'inprogress', 'done']
const STATUS_LABELS = { todo: 'To Do', inprogress: 'In Progress', done: 'Done' }

export default function TaskCard({ task }) {
  const { dispatch } = useTask()
  const assignee = teamMembers.find(m => m.id === task.assigneeId)

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm">
      <p className="text-sm font-medium text-gray-800 mb-2 leading-snug">{task.title}</p>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs rounded-full px-2 py-0.5 font-medium capitalize ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <div className="flex items-center justify-between">
        {assignee && (
          <div className="flex items-center gap-1.5">
            <img src={assignee.avatar} alt={assignee.name} className="w-5 h-5 rounded-full" />
            <span className="text-xs text-gray-500">{assignee.name.split(' ')[0]}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <select
            value={task.status}
            onChange={e => dispatch({ type: 'SET_STATUS', payload: { id: task.id, status: e.target.value } })}
            className="text-xs border border-gray-200 rounded-md px-1.5 py-0.5 outline-none"
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
          <button
            onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
            className="text-gray-300 hover:text-red-500 text-xs px-1"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
