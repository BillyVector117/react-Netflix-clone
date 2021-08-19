import { TYPES } from "./AuthActions"
const AuthReducer = (state, action) => {
    switch (action.type) {
        case TYPES.LOGIN_START:
            return { user: null, fetching: true, error: false }
        case TYPES.LOGIN_SUCCESS:
            return { user: action.payload, fetching: false, error: false }
        case TYPES.LOGIN_FAILURE:
            return { user: null, fetching: false, error: true }
        case TYPES.REGISTER_START:
            return { user: null, fetching: true, error: false }
        case TYPES.REGISTER_SUCCESS:
            return { user: null, fetching: false, error: false }
        case TYPES.REGISTER_FAILURE:
            return { user: null, fetching: false, error: true }
        case TYPES.LOGIN_OUT:
            return { user: null, fetching: false, error: false }
        default:
            return { ...state }
    }
}

export default AuthReducer
