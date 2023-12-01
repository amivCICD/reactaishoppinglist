import { useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, postReducer } from "../../../postReducer/postReducer";
import { retrieveKeys, retrieveLists } from "../../saveRetrieve"
import { gsap } from "gsap";



export default ({ currentObj, setCurrentObj, itemsArr, listNames, handleDeleteList }) => {

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)


    useEffect(() => {
        // const keys = retrieveKeys();
        // const allLists = retrieveLists(keys)
        // console.log('all lists', allLists);
        //console.log(listNames); // same as above







    }, [state.STATE_UPDATED])

    //console.log(listNames);
    const openDialog = () => {
        document.querySelector('#listsDialog').showModal();
        let li = Array.from(document.querySelectorAll('li'))
        let ctx = gsap.context(() => {
            gsap.fromTo('#listsDialog',
                {
                    opacity: 0,
                    x: 1000,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: .05,
                    ease: 'elastic'
                })
        })

        // console.log(li[0].id);
        li.forEach(line => {
            if (line.id === currentObj.id) {
                line.classList.add('border-4')
                line.classList.add('border-warning')
                line.classList.add('border-dashed')
            }
        })
    }
    const handleLoadLists = (e) => {
        let copyOfCurrentObj = { ...currentObj }
        copyOfCurrentObj.primary = false;
        localStorage.setObj(copyOfCurrentObj.id, copyOfCurrentObj);
        let selectedList = listNames.filter(i => i.id === e.target.id);
        let copy = selectedList[0]
        copy.primary = true;
        localStorage.setObj(selectedList[0].id, { ...copy })
        setCurrentObj(copy)

        let li = Array.from(document.querySelectorAll('li'))
        // console.log(li[0].id);
        li.forEach(line => {
            if (line.id === currentObj.id) {
                line.classList.remove('border-4')
                line.classList.remove('border-red-500')
                line.classList.remove('border-dashed')
            }
        })

        document.querySelector('#listsDialog').close();

    //    updateObjectPrimary(currentObj, true)
    }


    return (
        <>
        <a className="
                btn btn-outline btn-circle btn-secondary
                "
            onClick={openDialog}
            >Lists
        </a>
            <dialog id="listsDialog" className="w-3/4 h-3/4 bg-neutral outline-double outline-warning outline-[24px] rounded-md overflow-y-auto">
                <div className="
                    absolute left-[90%] text-2xl font-black text-white cursor-pointer hover:text-warning"
                    onClick={() => document.querySelector('#listsDialog').close()}
                    >X
                </div>
                <div className="border-dashed border-warning border-4 text-white w-fit p-2 italic font-extralight">current list</div>
                <div className="flex flex-col items-center justify-center my-auto h-full">
                <h1 className="text-2xl text-white font-black">Saved Lists:</h1>
                    <ul className="text-white inline-block p-4">
                        {listNames?.length > 0 && listNames?.map((list, i) => {
                            // <li className="text-white z-50" key={list?.id ? list.id : list.name}>{list?.name}</li>
                            return <li key={list?.id ? list?.id : i} id={list.id} className="text-secondary p-2 font-bold flex items-center justify-center">
                                        {list.id === currentObj.id ?
                                            <button
                                                className="
                                                    btn btn-accent btn-xs sm:btn-xl btn-outline
                                                    border-2 text-4xl h-12 pb-2 mr-auto
                                                    tooltip"
                                                id={list.id}
                                                data-tip="This is your current list"
                                            >&#9733;
                                            </button>
                                         : <button
                                            className="btn btn-info btn-xs sm:btn-xl btn-outline border-2 text-4xl h-12 pb-2 mr-auto"
                                            onClick={handleDeleteList}
                                            id={list.id}
                                            >&#9850;
                                            </button>
                                        }
                                        <p className="flex items-center justify-center p-2">{list?.name ? list?.name : list?.id}</p>
                                        {list.id !== currentObj.id ? <a
                                            className="btn btn-circle btn-outline ml-auto text-accent hover:bg-transparent hover:text-success-content"
                                            onClick={handleLoadLists}
                                            id={list.id}
                                        >
                                        Load
                                        </a>
                                        : ''}
                                    </li>
                        })}
                    </ul>
                </div>
            </dialog>
        </>
    )
}