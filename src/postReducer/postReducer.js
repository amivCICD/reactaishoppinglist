

export const INITIAL_STATE = {
    loading: false,
    post: [],
    error: false
}

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
                post: action.payload
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                error: true,
                post: [],
                updated: false
            }
        // case "FETCH_REMOVE":
        //     return {
        //         ...state,
        //         loading: true,
        //         updated: false
        //     }
        case "STATE_UPDATED":
            return {
                ...state,
                error: false,
                updated: true
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