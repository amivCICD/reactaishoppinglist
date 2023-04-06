import ListItem from "./ListItem"
import { useEffect, useReducer, useState } from "react"
import { INITIAL_STATE, postReducer } from "../postReducer/postReducer"
import { ACTION_TYPES } from "../postReducer/actiontypes"
import AddItems from "../items/AddItems"


let arr = ["Please add an item to continue..."]

export default ({ itemsArr, onStateChange }) => {

    // dispatch
    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    const [storage, setStorage] = useState([])
    // let itemsArr;

    useEffect(() => {
        if (localStorage.getItem("item1")) {
            // dispatch({ type: state.STATE_UPDATE })
            // const items = localStorage.getItem("item1")
            // let itemsArr = items.split(",") 
            // setStorage(itemsArr.length > 1 ? ([...itemsArr]) : [itemsArr])
            // console.log(itemsArr);
        }
        // function getLocalStorage() {
        //     dispatch({ type: ACTION_TYPES.FETCH_START })
        //     let items = localStorage.getItem("item1")
        //     if (items) {
        //         itemsArr = items.split(",")
        //         dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: itemsArr })
        //     } else if (!items) {
        //         dispatch({ type: ACTION_TYPES.FETCH_ERROR })
        //         items = "Add a grocery item to continue"
        //         console.log('There is nothing in local storage...');
        //     }
        //     return items
        // }
        // getLocalStorage();
        // console.log(state);
        
    }, [])
    
    return (
        <div>
            
            <div className="w-5/6 sm:w-3/4 bg-neutral flex flex-col items-start mx-auto p-5 h-fit rounded-md">
                <ListItem itemsArr={itemsArr?.length !== 0 ? itemsArr : arr} onStateChange={onStateChange} />
            </div>
        
        </div>
    )
}