import { teamMembers } from './data/team'
import { useReducer, useContext, useState } from 'react'
import { createContext } from 'react'
import Reducer from './ReducerFunction'

// Columns the board will always show
const COLUMNS = [
  { status: 'todo', label: 'To Do' },
  { status: 'inprogress', label: 'In Progress' },
  { status: 'done', label: 'Done' },
]

// this is the initial state that also holds what we will consider while filtring task
const initialState = {
  tasks:[], filters: {assignee: null, priority: null}
}

const TaskContext = createContext()




const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-green-100 text-green-700',
}

function TaskProvider({children}){
  const [state, dispatch] = useReducer(Reducer, initialState)
  return( 
  <TaskContext.Provider value={{state, dispatch}}>
           {children}
   </TaskContext.Provider>)
}
export default function Board(){
  return (<TaskProvider>
    <App />
  </TaskProvider>)
}




function App() {

  const {state, dispatch} = useContext(TaskContext)
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("")
  const [assignee, setAssignee] = useState(teamMembers[0].id)
 

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-white border-r border-slate-200 p-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Team</h2>
        <ul className="space-y-3">
          {teamMembers.map(member => {
                  const taskOfmember = state.tasks.filter(t=> t.assignedId === member.id).length
                   const doneTasks = state.tasks.filter(t => t.assigneeId === member.id && t.status === "done").length
            return (
            <li key={member.id} className="flex items-center gap-2.5">
              
              <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full" />
              <div>
                <p className="text-sm font-medium text-slate-700">{member.name.split(' ')[0]}</p>
                <p className="text-xs text-slate-400">{member.role}</p>
                <span className="text-sm font-medium text-slate-700" >{taskOfmember} task . {doneTasks} Done</span>
              </div>
            </li>)
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
              className="border border-slate-200 rounded-lg px-3 py-1.5 
              text-sm outline-none focus:border-indigo-400"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <select 
               value={priority}
               onChange={(e) => setPriority(e.target.value)}
            className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select 
               value={assignee}
               onChange={(e) => setAssignee(Number(e.target.value))}
            className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name.split(' ')[0]} </option>
              ))}
            </select>
            <button 
             onClick={() =>{
              if(!title.trim()) return
               
              dispatch({
                type: 'ADD_TASK',
                payload: {
                  id: Date.now(),
                  title,
                  priority: priority.toLowerCase(),
                  assigneeId: assignee, 
                  status: "todo"
                }
              })
               setTitle("")
            }}
            className="bg-indigo-600 text-white rounded-lg px-3 py-1.5 
                               text-sm font-medium hover:bg-indigo-700 transition-colors">
              Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <select 
           value={state.filters.assignee || ""}
           onChange={(e) => 
            dispatch({
            type: "SET_FILTER",
            payload: {
              assignee: e.target.value ? Number(e.target.value) : null
            }
           })}
          className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none">
            <option value="">All Members</option>
            {teamMembers.map(m => 
            <option key={m.id} value={m.id}>{m.name}</option>)}

          </select>
          <select 
          //This allows user to filtering task based on priorties 
            value={state.filters.priority || ""}
            onChange={(e) => {
              dispatch({
                type: "SET_FILTER",
                payload:{
                  priority: e.target.value || null
                }
              })
            }}
          className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none">
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-4">
          {COLUMNS.map(col => {
            const colTasks = state.tasks.filter(t => {
               const matchStatus = t.status === col.status
              
               const matchAssignee = !state.filters.assignee || 
               t.assigneeId === state.filters.assignee 

               const matchPriority = !state.filters.priority ||
               t.priority === state.filters.priority

               return matchStatus && matchAssignee && matchPriority
              })

              
            return (
              <div key={col.status} 

              // this is where task draged are droped
               onDragOver={(e) => e.preventDefault()}
               onDrop={(e) => {
                const taskId = e.dataTransfer.getData("taskId")

                dispatch({
                  type: "MOVE_TASK",
                  payload:{
                    id: Number(taskId),
                    status: col.status
                  }
                })
               }}
               
              className="bg-slate-200/70 rounded-xl p-3">
                
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
                      // this is the way to initialize dragable feature and sent task to its destination
                      <div key={task.id} 
                       draggable
                       onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", task.id)
                       }}
                      className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm font-medium text-slate-800 mb-2 leading-snug">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs rounded-full px-2 py-0.5 font-medium capitalize ${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                          </span>
                          {/* This is the deleting button on each task*/}
                             <button 
                                className='text-white bg-red-500 rounded-lg  w-15 p-1 ml-40'
                                
                             onClick={() =>{
                              dispatch({
                                type:"DELETE_TASK",
                                payload:task.id
                              })
                             }}>
                                    delete
                             </button>

                          {assignee && (
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
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
