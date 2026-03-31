// INSTRUCTOR ONLY
import { useTask } from '../context/TaskContext'
import { teamMembers } from '../data/team'

export default function Filters() {
  const { filterAssignee, setFilterAssignee, filterPriority, setFilterPriority } = useTask()

  return (
    <div className="flex gap-3 mb-5 flex-wrap">
      <select
        value={filterAssignee}
        onChange={e => setFilterAssignee(e.target.value)}
        className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm outline-none"
      >
        <option value="all">All Members</option>
        {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>

      <select
        value={filterPriority}
        onChange={e => setFilterPriority(e.target.value)}
        className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm outline-none"
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  )
}
