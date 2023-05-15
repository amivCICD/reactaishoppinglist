import { useState, useEffect } from "react"
import { retrieveKeys } from "./saveRetrieve"



export const useLocalStorage = (key, initialValue) => {
    // const [state, dispatch] = useReducer(postReducer, INITIAL_STATE)
    // console.log(key);

    // this thing should fetch the key you need, not have it implemented?
    const keys = retrieveKeys();
    const [keyz, setKeyz] = useState(keys)

    if (!keys) {

    }

    const [storedValue, setStoredValue] = useState(() => { // this is doing MORE things TO set the state,but u can still just set the state
        try {
            const item = window.localStorage.getObj(key)
            return item ? item : initialValue

        } catch (error) {
            console.log('useLocalStorage error', error)
            return initialValue
        }
    })
    useEffect(() => {
        try {
            window.localStorage.setObj(key, storedValue)
        } catch (error) {
            console.log(error);
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}