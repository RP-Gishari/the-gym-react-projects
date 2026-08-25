import { useState } from "react";
import { useTasks } from "../TaskContext";
import { teamMembers } from "../data/team";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm() {
  const { dispatch } = useTasks();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("high");
  const [assigneeId, setAssigneeId] = useState(teamMembers[0].id);

  function handleAdd() {
    if (!title.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: uuidv4(),
        title,
        priority,
        assigneeId: Number(assigneeId),
        status: "todo",
      },
    });

    setTitle("");
  }

  return (
    <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Task title..."
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
            />
            <select value={priority} onChange={e => setPriority(e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none">
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>
              ))}
            </select>
            <button onClick={handleAdd} className="bg-indigo-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
              Add
            </button>
          </div>
        </div>
  );
}