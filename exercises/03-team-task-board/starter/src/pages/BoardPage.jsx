import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import {useTasks} from '../TaskContext'
import { useParams } from "react-router-dom"

const COLUMNS = [
  { status: "todo", label: "To Do" },
  { status: "inprogress", label: "In Progress" },
  { status: "done", label: "Done" },
];

export default function BoardPage() {
  const { state } = useTasks();
  const { id } = useParams();

  const filteredTasks = state.tasks.filter(task => {
    const matchMember = id ? task.assigneeId === Number(id) : true;
    const matchAssignee = state.filterAssignee ? task.assigneeId === state.filterAssignee : true;
    const matchPriority = state.filterPriority ? task.priority === state.filterPriority : true;
    return matchMember && matchAssignee && matchPriority;
  });

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">Team Board</h1>
        <TaskForm />
      </div>

      <Filters />

      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map(col => (
          <Column key={col.status} column={col} tasks={filteredTasks} />
        ))}
      </div>
    </>
  );
}