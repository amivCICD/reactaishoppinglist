import { useEffect, useState } from "react"

export const useRetrieveKeys = (key) => {
    let [keys, setKeys] = useState(key)
    console.log('use Retrieve Keys!');
    useEffect(() => {}, [keys])
    return [keys, setKeys]
    
}