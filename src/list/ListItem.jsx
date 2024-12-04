import { useEffect, useState, useReducer, useRef, useLayoutEffect } from "react";
import { INITIAL_STATE, postReducer } from "../postReducer/postReducer"
import { ACTION_TYPES } from "../postReducer/actiontypes"
import { gsap } from "gsap";


export default ({ itemsArr, currentObj, setCurrentObj }) => {
<<<<<<< HEAD
    
    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    const [initialLoad, setInitialLoad] = useState(true)
    
=======

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    const [initialLoad, setInitialLoad] = useState(true);
    const [mobile, setIsMobile] = useState(false);

>>>>>>> dev

    let randomId = Math.random().toString().slice(2)

    const handleRemove = (e) => {
        let id = e.target.parentElement.parentElement.id
        let index = id
        let groceryItemIndex = itemsArr[index]

<<<<<<< HEAD
        
        let filtArr = itemsArr.filter((i, index) => (i.id) !== id)
      
        console.log(filtArr, 'filt array in handle remove');
=======

        let filtArr = itemsArr.filter((i, index) => (i.id) !== id)

        // console.log(filtArr, 'filt array in handle remove');
>>>>>>> dev

        if (filtArr.length === 0) {
            filtArr[0] = { grocery: 'Please add a grocery item to proceed...', id: randomId, acquired: false }
            setCurrentObj({ ...currentObj, groceryList: filtArr })
        } else {
            setCurrentObj({...currentObj, groceryList: filtArr })
        }
<<<<<<< HEAD
        
=======

>>>>>>> dev
    }

    const handleChange = (e) => {
        let checkedVal = e.target.checked
        let bgDiv = e.target.parentElement.parentElement
        let id = e.target.parentElement.parentElement.id
<<<<<<< HEAD
        console.log(checkedVal);
=======
        // console.log(checkedVal);
>>>>>>> dev
        let whichIndex = el => el.id === id;
        let itemIndex = itemsArr.findIndex(whichIndex)

        if (checkedVal) {
<<<<<<< HEAD
           
            bgDiv.classList.remove("from-primary", "to-success");
            bgDiv.classList.add("from-gray-800", "to-gray-300");
            let updated = { ...currentObj }
            console.log(updated);
=======

            bgDiv.classList.remove("from-primary", "to-success");
            bgDiv.classList.add("from-gray-800", "to-gray-300");
            let updated = { ...currentObj }
            // console.log(updated);
>>>>>>> dev
            updated.groceryList[itemIndex].acquired = true
            setCurrentObj(updated);

            dispatch({ type: ACTION_TYPES.STATE_UPDATED, payload: { ...currentObj } })
<<<<<<< HEAD
            
            
        } else if (!checkedVal) {
            
            bgDiv.classList.remove("from-gray-800", "to-gray-300");
            bgDiv.classList.add("from-primary", "to-success");
            let updated = { ...currentObj }
            console.log(updated);
=======


        } else if (!checkedVal) {

            bgDiv.classList.remove("from-gray-800", "to-gray-300");
            bgDiv.classList.add("from-primary", "to-success");
            let updated = { ...currentObj }
            // console.log(updated);
>>>>>>> dev
            updated.groceryList[itemIndex].acquired = false
            setCurrentObj(updated);

            dispatch({ type: ACTION_TYPES.STATE_UPDATED, payload: { ...currentObj } })

        }

    }

    useEffect(() => {
<<<<<<< HEAD
        
        setTimeout(() => {
            setInitialLoad(false)
        }, 1000)
 
    }, [state.STATE_UPDATED])

    
=======

        setTimeout(() => {
            setInitialLoad(false)
        }, 1000)




    }, [state.STATE_UPDATED, window.ScreenOrientation.change])


