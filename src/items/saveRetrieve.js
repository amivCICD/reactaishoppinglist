
function saveList(listName) {
    let savedListID = Math.random().toString().slice(2);
    let copy = itemsArr?.slice();
    let savedShoppingList = { name: listName, id: savedListID, grocery: [...copy]}
    localStorage.setObj(`${savedListID}`, savedShoppingList)
    // console.log('localStorage: ', localStorage);
    // console.log('localStorage.key(1): ', localStorage.key(1));
}

function retrieveKeys() {
    let localStorageLength = localStorage.length;
    let keys = [];

    for (let i=0; i < localStorageLength; i+=1) {
        keys.push(localStorage.key(i))
    }
    
    return keys;
}

function retrieveLists(keys) {
    let len = keys.length;
    let arr = [];
    for (let i=0; i < len; i+=1) {
        arr.push(localStorage.getObj(keys[i]))
    }
    
    return arr;
}

function deleteList(listId) {
    let list = localStorage.getObj(listId)
    console.log(`List ${list.name} w/ ${list.id} has been deleted.`)
    localStorage.removeItem(listId)
}

export {
    saveList,
    deleteList,
    retrieveKeys,
    retrieveLists
}