//slice- is the redux Toolkit's shortcut-generates actions and reducers
//from one object. You write one thing, you get both.

import { createSlice } from "@reduxjs/toolkit";


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


const bookmarksSlice= createSlice({
    name:'bookmarks',
    initialState: {
        ids: loadFromStorage() //the restored ids(the already added ones) from the local storage
    },
    reducers: {
        addBookmark(state,action){

            const id= action.payload
            //only add post to bookmark if it's not already on the list
            if (!state.ids.includes(id)){
                state.ids.push(id)
            }
        },

        removeBookmark(state,action){

            const id= action.payload
            //only remove the choosen id/post that was bookmarked
            state.ids= state.ids.filter(existingId=> existingId !== id)
        }
    }
})


export const {addBookmark,removeBookmark} = bookmarksSlice.actions;

//Returns the full array of bookmarkedIds 
export const selectBookmarkIds= (state) => state.bookmarks.ids



export default bookmarksSlice.reducer