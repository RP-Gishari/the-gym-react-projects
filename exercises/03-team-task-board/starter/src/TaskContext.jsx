import { createContext, useContext, useReducer } from 'react'
import { useEffect } from "react"

const TaskContext = createContext()

const initialState = {
  tasks: [],
  filterAssignee: null,
  filterPriority: null,
}

function loadTasks() {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      }

    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        ),
      }

    case 'SET_FILTER_ASSIGNEE':
      return { ...state, filterAssignee: action.payload }

    case 'SET_FILTER_PRIORITY':
      return { ...state, filterPriority: action.payload }

    default:
      return state
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks))
  },[state.tasks])

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if(!context){
    throw new Error("useTasks must be used inside TaskProvider")
  }
  return context
}