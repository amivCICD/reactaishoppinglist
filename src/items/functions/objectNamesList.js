function getObjCount() {
    let arr = [];
    let len = localStorage.length

    // for (let i=0; i<len; i+=1) {
    //     if (localStorage.key(i) !== 'replaced_stats') {
    //         arr.push(localStorage.key(i))
    //     }
    // } // if there is something else in local storage, e.g. 'clerk-db-jwt' was in there randomly, so if a user has other local storage stuff
    // the error handling is done better here 
    for (let i=0; i<len; i+=1) {
        if (typeof localStorage.key(i) === 'object') {
            arr.push(localStorage.key(i))
        }
    }
    
    return arr;
}
function objNamesList(arrayOfKeys) {
    if (arrayOfKeys.length === 0) return;
    let namesArr = [];
    for (let i=0; i<arrayOfKeys.length; i+=1) {
        namesArr.push(localStorage.getObj(arrayOfKeys[i]))
    }
    
    return namesArr;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~above work in conjunction junction, what's their function()?

function updateObjectPrimary(selectedObj, Boolean) {
    let objCopy = { ...selectedObj }
    objCopy.primary = Boolean;
    let item = localStorage.setObj(objCopy.id, objCopy);
    return item;
}

export {
    getObjCount,
    objNamesList,
    updateObjectPrimary
}

