import { useEffect, useState, useReducer, useLayoutEffect, useRef } from "react";
import { postReducer, INITIAL_STATE } from "../postReducer/postReducer";
import { ACTION_TYPES } from "../postReducer/actiontypes";
import List from "../list/List";
import SaveList from "./subcomponents/SaveList";
import { retrieveKeys, retrieveLists, retrievePrimaryArrayKey } from "./saveRetrieve";
import { useLocalStorage } from "./useLocalStorage";
import { getObjCount, objNamesList } from "./functions/objectNamesList";
import NewList from "./subcomponents/NewList";
import GPTInput from "../gpt_input/GPTInput";
import { gsap } from "gsap";
import ViewDialog from "./subcomponents/viewDialog/ViewDialog";


export default () => {
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
    const [listNames2, setListNames2] = useState([])
    let pak = retrievePrimaryArrayKey()(retrieveKeys())(retrieveLists(retrieveKeys()))
    const [currentObj, setCurrentObj] = useLocalStorage(pak, INITIAL_STATE);
    const inputRef = useRef();
    const [windowWidth, setWindowWidth] = useState(null);


    const handleStateChange = (newState) => {
        setParentState(newState)
        // console.log('parent state ', parentState);
        dispatch({ type: ACTION_TYPES.STATE_UPDATED })
    }

    useEffect(() => {
        // console.log(' add items re rendered');
        setListNames(objNamesList(getObjCount()));
        // console.log('list names in use effect', listNames);
        setItemsArr(currentObj?.groceryList);

        setWindowWidth(window.innerWidth)
    }, [currentObj, parentState, listNames2])






    const handleChange = (e) => {
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: {name: e.target.name, value: e.target.value ? e.target.value : ""} });


        // console.log(inputRef.current.size);
        // console.log(inputRef.current.value);
        // console.log(e.target.value);
        if (inputRef.current.value.length === 15) {
            inputRef.current.classList.remove(`w-72`)
            inputRef.current.classList.add(`w-[350px]`)
        }



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

        inputRef.current.classList.remove(`w-[350px]`)
        inputRef.current.classList.add('w-72')


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
        let randomId = Math.random().toString().slice(2)
        let copy = { ...currentObj }
        copy.groceryList = [{ grocery: 'Please add a grocery item to proceed...', id: randomId, acquired: false }];
        localStorage.setObj(copy.id, copy)
        setCurrentObj(copy)
    }
    const handleDeleteList = e => {
        if (e.target.id === currentObj.id) {
            return;
            // let filtArr = listNames.filter(i => i.id !== e.target.id)
            // console.log('same');
            // console.log('filt array in 1st section ', filtArr); // its correct
            // if (filtArr.length === 1) {
            //     console.log('hitting?');

            // }
            // if (listNames.length === 1) {
                //     filtArr[0] = { groceryList: [{ grocery: 'Please add a grocery item to proceed...', acquired: false }] , id: randomId, primary: true }
                //     setCurrentObj(filtArr[0]);
                //     return
                // }



            // let randomId = Math.random().toString().slice(2)
            // localStorage.removeItem(e.target.id)
            // console.log('listNames BEFORE first if ', listNames);
            // setListNames(filtArr)
            // console.log('listNames AFTER first if ', listNames);
            // // setListNames2(filtArr)
            // console.log('top section current obj', currentObj);
            // setCurrentObj({ groceryList: [{ grocery: 'Please add a grocery item to proceed...', acquired: false }] , id: randomId, primary: true })
            // setParentState(prev => !prev)

        } else {
            let filtArr = listNames.filter(i => i.id !== e.target.id)
            localStorage.removeItem(e.target.id)
            setListNames(filtArr)
        }
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
        <div className="flex items-center justify-center pt-2 pb-6 w-full">
            <div className="grid grid-cols-1 grid-rows-1 items-center justify-center" ref={component}>
                <input className="groceryInput input input-bordered input-success w-72 max-w-md col-start-1 row-start-1"
                       type="text"
                       placeholder="Grocery..."
                       onChange={handleChange}
                       name="grocery"
                       onKeyUp={handleEnterKeyDown}
                       ref={inputRef}

                />
                <div className="col-start-1 row-start-1 flex flex-row justify-end">
                    <div className=" tooltip w-fit" data-tip="Add item"  >
                        <button id="plus" className="btn btn-accent btn-outline border-2 text-4xl pb-2"
                                onClick={handleClick}
                                >+</button>
                    </div>
                    <div className=" tooltip w-fit" data-tip="Clear entire list">
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
            {/* <ViewLists currentObj={currentObj} setCurrentObj={setCurrentObj} itemsArr={itemsArr} listNames={listNames} /> */}
            <ViewDialog currentObj={currentObj} setCurrentObj={setCurrentObj} itemsArr={itemsArr} listNames={listNames} handleDeleteList={handleDeleteList} />
            <NewList currentObj={currentObj} setCurrentObj={setCurrentObj} handleStateChange={handleStateChange} />
        </div>
        <div className="h-52">
            <GPTInput handleStateChange={handleStateChange} currentObj={currentObj} setCurrentObj={setCurrentObj} />
        </div>
        </>
    )
}

