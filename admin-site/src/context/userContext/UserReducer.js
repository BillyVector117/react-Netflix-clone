import { TYPES } from "./UserActions"
const UserReducer = (state, action) => {
    switch (action.type) {
        case TYPES.GET_USERS_START:
            return { users: [], fetching: true, error: false }
        case TYPES.GET_USERS_SUCCESS:
            return { users: action.payload, fetching: false, error: false }
        case TYPES.GET_USERS_FAILURE:
            return { users: null, fetching: false, error: true }
        case TYPES.UPLOAD_USER_START:
            return { ...state, fetching: true, error: false }
        case TYPES.UPLOAD_USER_SUCCESS:
            return { users: [...state.users, action.payload], fetching: false, error: false }
        case TYPES.UPLOAD_USER_FAILURE:
            return { ...state, fetching: false, error: true }
        case TYPES.UPDATE_USER_START:
            return { ...state, fetching: true, error: false }
        case TYPES.UPDATE_USER_SUCCESS:
            return { users: state.users.map((user) => user._id === action.payload._id ? action.payload : user), fetching: false, error: false }
        case TYPES.UPDATE_USER_FAILURE:
            return { ...state, fetching: false, error: true }
        case TYPES.DELETE_USER_START:
            return { ...state, fetching: true, error: false }
        case TYPES.DELETE_USER_SUCCESS:
            return { users: state.users.filter((user) => user._id !== action.payload), fetching: false, error: false }
        case TYPES.DELETE_USER_FAILURE:
            return { ...state, fetching: false, error: true }
        default:
            return { ...state }
    }
}
export default UserReducer
