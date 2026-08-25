import { teamMembers } from "../data/team";
import { useTasks } from "../TaskContext";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const { state } = useTasks();
  const navigate = useNavigate();

  return (
    <aside className="w-52 shrink-0 bg-white border-r border-slate-200 p-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Team</h2>
        <ul className="space-y-3">
          <Link to="/member" className="block mb-3 p-2 hover:bg-gray-200 rounded">
          All Members
          </Link>
          {teamMembers.map(member => {
            const tasks = state.tasks.filter(t => t.assigneeId === member.id)
            const done = tasks.filter(t => t.status === 'done')
            return(
            <Link key={member.id} to={`/member/${member.id}`} className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-200 p-2 rounded">
            <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
          <div>
            <p>{member.name}</p>
            <p className="text-sm text-gray-500">{done.length}/{tasks.length}</p>
          </div>
         </Link>
)})}
        </ul>
      </aside>
  );
}