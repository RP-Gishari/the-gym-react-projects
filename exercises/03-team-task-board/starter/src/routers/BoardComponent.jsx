// components/TaskBoard.jsx
import { useTask } from '../context/taskContext'
import TaskCard from './CardComponent'


const COLUMNS = [
  { status: 'todo',       label: 'To Do' },
  { status: 'inprogress', label: 'In Progress' },
  { status: 'done',       label: 'Done' },
]

/*
  TaskBoard receives a `tasks` prop — a pre-filtered array.
  App.jsx passes all tasks (then filters internally).
  MemberPage.jsx passes only that member's tasks.
  The board itself doesn't care which page it's on.
*/

//  const filteredTasks = state.tasks.filter(t => {
//     if (filterMember   !== 'all' && t.assigneeId !== Number(filterMember)) return false
//     if (filterPriority !== 'all' && t.priority   !== filterPriority.toLowerCase()) return false
//     return true
//   })

// const isFiltering = filterMember !== 'all' || filterPriority !== 'all'


{/*Board connecting the dash and the members */}
export default function TaskBoard({ tasks }) {
  const { dispatch } = useTask()

  function getColumnTasks(status) {
    return tasks.filter(t => t.status === status)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {COLUMNS.map(col => {
        const colTasks = getColumnTasks(col.status)
        return (
          <div
            key={col.status}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const id = Number(e.dataTransfer.getData('text/plain'))
              dispatch({ type: 'MOVE_TASK', payload: { id, status: col.status } })
            }}
            className="bg-slate-200/70 rounded-xl p-3"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-600">{col.label}</h2>
              <span className="bg-slate-300 text-slate-600 text-xs rounded-full px-2 py-0.5">
                {colTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {colTasks.map(task => (
                <TaskCard key={task.id} task={task} dispatch={dispatch} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}