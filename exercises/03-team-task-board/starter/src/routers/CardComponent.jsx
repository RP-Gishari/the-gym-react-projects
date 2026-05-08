// components/TaskCard.jsx
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { teamMembers } from '../data/team'

const PRIORITY_COLORS = {
  high:   'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-600',
  low:    'bg-green-100 text-green-700',
}

/*
  TaskCard receives everything it needs as props.
  It owns its own confirmDelete state since that's
  purely local UI — no need to lift it up.
*/
export default function TaskCard({ task, dispatch }) {
  const [confirmDelete, setConfirmDelete] = useState(null)
  const assignee = teamMembers.find(m => m.id === task.assigneeId)

  return (
    <>
      <div
        draggable
        onDragStart={e => e.dataTransfer.setData('text/plain', task.id)}
        className="bg-white rounded-lg p-3 shadow-sm"
      >
        <p className="text-sm font-medium text-slate-800 mb-2 leading-snug">
          {task.title}
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-xs rounded-full px-2 py-0.5 font-medium capitalize ${PRIORITY_COLORS[task.priority]}`}>
            {task.priority}
          </span>
          <div className="flex flex-col items-center">
            {assignee && (
              <img src={assignee.avatar} alt={assignee.name} className="w-5 h-5 rounded-full" />
            )}
            <button
              onClick={() => setConfirmDelete(task.id)}
              className="text-xs text-red-400 hover:text-red-600 px-1"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => dispatch({ type: 'MOVE_TASK', payload: { id: task.id, direction: 'back' } })}
            className="text-xs text-slate-400 hover:text-slate-600 px-1"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={() => dispatch({ type: 'MOVE_TASK', payload: { id: task.id, direction: 'forward' } })}
            className="text-xs text-slate-400 hover:text-slate-600 px-1"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* Delete modal lives with the card — self-contained */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80">
            <h3 className="text-slate-800 font-semibold text-base mb-1">Delete this task?</h3>
            <p className="text-slate-500 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-1.5 rounded-lg text-sm text-slate-600 border border-slate-200 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch({ type: 'DELETE_TASK', payload: { id: confirmDelete } })
                  setConfirmDelete(null)
                }}
                className="px-4 py-1.5 rounded-lg text-sm text-white bg-red-500 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}