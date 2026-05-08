import { useTask } from './context/taskContext'
import {useState} from 'react'
import { teamMembers } from './data/team'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import TaskBoard from './routers/BoardComponent';


export default function App() {

  const {state, dispatch} = useTask() // this line gives cpts access to everything
  const [title, setTitle]= useState('') // sets the task title in the input
  const [priority, setPriority] = useState('high')//helps to select priorities
  const [assigneeId, setAssigneeId] = useState(teamMembers[0]?.id ?? 1)//controlled assignee
 
//for filter dropdowns
  const [filterMember, setFilterMember] = useState('all')//helps to control member filter
  const [filterPriority, setFilterPriority] = useState('all')// helps  to track priorities
  const [confirmDelete, setConfirmDelete]= useState(null)// manages the delete pending


  function handleAddTask(){
    const trimmed =title.trim()
    if(!trimmed)return 
    dispatch({
      type:'ADD_TASK',
      payload: {
        id:Date.now(),
        title:trimmed,
        priority: priority.toLowerCase(),
        assigneeId: Number(assigneeId),
        status:'todo',
      }
    })
    setTitle('')//reset the input after adding
  }

  // Apply filters then hand the result to TaskBoard
  const filteredTasks = state.tasks.filter(t => {
    if (filterMember   !== 'all' && t.assigneeId !== Number(filterMember)) return false
    if (filterPriority !== 'all' && t.priority   !== filterPriority.toLowerCase()) return false
    return true
  })

  const isFiltering = filterMember !== 'all' || filterPriority !== 'all'

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-white border-r border-slate-200 p-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Team</h2>
        <ul className="space-y-3">
          {teamMembers.map(member => {
            const total = state.tasks.filter(t => t.assigneeId === member.id).length
            const done  = state.tasks.filter(t => t.assigneeId === member.id && t.status === 'done').length
            return (
              <li key={member.id}>
                {/*
                  Link to="/member/2" pushes /member/2 into the
                  browser history. Routes in main.jsx matches
                  path="/member/:id" and renders MemberPage.
                  useParams() inside MemberPage reads id = "2".
                */}
                <Link
                  to={`/member/${member.id}`}
                  className="flex items-center gap-2.5 hover:bg-slate-50 rounded-lg p-1 transition-colors"
                >
                  <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">{member.name.split(' ')[0]}</p>
                    <p className="text-xs text-slate-400">{member.role}</p>
                    <p className="text-xs text-slate-400">{done}/{total} done</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-slate-800">Team Board</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Task title..."
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>
              ))}
            </select>
            <button onClick={handleAddTask}
              className="bg-indigo-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
              Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <select value={filterMember} onChange={e => setFilterMember(e.target.value)}
            className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none">
            <option value="all">All Members</option>
            {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
            className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none">
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {isFiltering && filteredTasks.length === 0 && (
          <p className="text-center text-slate-500 text-sm my-6">No task matches your search</p>
        )}

        {/* Board */}
        <TaskBoard tasks={filteredTasks} />
      </div>
    </div>
  )
}
