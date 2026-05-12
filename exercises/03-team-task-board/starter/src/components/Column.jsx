import { useTasks } from "../TaskContext";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks }) {
  const { dispatch } = useTasks();

  const colTasks = tasks.filter(t => t.status === column.status);

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        const id = e.dataTransfer.getData("taskId");
        dispatch({ type: "MOVE_TASK", payload: { id, status: column.status } });
      }}
      className="bg-slate-200 p-3 rounded"
    >
      <h2>{column.label}</h2>

      {colTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}