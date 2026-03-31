// INSTRUCTOR ONLY
import { useTask } from '../context/TaskContext'
import { teamMembers } from '../data/team'

export default function Sidebar() {
  const { tasks } = useTask()

  return (
    <aside className="w-56 shrink-0 bg-gray-900 text-gray-300 p-5 flex flex-col gap-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Team</h2>
      <ul className="space-y-4">
        {teamMembers.map(member => {
          const count = tasks.filter(t => t.assigneeId === member.id).length
          const done = tasks.filter(t => t.assigneeId === member.id && t.status === 'done').length
          return (
            <li key={member.id} className="flex items-center gap-3">
              <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{member.name.split(' ')[0]}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white font-semibold">{count}</p>
                <p className="text-xs text-gray-500">{done} done</p>
              </div>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
