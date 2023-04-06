import { useEffect, useState, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "../postReducer/postReducer"
import { ACTION_TYPES } from "../postReducer/actiontypes"


// const [list, setList] = useState(null)

export default ({ itemsArr, onStateChange }) => {
    console.log(itemsArr);
    const [childState, setChildState] = useState(null)
    const [array, setArray] = useState()
    const [stateChange, setStateChange] = useState(false)
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
        console.log(e.target.parentElement.parentElement.id);
        let id = e.target.parentElement.parentElement.id
        let index = id
        let groceryItemIndex = itemsArr[index]

        // let updateArray = itemsArr.filter((i, index) => i[index] !== i[groceryItemIndex])
        let filtArr = itemsArr.filter((i, index) => (index + i.grocery) !== id)
        // let filt2 = itemsArr.filter(i => i[id] !== i)
        // console.log(filt2);
        // console.log(updateArray);
        console.log(filtArr);

        localStorage.setObj("groceryListArr", filtArr)
        setStateChange(prev => !prev)
        onStateChange(stateChange)
    }
    const handleChange = (e) => {
        let val = e.target.checked
        let bgDiv = e.target.parentElement.parentElement
        let id = e.target.parentElement.parentElement.id
        let value = e.target.value
        console.log(value);

        if (e) {
            
            console.log(checked);
        }
        
        if (checked) {
            setChecked(checked => !checked)
            console.log(val);
            console.log(id);

            let whichIndex = el => el.id === id;
            let itemIndex = itemsArr.findIndex(whichIndex)
            console.log(itemIndex);
            itemsArr[itemIndex].acquired = checked;
            console.log(itemsArr[itemIndex].acquired);

            console.log(itemsArr, 'new items arr');

            val && bgDiv.classList.remove("from-primary", "to-success")
            val && bgDiv.classList.add("from-gray-800", "to-gray-300")

            localStorage.setObj("groceryListArr", itemsArr)
            setStateChange(prev => !prev)
            onStateChange(stateChange)
        } else if (!checked) {
            setChecked(checked => !checked)
            let whichIndex = el => el.id === id;
            let itemIndex = itemsArr.findIndex(whichIndex)
            console.log(itemIndex);
            itemsArr[itemIndex].acquired = checked;

            console.log(itemsArr, 'new items arr');


            localStorage.setObj("groceryListArr", itemsArr)

            !val && bgDiv.classList.remove("from-gray-800", "to-gray-300")
            !val && bgDiv.classList.add("from-primary", "to-success")


            setStateChange(prev => !prev)
            onStateChange(stateChange)
        }


        // onStateChange(checked)
        // console.log(e.target.parentElement.parentElement);
        
        
    }

    // useEffect(() => {
    //     // setArray(itemsArr)
 
    // }, [])
    

    return (
        
        <div className="h-full w-full mx-auto gap-5">
            
            {
                // itemsArr?.length !== 0
            itemsArr.length !== 0 && itemsArr?.map((i, index) => {
                    return <div id={`${i?.id}`} key={index + i.grocery}
                                className="
                                    text-neutral items-center font-bold bg-gradient-to-r from-primary to-success w-7/8 mx-auto flex p-5 m-2 rounded-sm"
                                    >{i.grocery}
                                    <div className="flex justify-end ml-auto items-center">
                                        <button onClick={handleRemove} className="btn btn-accent btn-sm rounded-1/2 mr-2 font-bold text-xl items-center">-</button>
                                        {/* <span className="">Got</span> */}
                                        <input className="checkbox checkbox-primary ml-1" type="checkbox" checked={i.acquired} value={checked} onChange={handleChange} />
                                    </div>
                            </div>
                })
                
            } 
            
        </div>
        
    )
}