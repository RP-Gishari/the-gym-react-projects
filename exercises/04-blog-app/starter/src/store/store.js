//It is the single source of truth
//Holds all states that you want to make global
//--reducers show how the store updates itself when it receives instruction(actions=instructions)

//NO CPT PASSES BOOKMARK DATA TO ANOTHER THROUGH PROPS, EVERY CPT CAN TALK TO STORE
//This means that whatever in store can be accessed by any cpt as long as that cpt dispatches an action.
import {configureStore} from '@reduxjs/toolkit'
import bookmarksReducer from './bookmarks/bookmarksSlice'

function saveToStorage(ids){
try{
    localStorage.setItem('bookmarks',JSON.stringify(ids))//setItem here is storing the data
}catch{
    return []
}
}

export const store = configureStore({
    reducer:{
        //the slices go here 
        bookmarks: bookmarksReducer
    }
})