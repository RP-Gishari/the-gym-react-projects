// INSTRUCTOR ONLY — do not share until after debrief.
import { createContext, useContext, useReducer, useState } from 'react'

// Action type vocabulary — the student must decide and document their own.
// ADD_TASK | DELETE_TASK | SET_STATUS | SET_FILTER_ASSIGNEE | SET_FILTER_PRIORITY

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            title: action.payload.title,
            priority: action.payload.priority,
            assigneeId: action.payload.assigneeId,
            status: 'todo',
          },
        ],
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      }
    case 'SET_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? { ...t, status: action.payload.status } : t
        ),
      }
    default:
      return state
  }
}

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] })
  const [filterAssignee, setFilterAssignee] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const visibleTasks = state.tasks.filter(t => {
    const byAssignee = filterAssignee === 'all' || t.assigneeId === Number(filterAssignee)
    const byPriority = filterPriority === 'all' || t.priority === filterPriority
    return byAssignee && byPriority
  })

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        visibleTasks,
        dispatch,
        filterAssignee,
        setFilterAssignee,
        filterPriority,
        setFilterPriority,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTask must be used inside <TaskProvider>')
  return ctx
}
