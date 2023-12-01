
function saveList(listName, itemsArr) {
    let id = itemsArr.id;
    
    let savedListID = Math.random().toString().slice(2);
    let copy = itemsArr?.slice();
    let savedShoppingList = { name: listName, id: id === undefined ? savedListID : id, primary: true, groceryList: [...copy]}
    // let savedShoppingList = { name: listName, id: id === undefined ? savedListID : id, primary: true, groceryList: [...copy]}
    localStorage.setObj(`${savedListID}`, savedShoppingList)
    // console.log('localStorage: ', localStorage);
    // console.log('localStorage.key(1): ', localStorage.key(1));
}

function retrieveKeys() {
    let localStorageLength = localStorage.length;
    let keys = [];
    // for (let i=0; i < localStorageLength; i+=1) {
    //     if (localStorage.key(i) !== 'replaced_stats' && localStorage.key(i) !== 'clerk-db-jwt') {
    //         keys.push(localStorage.key(i))
    //     }
    // }
    for (let i=0; i < localStorageLength; i+=1) {
        if (localStorage.key(i).search(/[0-9]/g) !== -1 && typeof JSON.parse(localStorage.getItem(localStorage.key(i))) === 'object') {
            keys.push(localStorage.key(i))
        }
    }
    return keys;
}

function retrieveLists(keys) {
    let len = keys?.length;
    let arr = [];
    for (let i=0; i < len; i+=1) {
        if(keys.length !== 0 && keys !== undefined && keys !== 'undefined') arr.push(localStorage.getObj(keys[i]))
    }
    return arr;
}

function retrievePrimaryArr(lists) {
    let primaryArr = lists.filter(i => i.primary === true)
    return primaryArr;
}

function retrievePrimaryArrayKey() {
    let keys = [];
    for (let i=0; i < localStorage.length; i+=1) {
        if (localStorage.key(i) !== 'replaced_stats') {
            keys.push(localStorage.key(i))
        }
    }
    return function getListsFromKeys(keys) {
        let len = keys?.length;
        let listsArr = [];
        for (let i=0; i < len; i+=1) {
            if(keys.length !== 0 && keys !== undefined && keys !== 'undefined') listsArr.push(localStorage.getObj(keys[i]))
        }
        return function retrievePrimaryObj(listsArr) {
            let primaryArr = listsArr?.filter(i => i?.primary === true) // so when true isn't on every array, then we good....
            return primaryArr;
        }
    }
}

function deleteList(listId) {
    let list = localStorage.getObj(listId)
    console.log(`List ${list.name ? list.name : 'Unnamed List.'} w/ ID: '${list?.id}' has been deleted.`)
    localStorage.removeItem(listId)
}

export {
    saveList,
    deleteList,
    retrieveKeys,
    retrieveLists,
    retrievePrimaryArr,
    retrievePrimaryArrayKey
}