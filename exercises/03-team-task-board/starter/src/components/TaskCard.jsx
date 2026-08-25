import { useNavigate } from "react-router-dom";
import { useTasks } from "../TaskContext";
import { teamMembers } from "../data/team";

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-green-100 text-green-700',
};

export default function TaskCard({ task }) {
  const navigate = useNavigate();
  const { dispatch } = useTasks();

  const assignee = teamMembers.find(m => m.id === task.assigneeId);

  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData("taskId", task.id)}
      className="bg-white rounded-lg p-3 shadow-sm"
    >
      <p
        className="text-sm font-medium text-slate-800 mb-2"
        onClick={() => navigate(`/task/${task.id}`)}
      >
        {task.title}
      </p>

      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-0.5 ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority}
        </span>

        {assignee && (
          <img src={assignee.avatar} className="w-5 h-5 rounded-full" />
        )}

        <button
          onClick={() =>
            dispatch({ type: "DELETE_TASK", payload: task.id })
          }
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}