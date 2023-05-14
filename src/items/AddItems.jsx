import { useEffect, useState, useReducer } from "react";
import { postReducer, INITIAL_STATE } from "../postReducer/postReducer";
import { ACTION_TYPES } from "../postReducer/actiontypes";
import List from "../list/List";
import SaveList from "./subcomponents/SaveList";
import ViewLists from "./subcomponents/ViewLists";
import { deleteList, retrieveKeys, retrieveLists, retrievePrimaryArr, saveList } from "./saveRetrieve";
import { useLocalStorage } from "./useLocalStorage";


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
    const [key] = useState(localStorage.key(0))
    const [itemsArr, setItemsArr] = useState([]);
    // const [currentObj, setCurrentObj] = useState({});
    // const [initialObj, setInitialObj] = useLocalStorage(key, INITIAL_STATE)
    const [currentObj, setCurrentObj] = useLocalStorage(null, INITIAL_STATE)

    // I believe you need to change your initial_state to be your starting object
    

    const handleStateChange = (newState) => {
        setParentState(newState)
        console.log('parent state ', parentState);
        dispatch({ type: ACTION_TYPES.STATE_UPDATED })
    }
    
//     useEffect(() => {
        
//         // function getLocalStorage() {
//         //     dispatch({ type: ACTION_TYPES.FETCH_START })
//         //     // let items = localStorage.getObj("groceryListArr");
//         //     // implement logic here starting with fetching all local storage
//         //     // fetch all objects lists as an array
//         //     // filter that array and find which object has 'primary':true
//         //     // plug that array into setItemsArr as below
//         //     // next, get the id of the primary, and upon click/add items, setObj will intake that id
//         //     let keys = retrieveKeys();
//         //     console.log(keys);
//         //     console.log(keys[0]);
//         //     let allLists = retrieveLists(keys);
//         //     console.log(allLists);
//         //     if (allLists.length === 1) allLists[0].primary = true;
//         //     let filtArr = allLists.filter(list => list.primary === true);

//         //     console.log(filtArr);
//         //     let id;
//         //     let items;
//         //     if (filtArr.length > 0) {
//         //         id = filtArr[0]?.id;
//         //         items = localStorage.getObj(id);
//         //     } 
//         //     console.log('id: ', id);
//         //     console.log('items', items === undefined);

            
//         //     if (items !== undefined) {
//         //         // setItemsArr(items.split(","))
//         //         setCurrentObj(items)
//         //         console.log(currentObj);
//         //         setItemsArr(items.groceryList)
//         //         dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: itemsArr })
//         //     } else if (items === undefined) {
//         //         setItemsArr([{grocery: "Add an item to start or get list/recipe suggestions from openAI...", acquired: false, id: 1969}])
//         //         // dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: itemsArr })
//         //         dispatch({ type: ACTION_TYPES.FETCH_ERROR })
                
//         //     }
            
//         // }
//         // getLocalStorage();
        

//         // console.log('use effect from add items');
//         // parentState

//         // console.log('hello');
//     function init() {
//         dispatch({ type: ACTION_TYPES.FETCH_START });

//         if (localStorage.length === 0) {
//             dispatch({ type: ACTION_TYPES.FETCH_ERROR })
//         }

//         // function initialObj() {
//         //     return {
//         //         id: Math.random().toString().slice(2),
//         //         primary: true,
//         //         name: '',
//         //         groceryList: []
//         //     }
//         // }
//         // let init = initialObj;
        
//         // setInitialObj(init);
//         // console.log(initialObj);

//         function Initial() {
//             this.id = Math.random().toString().slice(2),
//             this.primary = true,
//             this.name = '',
//             this.groceryList = []
//         }
//         let init = new Initial()
//         setInitialObj(init)
//         // console.log('initialObj ', initialObj);
//         // console.log(initialObj?.id);
        

//         if (localStorage.getItem('replaced_stats')) {
//             localStorage.removeItem('replaced_stats')
//         } else if (localStorage.getItem('undefined')) {
//             localStorage.removeItem('undefined')
//         }

        
        
//         let keys = retrieveKeys();
//         console.log(keys);
//         let lists = retrieveLists(keys);
//         let primaryList = retrievePrimaryArr(lists);
//         console.log('primaryList ', primaryList);
//         // setItemsArr(currentObj?.groceryList)
//         // setItemsArr(primaryList[0]?.groceryList)
//         // dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: itemsArr })
        
//     if (keys.length === 0) {
        
//         console.log('keys length === 0 fired');
//         // setItemsArr(currentObj?.groceryList)
//         setCurrentObj(initialObj)
//         // setItemsArr(primaryList[0]?.groceryList)
//         // setItemsArr(currentObj?.groceryList)
//         // localStorage.setObj(initialObj?.id, initialObj)
//         localStorage.setObj(currentObj.id, currentObj)
//     // dispatch({ type: ACTION_TYPES.STATE_UPDATED })
//     // dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: itemsArr })
//     } else if (keys.length >= 1) {
//         console.log('keys length >1 fired');
//         setCurrentObj(primaryList[0])
//         setItemsArr(currentObj?.groceryList)
//         // setItemsArr(primaryList[0]?.groceryList)
        