>>>>>>> dev
    let app = useRef();
    useLayoutEffect(() => {
        let x = Math.random().toString().slice(2, 4)

<<<<<<< HEAD
        if (initialLoad) {
            let ctx = gsap.context(() => {
                gsap.fromTo('.itemDiv', 
                    {
                        opacity: 0,
                        x: x,
                    }, 
=======

        if (initialLoad) {
            let ctx = gsap.context(() => {
                gsap.fromTo('.itemDiv',
                    {
                        opacity: 0,
                        x: x,
                    },
>>>>>>> dev
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: .05,
                        ease: 'elastic'
<<<<<<< HEAD
                    })   
            }, app)
            return () => ctx.revert();
        }
        

        // your ref only covers one dom node, this can work if you use the multiple selector
        
    }, [itemsArr])
    useLayoutEffect(() => {
        const arrayOfItems = Array.from(document.querySelectorAll('.itemDiv'))
       
        if (!initialLoad) {
            
=======
                    })
            }, app)
            return () => ctx.revert();
        }


        // your ref only covers one dom node, this can work if you use the multiple selector

    }, [itemsArr])
    useLayoutEffect(() => {
        const arrayOfItems = Array.from(document.querySelectorAll('.itemDiv'))

        if (!initialLoad) {

>>>>>>> dev
                const ctx = gsap.context(() => {
                    gsap.fromTo(arrayOfItems[0], { opacity: 0, duration: 2,  x: -25  }, { opacity: 1, x: 0, ease: 'elastic', duration: 1, })
                }, app)
                ctx.add(() => {
                    gsap.fromTo(arrayOfItems[0], { opacity: 0  }, { opacity: 1, duration: .5 })
                }, app)
                return () => ctx.revert()
        }
<<<<<<< HEAD
        

    }, [itemsArr])
    

    return (
        
        <div ref={app} className="h-full w-full mx-auto gap-5">
            
=======


    }, [itemsArr])


    return (

        <div ref={app} className="h-full w-full mx-auto gap-5">

>>>>>>> dev
            {
                // itemsArr?.length !== 0
            itemsArr?.length !== 0 && itemsArr?.map((i, index) => {
                    return <div id={`${i?.id}`} key={index + i.grocery}
                                className={`
<<<<<<< HEAD
                                    text-neutral items-center font-bold bg-gradient-to-r ${i.acquired ? "from-gray-800 to-gray-300" : "from-primary to-success"}  w-7/8 mx-auto flex p-5 m-2 rounded-sm itemDiv`}
                                    >{i.grocery}
                                    <div className="flex justify-end ml-auto items-center">
                                        <button 
=======
                                     items-center font-bold bg-gradient-to-r ${i.acquired ? "from-gray-800 to-gray-300 text-slate-300" : "from-primary to-success text-neutral"}  w-7/8 mx-auto flex flex-wrap p-5 m-2 rounded-sm itemDiv`}
                                    ><p className="break-words overflow-x-hidden">{i?.grocery}</p>
                                    <div className="flex justify-end ml-auto items-center">
                                        <button
>>>>>>> dev
                                            onClick={handleRemove}
                                            data-tip="Remove this item"
                                            className=
                                                {`btn btn-accent tooltip btn-sm rounded-1/2 mr-2 font-bold text-xl items-center ${itemsArr[0]?.grocery === 'Please add a grocery item to proceed...' && 'hidden'}`}
                                        >
                                        -</button>
<<<<<<< HEAD
                                        
                                        <input className=
                                            {`checkbox checkbox-primary tooltip-primary tooltip ml-1 ${itemsArr[0]?.grocery === 'Please add a grocery item to proceed...' && 'hidden'}`} 
=======

                                        <input className=
                                            {`checkbox checkbox-primary tooltip-primary tooltip ml-1 ${itemsArr[0]?.grocery === 'Please add a grocery item to proceed...' && 'hidden'}`}
>>>>>>> dev
                                            type="checkbox"
                                            onChange={handleChange}
                                            value={i.acquired}
                                            checked={i.acquired}
                                            data-tip="Check this off your list"
                                        />
                                    </div>
                            </div>
                })
<<<<<<< HEAD
                
            } 
            
        </div>
        
=======

            }

        </div>

>>>>>>> dev
    )
}