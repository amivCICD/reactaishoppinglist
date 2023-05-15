import { useEffect, useState, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "../postReducer/postReducer"
import { ACTION_TYPES } from "../postReducer/actiontypes"




export default ({ itemsArr, currentObj, setCurrentObj, onStateChange }) => {
    

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    const [checked, setChecked] = useState(false)
    let randomId = Math.random().toString().slice(2)

    const handleRemove = (e) => {
        let id = e.target.parentElement.parentElement.id
        console.log(id);
        let index = id
        let groceryItemIndex = itemsArr[index]

        
        let filtArr = itemsArr.filter((i, index) => (i.id) !== id)
      
        console.log(filtArr, 'filt array in handle remove');

        if (filtArr.length === 0) {
            filtArr[0] = { grocery: 'Please add a grocery item to proceed...', id: randomId, acquired: false }
            setCurrentObj({ groceryList: filtArr })
        } else {
            setCurrentObj({ groceryList: filtArr })
            
        }
        

        
    }

    const handleChange = (e) => {
        let checkedVal = e.target.checked
        let bgDiv = e.target.parentElement.parentElement
        let id = e.target.parentElement.parentElement.id
        console.log(checkedVal);
        let whichIndex = el => el.id === id;
        let itemIndex = itemsArr.findIndex(whichIndex)

        if (checkedVal) {
           
            bgDiv.classList.remove("from-primary", "to-success");
            bgDiv.classList.add("from-gray-800", "to-gray-300");
            let updated = {...currentObj}
            console.log(updated);
            updated.groceryList[itemIndex].acquired = true
            setCurrentObj(updated);

            // dispatch({ type: ACTION_TYPES.STATE_UPDATED, payload: { ...currentObj } })
            onStateChange(checkedVal)
            
        } else if (!checkedVal) {
            
            bgDiv.classList.remove("from-gray-800", "to-gray-300");
            bgDiv.classList.add("from-primary", "to-success");
            let updated = {...currentObj}
            console.log(updated);
            updated.groceryList[itemIndex].acquired = false
            setCurrentObj(updated);

            onStateChange(checkedVal)
            // dispatch({ type: ACTION_TYPES.STATE_UPDATED, payload: { post: currentObj } })

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
                                                {`btn btn-accent btn-sm rounded-1/2 mr-2 font-bold text-xl items-center ${itemsArr[0]?.grocery === 'Please add a grocery item to proceed...' && 'hidden'}`}
                                        >
                                        -</button>
                                        {/* <span className="">Got</span> */}
                                        <input className=
                                            {`checkbox checkbox-primary ml-1 ${itemsArr[0]?.grocery === 'Please add a grocery item to proceed...' && 'hidden'}`} 
                                            type="checkbox"
                                            onChange={handleChange}
                                            value={i.acquired}
                                            checked={i.acquired}
                                        />
                                    </div>
                            </div>
                })
                
            } 
            
        </div>
        
    )
}