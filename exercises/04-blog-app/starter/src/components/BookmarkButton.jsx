
import { useSelector,useDispatch } from "react-redux";
import {Bookmark} from 'lucide-react'
import {Button} from './ui'
//useSelector is how a component reads from the notebook(store)->re-renders when value changes.
//useDispatch is how a component sends an instruction to the notebook
import { addBookmark,removeBookmark,selectIsBookmarked } from "../store/bookmarks/bookmarksSlice";


export default function BookmarkButton({postId}){
    const dispatch = useDispatch()
    const isBookmarked = useSelector(selectIsBookmarked(postId))

    function handleClick(e){
        e.preventDefault()
        e.stoPropagation()

        if (isBookmarked){
            dispatch(removeBookmark(postId))
        }else {
            dispatch(addBookmark(postId))
        }
    }


    return(
        <>
        <Button 
        variant = {isBookmarked? 'primary' : 'secondary'}
        onClick={handleClick}
        >
         <Bookmark className="w-4-h-4" fill={isBookmarked? 'currentColor': 'none'}/>
        
        </Button>
        </>
    )
}