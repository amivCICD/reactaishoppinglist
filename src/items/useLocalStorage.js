import { useState, useEffect } from "react"



export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getObj(key)
            return item ? item : initialValue

        } catch (error) {
            console.log(error)
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