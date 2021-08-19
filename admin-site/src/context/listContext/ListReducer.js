import { TYPES } from "./ListActions"
const ListReducer = (state, action) => {
    switch (action.type) {
        case TYPES.GET_LISTS_START:
            return { lists: [], fetching: true, error: false }
        case TYPES.GET_LISTS_SUCCESS:
            return { lists: action.payload, fetching: false, error: false }
        case TYPES.GET_LISTS_FAILURE:
            return { lists: null, fetching: false, error: true }
        case TYPES.DELETE_LISTS_START:
            return { ...state, fetching: true, error: false }
        case TYPES.DELETE_LISTS_SUCCESS:
            return { lists: state.lists.filter((item) => item._id !== action.payload), fetching: false, error: false }
        case TYPES.DELETE_LISTS_FAILURE:
            return { ...state, fetching: false, error: true }
        case TYPES.UPLOAD_LIST_START:
            return { ...state, fetching: true, error: false }
        case TYPES.UPLOAD_LIST_SUCCESS:
            return { lists: [...state.lists, action.payload], fetching: false, error: false }
        case TYPES.UPLOAD_LIST_FAILURE:
            return { ...state, fetching: false, error: true }
        case TYPES.UPDATE_LIST_START:
            return { ...state, fetching: true, error: false }
        case TYPES.UPDATE_LIST_SUCCESS:
            return { lists: state.lists.map((list) =>  list._id === action.payload._id ? action.payload : list ), fetching: false, error: false }
        case TYPES.UPDATE_LIST_FAILURE:
            return { ...state, fetching: false, error: true }
        default:
            return { ...state }
    }
}
export default ListReducer
