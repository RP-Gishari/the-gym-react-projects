// INSTRUCTOR ONLY
import { useTask } from '../context/TaskContext'
import TaskCard from './TaskCard'

const COLUMNS = [
  { status: 'todo', label: 'To Do' },
  { status: 'inprogress', label: 'In Progress' },
  { status: 'done', label: 'Done' },
]

export default function Board() {
  const { visibleTasks } = useTask()

  return (
    <div className="grid grid-cols-3 gap-4">
      {COLUMNS.map(col => {
        const colTasks = visibleTasks.filter(t => t.status === col.status)
        return (
          <div key={col.status} className="bg-gray-200/60 rounded-xl p-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm text-gray-600">{col.label}</h2>
              <span className="bg-gray-300 text-gray-600 text-xs rounded-full px-2 py-0.5">{colTasks.length}</span>
            </div>
            <div className="space-y-2">
              {colTasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
