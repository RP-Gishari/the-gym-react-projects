import { useReducer } from "react";
import { createContext } from "react";
import {taskReducer} from "./reducer/taskReducer.js"
import {initialState} from "./reducer/taskReducer.js"

const TaskContext = createContext();

export default function TaskProvider({children}) {
    const [state, dispatch] = useReducer(taskReducer,initialState );
    return(
        <>
        <TaskContext.Provider value={{state, dispatch}}>
        {children}
         </TaskContext.Provider>
        </>
    )
    
}