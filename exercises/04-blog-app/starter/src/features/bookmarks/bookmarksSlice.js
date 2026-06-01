import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     ids: []
// }
const savedBookmarks =
  JSON.parse(localStorage.getItem("bookmarks")) || [];

const initialState = {
  ids: savedBookmarks,
};

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState, 
    reducers:{
        addBookmark:(state, action) =>{
            const id = action.payload
            if(!state.ids.includes(id)){
                state.ids.push(id)
            }
        },
        removeBookmark:(state, action) =>{
            const id = action.payload
            state.ids = state.ids.filter( bookmarkId => bookmarkId !== id)
        }
    }
})

export const { addBookmark, removeBookmark } = bookmarksSlice.actions
export const selectBookmarkIds = state => state.bookmarks.ids

export default bookmarksSlice.reducer