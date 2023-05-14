import { useEffect, useState, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "../postReducer/postReducer"
import { ACTION_TYPES } from "../postReducer/actiontypes"


// const [list, setList] = useState(null)

export default ({ itemsArr, currentObj, setCurrentObj, onStateChange }) => {
    // console.log(itemsArr);
    const [childState, setChildState] = useState(null)
    const [array, setArray] = useState()
    // const [stateChange, setStateChange] = useState(false) // get rid of state changers, postReducer should control state 05/11
    const [checked, setChecked] = useState(Boolean)

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)

    // const handleClick = (e) => {
    //     let id = e.target.parentElement.parentElement.id;
    //     // console.log(id);

    //     setChildState(id)
    //     let filtArr = itemsArr.filter((i, index) => (index + i) !== id)
    //     // console.log(filtArr);
    //     localStorage.setItem("item1", filtArr)
    //     onStateChange(id)
    // }
    

    const handleRemove = (e) => {
        let id = e.target.parentElement.parentElement.id
        console.log(id);
        let index = id
        let groceryItemIndex = itemsArr[index]

        // let updateArray = itemsArr.filter((i, index) => i[index] !== i[groceryItemIndex])
        // let filtArr = itemsArr.filter((i, index) => (index + i.grocery) !== id)
        let filtArr = itemsArr.filter((i, index) => (i.id) !== id)
        // let filt2 = itemsArr.filter(i => i[id] !== i)
        // console.log(filt2);
        // console.log(updateArray);
        console.log(filtArr, 'filt array in handle remove');

        setCurrentObj(filtArr)

        // if (filtArr.length === 0 && e) {
        //     localStorage.clear();
        //     // setStateChange(prev => !prev)
        //     // onStateChange(stateChange)
        //     // set ACTION_TYPES.CLEAR_STORAGE
        // } else {
        //     localStorage.setObj("groceryListArr", filtArr)
        //     // setStateChange(prev => !prev)
        //     // onStateChange(stateChange)
        //     dispatch({ type : ACTION_TYPES.STATE_UPDATED, payload: filtArr  })
        // }

        
    }

    const handleChange = (e) => {
        let checkedVal = e.target.checked
        let bgDiv = e.target.parentElement.parentElement
        let id = e.target.parentElement.parentElement.id
        console.log(checkedVal);
        let whichIndex = el => el.id === id;
        let itemIndex = itemsArr.findIndex(whichIndex)

        
        
        if (checkedVal) {
            // setChecked(checked => !checked)
            console.log(checkedVal);
            console.log(id);
            bgDiv.classList.remove("from-primary", "to-success")
            bgDiv.classList.add("from-gray-800", "to-gray-300")
            
            
            // itemsArr[itemIndex].acquired = checked;
            itemsArr[itemIndex].acquired = true;
            console.log(itemsArr[itemIndex].acquired);

            console.log(itemsArr, 'check items arr');

            localStorage.setObj("groceryListArr", itemsArr)
            // setStateChange(prev => !prev)
            // onStateChange(stateChange)
        } else if (!checkedVal) {
            
            bgDiv.classList.remove("from-gray-800", "to-gray-300")
            bgDiv.classList.add("from-primary", "to-success")


            itemsArr[itemIndex].acquired = false;
            console.log(itemsArr[itemIndex].acquired);

            console.log(itemsArr, 'uncheck items arr');

            localStorage.setObj("groceryListArr", itemsArr)
            // setStateChange(prev => !prev)
            // onStateChange(stateChange)
        }

            // checkedVal && bgDiv.classList.remove("from-primary", "to-success")
            // checkedVal && bgDiv.classList.add("from-gray-800", "to-gray-300")
            // !checkedVal && bgDiv.classList.remove("from-gray-800", "to-gray-300")
            // !checkedVal && bgDiv.classList.add("from-primary", "to-success")

        // onStateChange(checked)
        // console.log(e.target.parentElement.parentElement);
    }

    useEffect(() => {
        // setArray(itemsArr)
 
    }, [state.STATE_UPDATED])
    

    return (
        
        <div className="h-full w-full mx-auto gap-5">
            
            {
                // itemsArr?.length !== 0
            itemsArr?.length !== 0 && itemsArr?.map((i, index) => {
                    return <div id={`${i?.id}`} key={index + i.grocery}
                                className={`
                                    text-neutral items-center font-bold bg-gradient-to-r ${i.acquired ? "from-gray-800 to-gray-300" : "from-primary to-success"}  w-7/8 mx-auto flex p-5 m-2 rounded-sm itemDiv`}
                                    >{i.grocery}
                                    <div className="flex justify-end ml-auto items-center">
                                        <button 
                                            onClick={handleRemove} 
                                            className=
                                                {`btn btn-accent btn-sm rounded-1/2 mr-2 font-bold text-xl items-center ${itemsArr[0]?.id === 1969 && 'cursor-not-allowed'}`}
                                        >
                                        -</button>
                                        {/* <span className="">Got</span> */}
                                        <input className=
                                            {`checkbox checkbox-primary ml-1 inns ${itemsArr[0]?.id === 1969 && 'cursor-not-allowed'}`} 
                                            type="checkbox" 
                                            checked={i.acquired} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                            </div>
                })
                
            } 
            
        </div>
        
    )
}