//         localStorage.setObj(currentObj?.id, currentObj)
//         // dispatch({ type: ACTION_TYPES.STATE_UPDATED })
//         // dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: itemsArr })
//     }
//     console.log('state.post ', state.post);
//     console.log('currentObj ', currentObj);
//     console.log('itemsArr ', itemsArr);
//     dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: currentObj?.groceryList })
//     // you have items array under current obj and primaryList.groceryList under current obj
//     // use primary list for everything
    
// }
// init();
    
    
        
        
//     }, [state.updated, parentState])

    // useEffect(() => {
    //     function init() {
    //         dispatch({ type: ACTION_TYPES.FETCH_START })

    //         if (localStorage.key(0) === 'replaced_stats') {
    //             localStorage.removeItem('replaced_stats')
    //             console.log(localStorage.length);
    //         }

    //         if (localStorage.length === 0) {
    //             function InitialObj() {
    //                 this.id = Math.random().toString().slice(2);
    //                 this.name = '';
    //                 this.groceryList = [];
    //                 this.primary = true;
    //             }
    //             let init = new InitialObj();
    //             localStorage.setObj(init.id, init)
    //             let storage = localStorage.getObj(init.id)
    //             setCurrentObj(storage)
    //             dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: currentObj?.groceryList })
    //         }
    //         if (localStorage.length > 0) {
    //             let keys = retrieveKeys();
    //             let lists = retrieveLists(keys);
    //             let primaryArr = retrievePrimaryArr(lists);
    //             setCurrentObj(...primaryArr)
    //             dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: currentObj?.groceryList })
    //         }
    //     }
    //     init();
        
        
    // }, [state.updated])
    
    useEffect(() => {
        // dispatch({ type: ACTION_TYPES.FETCH_START })
        
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: currentObj })
        setItemsArr(currentObj.groceryList)
        console.log(currentObj);

    }, [currentObj])
    
    
    

    const handleChange = (e) => {
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: {name: e.target.name, value: e.target.value ? e.target.value : ""} })
    }
    const handleClick = () => {
        if (document.querySelector('.groceryInput').value === '') return;
        let groceryId = Math.random().toString().slice(2);
        
        // if(itemsArr[0].id === undefined) itemsArr[0].id = id; // I believe this is redundant
        // console.log(itemsArr[0]);
       
        // localStorage.setObj(
        //     currentObj.id, 
        //     state.post.length === 0 
        //     ? { name: '', id: currentObj.id, groceryList : [{ grocery: state.grocery, acquired: false, id: groceryId }] }
        //     : { name: '', id: currentObj.id, groceryList : [{ grocery: state.grocery, acquired: false, id: groceryId }, ...state.post] }
        // )
        // localStorage.setObj(
        //     currentObj?.id, 
        //     itemsArr?.length === 0 
        //     ? { ...currentObj, groceryList : [{ grocery: state.grocery, acquired: false, id: groceryId }] }
        //     : { ...currentObj, groceryList : [{ grocery: state.grocery, acquired: false, id: groceryId }, ...itemsArr] }
        // )
        // localStorage.setObj(
        //     currentObj?.id, 
        //     itemsArr?.length === 0
        //     ? {...currentObj, groceryList: [{ grocery: state.grocery, acquired: false, id: groceryId }]}
        //     : {...currentObj, groceryList: [{ grocery: state.grocery, acquired: false, id: groceryId }, ...state.post]}
        // )
        
        // localStorage.setObj(
        //     currentObj?.id,
        //     state?.post?.length === 0
        // ?    { id: currentObj?.id, name: currentObj?.name, groceryList: [{ grocery: state.grocery, acquired: false, id: groceryId }] }
        // :    { id: currentObj?.id, name: currentObj?.name, groceryList: [{ grocery: state.grocery, acquired: false, id: groceryId }, ...state.post] }
        // )

        // localStorage.setObj("groceryListArr", )
        // localStorage.setObj(currentObj?.id, currentObj)

        const handleStuff = () => {
            console.log(currentObj);
            dispatch({ type: ACTION_TYPES.STATE_UPDATED })
            if (currentObj?.groceryList?.length) {
                setCurrentObj(
                    {...currentObj, groceryList: [{ grocery: state.grocery, id: groceryId, acquired: false }, ...currentObj.groceryList] }
                )
            } else {
                setCurrentObj(
                    {...currentObj, groceryList: [{ grocery: state.grocery, id: groceryId, acquired: false }] }
                )
            }      
        }
        handleStuff()


        document.querySelector('.groceryInput').value = '';
        document.querySelector('.groceryInput').focus();
        // dispatch({ type: ACTION_TYPES.STATE_UPDATED })
        // setParentState(prev => !prev)
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
        // localStorage.clear();
        // localStorage.setObj('groceryList', [])
        // deleteList(currentObj.id)
        console.log(currentObj);
        dispatch({ type: ACTION_TYPES.FETCH_REMOVE })
        // setParentState(prev => !prev)
    }
    
    

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
        <List itemsArr={itemsArr} currentObj={currentObj} setCurrentObj={setCurrentObj} onStateChange={handleStateChange} />
        <div className="flex items-center justify-center mt-2">
            <SaveList itemsArr={itemsArr} currentObj={currentObj} />
            <ViewLists />
        </div>
        </>
    )
}