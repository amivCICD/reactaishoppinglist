import { useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, postReducer } from "../../postReducer/postReducer";
import { ACTION_TYPES } from "../../postReducer/actiontypes";

export default ({ currentObj, setCurrentObj, handleStateChange }) => {

    const [parentState, setParentState] = useState(false);
    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)

    const handleClick = () => {
        let copy = { ...currentObj }
        copy.primary = false;
        console.log(copy);
        // setCurrentObj(copy)
        localStorage.setObj(copy.id, copy)
        // let initial_state_copy = { ...INITIAL_STATE }
        // setCurrentObj(initial_state_copy)
        // setParentState(val => !val)
        // handleStateChange(parentState)
        let id = Math.random().toString().slice(2)
        
       
        function makeNewObj() {
            return {
                id: id,
                primary: true,
                name: '',
                groceryList: [{ grocery: 'Please add a grocery item to proceed...', id: id, acquired: false }],
            }
        }
        const n = new makeNewObj()
        console.log('constructor function', n);

        localStorage.setObj(n.id, n)
        let item = localStorage.getObj(n.id)
        console.log('item``` ', item);
        setCurrentObj(item);

        let li = Array.from(document.querySelectorAll('li'))
        li.forEach(line => {
          
            if (line.id === currentObj.id) {
                line.classList.remove('border-4')
                line.classList.remove('border-warning')
                line.classList.remove('border-dashed')
            }
        })




        dispatch({ type: ACTION_TYPES.NEW_STATE })
    }

    useEffect(() => {
        

    }, [state.NEW_STATE, parentState])
    

    return (
        <>
            <a 
                className="btn btn-primary btn-outline btn-circle ml-5"
                onClick={handleClick}
            >
                New List
            </a>
        </>
    )
}