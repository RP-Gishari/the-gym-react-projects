import { useTask } from './context/taskContext'
import {useState} from 'react'
import { teamMembers } from './data/team'



const COLUMNS = [
  { status: 'todo', label: 'To Do' },
  { status: 'inprogress', label: 'In Progress' },
  { status: 'done', label: 'Done' }, 
]

// Placeholder tasks — hardcoded for display only.
// Your real tasks will come from useReducer state via Context.
// const PLACEHOLDER_TASKS = [
//   { id: 1, title: 'Set up project structure', priority: 'high', assigneeId: 1, status: 'done' },
//   { id: 2, title: 'Build the task form', priority: 'medium', assigneeId: 2, status: 'inprogress' },
//   { id: 3, title: 'Wire up Context API', priority: 'high', assigneeId: 1, status: 'todo' },
//   { id: 4, title: 'Add priority filters', priority: 'low', assigneeId: 3, status: 'todo' },
// ]

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-green-100 text-green-700',
}


export default function App() {

  const {state, dispatch} = useTask() // this line gives cpts access to everything
  const [title, setTitle]= useState('') // sets the task title
  const [priority, setPriority] = useState('high')//helps to select priorities
  const [assigneeId, setAssigneeId] = useState(teamMembers[0]?.id ?? 1)//controlled assignee
 
//for filter dropdowns
  const [filterMember, setFilterMember] = useState('all')//helps to control member filter
  const [filterPriority, setFilterPriority] = useState('all')


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

  //filter tasks before rendering
    function getFilteredTasks(status) {
    return state.tasks.filter(t => {
      if (t.status !== status) return false
      if (filterMember !== 'all' && t.assigneeId !== Number(filterMember)) return false
      if (filterPriority !== 'all' && t.priority !== filterPriority.toLowerCase()) return false
      return true
    })
  
  }
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-white border-r border-slate-200 p-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Team</h2>
        <ul className="space-y-3">
          {teamMembers.map(member => {
            const total = state.tasks.filter(t => t.assigneeId === member.id).length
            const done  = state.tasks.filter(t => t.assigneeId === member.id && t.status === 'done').length
            return(
               <li key={member.id} className="flex items-center gap-2.5">
              <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full" />
              <div>
                <p className="text-sm font-medium text-slate-700">{member.name.split(' ')[0]}</p>
                <p className="text-xs text-slate-400">{member.role}</p>
                <p className="text-xs text-slate-400">{done}/{total} done</p>
              </div>
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

          {/* Add task form — hardcoded, you will make this work */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Task title..."
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
              //readOnly
              value= {title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <select 
            value={priority}
            onChange={e=>setPriority(e.target.value)}
            className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select 
            value={assigneeId}
            onChange={e=>setAssigneeId(e.target.value)}
            className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>
              ))}
            </select>
            <button  
             onClick={handleAddTask} 
             className="bg-indigo-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
              + Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <select 
          value={filterMember}
          onChange={e=>setFilterMember(e.target.value)}
          className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none">
            <option value="all">All Members</option>
            {teamMembers.map(m => 
            <option key={m.id} value={m.id}>{m.name}</option>
            )}
          </select>
          <select
          value={filterPriority}
          onChange={e=>setFilterPriority(e.target.value)}
           className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none">
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-4">
          {COLUMNS.map(col => {
            // const colTasks =state.tasks.filter(t => t.status === col.status)//state-> real live state managed by reducer
            const colTasks= getFilteredTasks(col.status)
            return (
              <div key={col.status} className="bg-slate-200/70 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-600">{col.label}</h2>
                  <span className="bg-slate-300 text-slate-600 text-xs rounded-full px-2 py-0.5">
                    {colTasks.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {colTasks.map(task => {
                    const assignee = teamMembers.find(m => m.id === task.assigneeId)
                    return (
                      <div key={task.id} className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium text-slate-800 mb-2 leading-snug">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs rounded-full px-2 py-0.5 font-medium capitalize ${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                          </span>
                          {assignee && (
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                        </div>
                       { /*Move controls*/}
                        <div>
                          <button   onClick={() => dispatch({ type: 'MOVE_TASK', payload: { id: task.id, direction: 'back' } })}
      className="text-xs text-slate-400 hover:text-slate-600 px-1"> ← Back</button>
                          <button onClick={()=>dispatch({type: 'MOVE_TASK', payload: { id: task.id, direction: 'forward' }})}  className="text-xs text-slate-400 hover:text-slate-600 px-1">Forward →</button>
                        </div>
                        {/*Delete button */}
                        <div>
                          <button 
                           onClick={()=>dispatch({type:'DELETE_TASK',payload:{id:task.id}})}
                           className="text-xs text-red-400 hover:text-red-600 px-1">
                           Delete
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
