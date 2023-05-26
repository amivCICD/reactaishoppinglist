import { useEffect, useState, useReducer, useLayoutEffect, useRef } from "react";
import { postReducer, INITIAL_STATE } from "../postReducer/postReducer";
import { ACTION_TYPES } from "../postReducer/actiontypes";
import List from "../list/List";
import SaveList from "./subcomponents/SaveList";
import ViewLists from "./subcomponents/ViewLists";
import { deleteList, retrieveKeys, retrieveLists, retrievePrimaryArr, saveList, retrievePrimaryArrayKey } from "./saveRetrieve";
import { useLocalStorage } from "./useLocalStorage";
import { useRetrieveKeys } from "./useRetrieveKeys";
import { getObjCount, objNamesList } from "./functions/objectNamesList";
import NewList from "./subcomponents/NewList";
import GPTInput from "../gpt_input/GPTInput";
import { gsap } from "gsap";



// notes 6:57 P.M. - you are leaving off where we are setting local storage items, now we just need to fetch them,
// but we also need to look for changes to localStorage, or else the DOM will not update
// useEffect should be called, and we can consider using useReducer hook for our state as well as local storage state changes
// this is the AddItems component, should we separate the logic of appending from this?

// update: 8:10 am 03 17 2023 - just dispatch a re-render to the list component, see what happens


export default ({ appState }) => {
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj));
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }

    

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
    const [parentState, setParentState] = useState(false);
    const [itemsArr, setItemsArr] = useState(['Please add an item to begin...']);
    const [listNames, setListNames] = useState([])
    let pak = retrievePrimaryArrayKey()(retrieveKeys())(retrieveLists(retrieveKeys()))
    const [currentObj, setCurrentObj] = useLocalStorage(pak, INITIAL_STATE)
    
    
    
    

    const handleStateChange = (newState) => {
        setParentState(newState)
        console.log('parent state ', parentState);
        dispatch({ type: ACTION_TYPES.STATE_UPDATED })
    }
    

    
    useEffect(() => {
        console.log(' add items re rendered');
       
        setListNames(objNamesList(getObjCount()));
        setItemsArr(currentObj?.groceryList);
        
    }, [currentObj, parentState, appState])
    
    
    

    const handleChange = (e) => {
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: {name: e.target.name, value: e.target.value ? e.target.value : ""} })
    }
    const handleClick = () => {
        if (document.querySelector('.groceryInput').value === '') return;
        let groceryId = Math.random().toString().slice(2);
        let objId = Math.random().toString().slice(2);
 
        const handleStuff = () => {
           
            let filt = currentObj.groceryList.filter(i => i.grocery !== 'Please add a grocery item to proceed...')
            
            if (currentObj?.groceryList?.length) {
                setCurrentObj(
                    { ...currentObj, groceryList: [{ grocery: state.grocery, id: groceryId, acquired: false }, ...filt ] }
                )
                localStorage.setObj(currentObj.id, currentObj)
            } else {
                console.log('is this even making it');
                setCurrentObj(
                    { ...currentObj, groceryList: [{ grocery: state.grocery, id: groceryId, acquired: false }] }
                )
            }      
        }
        handleStuff()


        document.querySelector('.groceryInput').value = '';
        document.querySelector('.groceryInput').focus();
       
    }
    const handleEnterKeyDown = (e) => {
        if (document.querySelector('.groceryInput').value === '') return;
        
        const plusBtn = document.querySelector("#plus");
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            plusBtn.click()
            document.querySelector('.groceryInput').value = ''
        } else {
            return
        }
    }
    const clearList = () => {
        
        console.log(currentObj);
        dispatch({ type: ACTION_TYPES.FETCH_REMOVE })
        
    }
    
    let component = useRef();
    useLayoutEffect(() => {

        let ctx = gsap.context(() => {
            gsap.fromTo(['#plus', '#minus'], { y: -1500 }, { y: 0, duration: 1, ease: 'elastic'  })
            
        }, component)
        gsap.fromTo('.groceryInput', { x: -2000 }, { x: 0 })
        return () => ctx.revert();
    }, [])
    

    return (
        <>
        <div className="flex items-center justify-center pt-2 pb-6">
            <div className="relative">
                <input className="groceryInput input input-bordered input-success w-72 max-w-md" 
                       type="text" 
                       placeholder="Grocery..."
                       onChange={handleChange}
                       name="grocery"
                       onKeyUp={handleEnterKeyDown}
                />
                <div className="absolute top-0 left-[178px]" ref={component}>
                    <button id="plus" className="btn btn-accent btn-outline border-2 text-4xl pb-2"
                            onClick={handleClick}
                    >+</button>
                    <div className="absolute top-0 left-[60px] sm:left-[60px]">
                    <button id="minus" className="btn btn-info btn-xs sm:btn-xl btn-outline border-2 text-4xl h-12 pb-2"
                            onClick={clearList}
                    >&#9850;</button>
                    </div>
                </div>
            </div>
        </div>
        <List itemsArr={itemsArr} currentObj={currentObj} setCurrentObj={setCurrentObj} onStateChange={handleStateChange}  />
        <div className="flex items-center justify-center my-5">
            <SaveList itemsArr={itemsArr} currentObj={currentObj} setCurrentObj={setCurrentObj} />
            <ViewLists currentObj={currentObj} setCurrentObj={setCurrentObj} itemsArr={itemsArr} listNames={listNames} handleStateChange={handleStateChange} />
            <NewList currentObj={currentObj} setCurrentObj={setCurrentObj} handleStateChange={handleStateChange} />
        </div>
        <div className="h-52">
            <GPTInput handleStateChange={handleStateChange} currentObj={currentObj} setCurrentObj={setCurrentObj} />
        </div>
        </>
    )
}

