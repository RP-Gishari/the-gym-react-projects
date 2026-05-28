//slice- is the redux Toolkit's shortcut-generates actions and reducers
//from one object. You write one thing, you get both.

import { createSlice } from "@reduxjs/toolkit";

{/*import Bookmark from "../../components/Bookmark";

export const userSlice= createSlice({
    name: "user",
    initialState:{value:{name:"Pedro", age:0,email:"@gmail.com"}},
    reducers:{
        Bookmark: (state,action)=>{
          state.value=action.payload;

        }
    }
})

export const {Bookmark}=userSlice.actions

export default userSlice.reducer;
*/}

//localStorage to help bookmark survive the refresh

function loadFromStorage(){
    try{
        const raw= localStorage.getItem('bookmarks')
        //parse to array since local storage stores only strings
        return raw? JSON.parse(raw) : []
    }catch{
        //refresh if parsing fails
        return []
    }
}


