import { useEffect, useReducer, useState } from "react";
import { retrieveKeys, retrieveLists, retrievePrimaryArr, saveList } from "../saveRetrieve";
import { INITIAL_STATE, postReducer } from "../../postReducer/postReducer";
import { ACTION_TYPES } from "../../postReducer/actiontypes";


export default ({ itemsArr, currentObj, setCurrentObj }) => {

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
    const [keys, setKeys] = useState()

    useEffect(() => {
        let keys = retrieveKeys();
        console.log('keys ', keys);

        setKeys(keys)
    }, [state.STATE_UPDATED])
    

    const handleAddListName = () => {
        let randomId = Math.random().toString().slice(2)

        if (keys.length === 1) {

        }

        let updated = { name: state.shoppingListName, id: randomId, primary: true, ...currentObj };
        console.log(updated);
        setCurrentObj(updated)

       

        dispatch({ type: ACTION_TYPES.STATE_UPDATED })
        document.querySelector('#nameListDialog').close();
    }

    const handleDialogInput = (e) => {
        
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: { name: e.target.name, value: e.target.value } })
        console.log(state);
        
    }

    const handleDialogOpen = () => { // open dialog
        document.querySelector('#nameListDialog').showModal();
    }

    return (
        <>
            <a className="
                btn bg-transparent border 
                border-dashed border-warning
                mr-2
                "
                onClick={handleDialogOpen}
            >Save List</a>
            <dialog id="nameListDialog" className="w-3/4 h-1/3 p-0 rounded-md">
                <div className="bg-neutral flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-white">
                    <a className="btn btn-warning absolute left-[75%] top-4 font-bold text-lg" onClick={() => document.querySelector('#nameListDialog').close()}>X</a>
                    <label className="text-white mb-2">Name this shopping list</label>
                    <input type="text" name="shoppingListName" placeholder={state.shoppingListName ? state.shoppingListName : keys} onChange={handleDialogInput} />
                    <a className="btn btn-primary m-3" onClick={handleAddListName}>Add</a>
                </div>
                
            </dialog>
        </>
    )
}