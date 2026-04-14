// Action types:
// ADD_TASK    — { type, payload: { id, title, priority, assigneeId, status: 'todo' } }
// MOVE_TASK   — { type, payload: { id, direction: 'forward' | 'back' } } 
// DELETE_TASK — { type, payload: { id } }
//type-a name for a command (if it's to add, move or delete)
//payload- the data the command needs

const STATUSES= ['todo', 'inprogress', 'done']

export function taskReducer(state,action){
//state: the current state of the app ({tasks:[]})
//action: the command that was sent (if it is to add/move/delete etc {type, payload: { id } })
//a reducer always takes two arguments and must return a new state to re-render UI
switch (action.type){//action.type checks the kind of action sent

    case "ADD_TASK" : return {...state, tasks:[...state.tasks, action.payload]}
    case "MOVE_TASK" : {
    const {id, direction}= action.payload //this is done to know which task to move based on id and direction (forward etc)
    return {
        ...state, tasks: state.tasks.map(t=>{if (t.id!==id )return t
            const idx= STATUSES.indexOf(t.status)// finds column position since they have indices in STATUSES
            const next= direction === 'forward'? idx + 1: idx - 1
            if (next < 0 || next >= STATUSES.length){// This stops it from moving behind todo or beyond done
            return t
            }else{
                return {...t, status:STATUSES[next]}
            }
        })
    }}
    case "DELETE_TASK": return {...state, tasks:state.tasks.filter(t=> t.id !==action.payload.id)} //filter creates new array with tasks whose ids do not match the one we want to delete
    default: return state
}
}

export const initialState = {tasks:[]}// We first open there will be no tasks