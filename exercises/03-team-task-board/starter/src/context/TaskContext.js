import { useReducer } from "react";
import { createContext } from "react";
import {taskReducer} from "./reducer/taskReducer.js"
import {initialState} from "./reducer/taskReducer.js"
import { useContext } from "react";

export const TaskContext = createContext();

export default function TaskProvider({children}) {
    const [state, dispatch] = useReducer(taskReducer,initialState );
    return(
        <TaskContext.Provider value={{state, dispatch}}>
        {children}
         </TaskContext.Provider>
    )
    
}

export  function useTasks() {
    const context = useContext(TaskContext);
    if(!context){
        throw new Error('useTasks must be used within TaskProvider')
    }

    return context;
}