import { useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, postReducer } from "../../../postReducer/postReducer";
import { ACTION_TYPES } from "../../../postReducer/actiontypes";
import { retrieveKeys, retrieveLists } from "../../saveRetrieve"
import { useRetrieveKeys } from "../../useRetrieveKeys";
import { updateObjectPrimary } from "../../functions/objectNamesList";


export default ({ currentObj, setCurrentObj, itemsArr, listNames }) => {

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    const [lists, setLists] = useState([]);
    const [render, setRender] = useState(false)
    // const [listNames, setListNames] = useRetrieveKeys();
    

    
    useEffect(() => {
        const keys = retrieveKeys();
        const allLists = retrieveLists(keys)
        // console.log('keys from ViewLists', keys);
        // console.log('retrieved lists', allLists);
        // setLists(allLists)
        console.log(listNames);
        // console.log('listNames in ViewDialog', listNames);
        // setListNames(allLists)

        // console.log('IS THIS RE RENDERING ON OPEN DIALOG CLICK');

        

    }, [state.STATE_UPDATED])

    const openDialog = () => {
        document.querySelector('#listsDialog').showModal();
    }
    const handleLoadLists = (e) => {
        console.log(e.target.id);
        console.log('list namesssssss ', listNames);
        let copyOfCurrentObj = { ...currentObj }
        copyOfCurrentObj.primary = false;
        localStorage.setObj(copyOfCurrentObj.id, copyOfCurrentObj);


        // loading symbol in here somewhere
        let selectedList = listNames.filter(i => i.id === e.target.id);
        console.log(selectedList);
        let copy = selectedList[0]
        copy.primary = true;
        localStorage.setObj(selectedList[0].id, { ...copy })
        setCurrentObj(copy)

        
        document.querySelector('#listsDialog').close();
       
    //    updateObjectPrimary(currentObj, true) 
    }
    // function updateObjectPrimary(selectedObj, Boolean) {
    //     let objCopy = { ...selectedObj }
    //     objCopy.primary = Boolean;
    //     let item = localStorage.setObj(objCopy.id, objCopy);
    //     return item;
    // }
   


    return (
        <>
        <a className="
                btn btn-outline btn-circle btn-secondary
                "
            onClick={openDialog}
            >Lists
        </a>
            <dialog id="listsDialog" className="w-3/4 h-3/4 bg-neutral outline-double outline-warning outline-[24px] rounded-md">
                <div className="
                    absolute left-[90%] text-2xl font-black text-white cursor-pointer hover:text-warning"
                    onClick={() => document.querySelector('#listsDialog').close()}
                    >X
                </div>
                <div className="flex flex-col items-center justify-center my-auto h-full">
                <h1 className="text-4xl text-white font-black">Saved Lists:</h1>
                    <ul className="text-white inline-block p-4">
                        {listNames?.length > 0 && listNames?.map((list, i) => {
                            // <li className="text-white z-50" key={list?.id ? list.id : list.name}>{list?.name}</li>
                            return <li key={list?.id ? list?.id : i} className="text-secondary p-2 font-bold flex items-center justify-center">
                                        <button className="btn btn-info btn-xs sm:btn-xl btn-outline border-2 text-4xl h-12 pb-2 mr-4">&#9850;</button>
                                        <p className="mr-4">{list?.name ? list?.name : list?.id}</p>
                                        <a 
                                            className="btn btn-circle btn-outline ml-auto text-accent hover:bg-transparent hover:text-success-content"
                                            onClick={handleLoadLists}
                                            id={list.id}
                                        >
                                            Load
                                        </a>
                                    </li>
                        })}
                        
                    </ul>
                    
                </div>
                
            </dialog>
        </>
    )
}