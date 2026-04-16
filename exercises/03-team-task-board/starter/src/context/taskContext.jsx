import {createContext, useContext, useReducer} from 'react'
import { taskReducer,initialState } from '../reducer/taskReducer'

const TaskContext= createContext(null)//creates a context object which is empty before the provider could give it data where any component can tune in and receive it

export function TaskProvider({children}){//any component inside this wrapper can access the context. children stands for whatever nested inside this cpt

function loadState(){//load saved tasks from localStorage on first render (lazy initializer)
    try{
        const saved = localStorage.getItem('tasks')
        return saved? JSON.parse(saved): initialState
    } 
    catch{
      return initialState 
    }
}

//Wrap reducer so every dispatch gets localStorage
function reducerOnReload(state,action){
const nextState=taskReducer(state,action)
localStorage.setItem('tasks',JSON.stringify(nextState))
return nextState;
}
const [state, dispatch] = useReducer(reducerOnReload,undefined, loadState)//prevents loadState to run on every render
//taskReducer-> function that knows how to update state
// dispatch-> a fxn to call to send a command to the reducer (what cpts will call to change tasks)

return (
    <TaskContext.Provider value={{state,dispatch}}> 
        {children}
    </TaskContext.Provider>// what makes the context available to child cpts

)
}

//function to help us to not have to import both useContext and TaskContext in every component.
export function useTask(){
    return useContext(TaskContext)
}
