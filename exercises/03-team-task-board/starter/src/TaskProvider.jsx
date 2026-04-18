

const TaskContext = createContext()

export default function TaskProvider({children}){
  const [state, dispatch] = useReducer(Reducer, initialState)
  return( 
  <TaskContext.Provider value={{state, dispatch}}>
           {children}
   </TaskContext.Provider>)
}