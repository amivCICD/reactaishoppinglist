
const starterId = Math.random().toString().slice(2);
const randomId = Math.random().toString().slice(2);


export const INITIAL_STATE = {
    id: starterId,
    primary: true,
    name: '',
    groceryList: [{ grocery: 'Please add a grocery item to proceed...', id: randomId, acquired: false }],
}

 // ^ put -  <post: null> ?

export const postReducer = (state, action) => { // current state, action updates state
    switch (action.type) {
        case 'FETCH_START':
            return {
                loading: true,
                error: false,
                post: [],
                updated: false
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                post: [action.payload]
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                error: true,
                post: [],
                updated: false
            }
        case "FETCH_REMOVE":
            return {
                ...state,
                loading: true,
                updated: false
            } 
        // case "FETCH_REMOVE":
        // return {
        //     post: [],
        //     loading: true,
        //     updated: false
        // } // modified
        case "STATE_UPDATED":
            return {
                ...state,
                error: false,
                updated: false
            }
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}