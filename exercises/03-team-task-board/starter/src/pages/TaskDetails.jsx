import { useParams } from "react-router-dom";
import { useTasks } from "../TaskContext";

export default function TaskDetails() {
  const { id } = useParams();
  const { state } = useTasks();

  const task = state.tasks.find(t => t.id === id);

  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
    </div>
  );
}