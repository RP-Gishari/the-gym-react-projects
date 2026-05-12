import { useTasks } from "../TaskContext";
import { teamMembers } from "../data/team";

export default function Filters() {
  const { state, dispatch } = useTasks();
  
  return (
    <div className="flex gap-3 mb-5">
      <select
        onChange={e =>
          dispatch({
            type: "SET_FILTER_ASSIGNEE",
            payload: e.target.value ? Number(e.target.value) : null,
          })
        }
      >
        <option value="">All</option>
        {teamMembers.map(m => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <select
        onChange={e =>
          dispatch({
            type: "SET_FILTER_PRIORITY",
            payload: e.target.value || null,
          })
        }
      >
        <option value="">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}