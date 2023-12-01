import { useState, useEffect } from "react"
import { retrieveKeys, retrieveLists, retrievePrimaryArrayKey } from "./saveRetrieve"




export const useLocalStorage = (key, initialValue) => {
    // const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    // console.log(key);
    // let pak = retrievePrimaryArrayKey()(retrieveKeys())(retrieveLists(retrieveKeys()))
    // pak.length > 1 ? pak = pak.slice(1) : pak
    // console.log('pak ', pak, pak.length);
    // console.log('key ', key);
    let primaryArrKey = key[0]?.id
    // this thing should fetch the key you need, not have it implemented?
    
    // console.log(primaryArrKey);
  
    const [storedValue, setStoredValue] = useState(() => { // this is doing MORE things TO set the state,but u can still just set the state
        try {
            const item = window.localStorage.getObj(primaryArrKey)

            // console.log('item fired', item);
           
            return item ? item : initialValue
            // return primaryArrKey?.length > 0 ? item : initialValue

        } catch (error) {
            console.log('useLocalStorage error ', error)
            return initialValue
        }
    })
    useEffect(() => {
        const item = window.localStorage.getObj(primaryArrKey)
        // console.log(item);
        try {
            if(item) {
                window.localStorage.setObj(primaryArrKey, storedValue)
            }
        } catch (error) {
            console.log(error);
        }
    }, [primaryArrKey, storedValue])

    return [storedValue, setStoredValue]
}