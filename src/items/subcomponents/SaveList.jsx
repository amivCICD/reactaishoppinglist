import { useEffect, useReducer, useState } from "react";
import { retrieveKeys, retrieveLists, retrievePrimaryArr, saveList } from "../saveRetrieve";
import { INITIAL_STATE, postReducer } from "../../postReducer/postReducer";
import { ACTION_TYPES } from "../../postReducer/actiontypes";


export default ({ itemsArr, currentObj, setCurrentObj }) => {

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
    const [keys, setKeys] = useState(null)

    useEffect(() => { console.log('useEffect in SaveList'); }, [state.STATE_UPDATED])
    

    const handleAddListName = () => {
        let updated = { ...currentObj, name: state.shoppingListName, primary: true };
        console.log(updated);
        setCurrentObj(updated);
        localStorage.setObj(currentObj.id, currentObj)
        dispatch({ type: ACTION_TYPES.STATE_UPDATED, payload: { updated: true } })
        document.querySelector('#nameListDialog').close();
    }

    const handleDialogInput = (e) => {
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: { name: e.target.name, value: e.target.value } })
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