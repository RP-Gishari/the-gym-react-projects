// MemberPage.jsx
import { useParams, Link } from 'react-router-dom'
import { useTask } from './context/taskContext'
import { teamMembers } from './data/team'
import TaskBoard from './routers/BoardComponent'

export default function MemberPage() {
  const { id } = useParams()         
  const memberId = Number(id)
  const { state } = useTask()

  const member = teamMembers.find(m => m.id === memberId)

  if (!member) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Member not found.</p>
          <Link to="/" className="text-indigo-600 underline">← Back to board</Link>
        </div>
      </div>
    )
  }

  const memberTasks = state.tasks.filter(t => t.assigneeId === memberId)
  const done  = memberTasks.filter(t => t.status === 'done').length

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="text-slate-500 hover:text-slate-800 text-sm">
          ← All members
        </Link>
        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
        <div>
          <h1 className="text-lg font-bold text-slate-800">{member.name}</h1>
          <p className="text-sm text-slate-400">
            {member.role} · {done}/{memberTasks.length} tasks done
          </p>
        </div>
      </div>

      {memberTasks.length === 0 && (
        <p className="text-center text-slate-500 text-sm mt-10">
          No tasks assigned to {member.name.split(' ')[0]} yet.
        </p>
      )}

      <TaskBoard tasks={memberTasks} />
    </div>
  )
}