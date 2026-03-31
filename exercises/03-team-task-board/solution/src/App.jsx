// INSTRUCTOR ONLY — do not share until after debrief.
import { TaskProvider } from './context/TaskContext'
import Board from './components/Board'
import AddTaskForm from './components/AddTaskForm'
import Sidebar from './components/Sidebar'
import Filters from './components/Filters'

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex items-start justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Team Board</h1>
            <AddTaskForm />
          </div>
          <Filters />
          <Board />
        </div>
      </div>
    </TaskProvider>
  )
}
