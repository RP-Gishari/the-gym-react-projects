import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 text-center px-4">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        Page Not Found
      </h2>
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="border border-slate-300 px-4 py-2 rounded hover:bg-slate-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}