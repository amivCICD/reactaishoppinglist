import { useState } from "react";
import { saveList } from "../saveRetrieve";


export default ({ itemsArr }) => {

    const [listName, setListName] = useState("");

    
    
    const handleDialog = () => {
        saveList(listName);
        document.querySelector('#nameListDialog').close();
        setListName("")
    }

    const handleChange = (e) => {
        setListName(e.target.value)
        console.log('listName', listName);
    }

    // const getLSKeys = () => {
    //     let len = localStorage.length - 1;
    //     let lsKeys = [];

    //     if (len >= 1) {
    //         while (len) {
    //             lsKeys.push(localStorage.key(len))
    //             len--
    //         }
    //     }
    //     return lsKeys;
    // }
    // console.log(getLSKeys()); // localStorage keys

    
    const handleClick = () => { // open dialog
        document.querySelector('#nameListDialog').showModal();
    }


    return (
        <>
            <a className="
                btn bg-transparent border 
                border-dashed border-warning
                
                "
                onClick={handleClick}
            >Save List</a>
            <dialog id="nameListDialog" className="w-3/4 h-1/3 p-0 rounded-md">
                <div className="bg-neutral flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-white">
                    <a className="btn btn-warning absolute left-[75%] top-4 font-bold text-lg" onClick={() => document.querySelector('#nameListDialog').close()}>X</a>
                    <label className="text-white mb-2">Name this shopping list</label>
                    <input type="text" onChange={handleChange} />
                    <a className="btn btn-primary m-3" onClick={handleDialog}>Add</a>
                </div>
                
            </dialog>
        </>
    )
}