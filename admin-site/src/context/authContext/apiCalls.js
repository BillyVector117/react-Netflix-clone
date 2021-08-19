import axios from "axios";
import { TYPES } from "./AuthActions";

export const register = async (user, dispatch) => {
    dispatch({ type: TYPES.LOGIN_START });
    try {
        const res = await axios.post("https://api-netflix-app.herokuapp.com/register", user)
        // res.data.isAdmin && 
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.LOGIN_FAILURE });
    }
}
export const login = async (user, dispatch) => {
    dispatch({ type: TYPES.LOGIN_START });
    try {
        const res = await axios.post("https://api-netflix-app.herokuapp.com/login", user)
        // res.data.isAdmin && 
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.LOGIN_FAILURE });
    }
}
export const logOut = async (dispatch) => {
    try {
        dispatch({ type: TYPES.LOGIN_OUT });

    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.LOGIN_FAILURE });
    }
}
