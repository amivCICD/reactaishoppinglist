import { useEffect, useState, useReducer } from "react";
import { postReducer, INITIAL_STATE } from "../postReducer/postReducer";
import { ACTION_TYPES } from "../postReducer/actiontypes";
import List from "../list/List";


// notes 6:57 P.M. - you are leaving off where we are setting local storage items, now we just need to fetch them,
// but we also need to look for changes to localStorage, or else the DOM will not update
// useEffect should be called, and we can consider using useReducer hook for our state as well as local storage state changes
// this is the AddItems component, should we separate the logic of appending from this?

// update: 8:10 am 03 17 2023 - just dispatch a re-render to the list component, see what happens


export default () => {

    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj));
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
    const [parentState, setParentState] = useState(false);
    const [itemsArr, setItemsArr] = useState([]);

    const handleStateChange = (newState) => {
        
        setParentState(newState)
        console.log(parentState);
        dispatch({ type: ACTION_TYPES.STATE_UPDATED })
    }
    
    useEffect(() => {
        
        function getLocalStorage() {
            dispatch({ type: ACTION_TYPES.FETCH_START })
            // let items = localStorage.getItem("item1")
            let items = localStorage.getObj("groceryListArr")
            // console.log(items);
            if (items) {
                // setItemsArr(items.split(","))
                setItemsArr(items)
                dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: itemsArr })
            } else if (!items) {
               
                dispatch({ type: ACTION_TYPES.FETCH_ERROR })
                // setItemsArr(['add items fetch error'])
                setItemsArr(['plz add an item'])
                // console.log('There is nothing in local storage...');
            }
            return itemsArr;
        }
        getLocalStorage();
        console.log(itemsArr);
        // console.log('use effect from add items');
        // parentState
    }, [state.updated, parentState])

    const handleChange = (e) => {
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: {name: e.target.name, value: e.target.value ? e.target.value : ""} })
    }
    const handleClick = () => {
        localStorage.setObj("groceryListArr", state.post.length === 0 ? [{ grocery:state.grocery, acquired: false, id: Math.random().toString().slice(2) }] : [{grocery: state.grocery, acquired: false, id: Math.random().toString().slice(2)}, ...state.post])
        // localStorage.setObj("groceryListArr", )
        document.querySelector('input').value = ''
        document.querySelector('input').focus();
        dispatch({ type: ACTION_TYPES.STATE_UPDATED })
    }
    const handleKey = (e) => {
        const plusBtn = document.querySelector("#plus")
        
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            plusBtn.click()
            document.querySelector('input').value = ''
        } else {
            return
        }
    }
    const clearList = () => {
        localStorage.clear();
        dispatch({ type: ACTION_TYPES.STATE_UPDATED })
    }
    
    

    return (
        <>
        <div className="flex items-center justify-center pt-2 pb-6">
            <div className="relative">
                <input className="input input-bordered input-success w-72 max-w-md" 
                       type="text" 
                       placeholder="Grocery..."
                       onChange={handleChange}
                       name="grocery"
                       onKeyUp={handleKey}
                />
                <div className="absolute top-0 left-[178px]">
                    <button id="plus" className="btn btn-accent btn-outline border-2 text-4xl pb-2"
                            onClick={handleClick}
                    >+</button>
                    <div className="absolute top-0 left-[60px] sm:left-[60px]">
                    <button className="btn btn-info btn-xs sm:btn-xl btn-outline border-2 text-4xl h-12 pb-2"
                            onClick={clearList}
                    >&#9850;</button>
                    </div>
                </div>
            </div>
        </div>
        <List itemsArr={itemsArr} onStateChange={handleStateChange} />
        </>
    )
}