export default function Reducer(state, action){
  switch(action.type){

    case "ADD_TASK":
      return {
        ...state, tasks: [...state.tasks, action.payload]
      };

    case "MOVE_TASK":
      return {
        ...state, tasks: state.tasks.map(task => 
                   task.id === action.payload.id 
          ? {...task, status: action.payload.status}
          : task
          )
      };
    case "DELETE_TASK":
      return {...state, 
              tasks: state.tasks.filter(task => 
                task.id !== action.payload)}

      case "SET_FILTER":
        return {
          ...state, filters: {
            ...state.filters,
            ...action.payload
          }
        };
    default: 
      return state
  }
}
