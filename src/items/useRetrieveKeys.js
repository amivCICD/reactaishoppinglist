import { useEffect, useState } from "react"

export const useRetrieveKeys = () => {
    const [listNames, setListNames] = useState(() => {
        function getObjCount() {
            let arr = [];
            let len = localStorage.length

            // for (let i=0; i<len; i+=1) {
            //     if (localStorage.key(i) !== 'replaced_stats' && localStorage.key(i) !== 'clerk-db-jwt') {
            //         arr.push(localStorage.key(i))
            //     }
            // }
            for (let i=0; i<len; i+=1) {
                if (typeof localStorage.key(i) === "object") {
                    arr.push(localStorage.key(i))
                }
            }
            // console.log(arr);
            return arr;
        }
        function objNamesList(arrayOfKeys) {
            if (arrayOfKeys.length === 0) return;
            let namesArr = [];
            for (let i=0; i<arrayOfKeys.length; i+=1) {
                namesArr.push(localStorage.getObj(arrayOfKeys[i]))
            }
            // console.log(namesArr);
            return namesArr;
        }
        
        
        try {
            return objNamesList(getObjCount());
        } catch(err) {
            console.log(err);
            return ['whaaa whaaa whaaaaaa']
        }
    })
    // console.log('use Retrieve Keys!');
    useEffect(() => {
        try {
            // console.log(listNames.forEach(i => console.log('i.name: ', i.name)));
        }catch(err){
            console.log(err);
        }
        
    }, [listNames])
    return [listNames, setListNames]
    
}

