import axios from "axios";
import { TYPES } from "./AuthActions";

export const register = async (user, dispatch) => {
    dispatch({ type: TYPES.REGISTER_START });
    try {
        const res = await axios.post("https://api-netflix-app.herokuapp.com/register", user)
        // res.data.isAdmin && 
        dispatch({ type: TYPES.REGISTER_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.REGISTER_FAILURE });
    }
}
export const login = async (user, dispatch) => {
    dispatch({ type: TYPES.LOGIN_START });
    // Here could set a "user" object at localSotage, but that functionaility is in AuthContext file
    try {
        const res = await axios.post("https://api-netflix-app.herokuapp.com/login", user) // Return an User Object with JWT key and set 'authtoken' (front) prop at Headers (Back)
        // res.data.isAdmin && 
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.LOGIN_FAILURE });
    }
}
export const logOut = async (dispatch) => {
    localStorage.removeItem("user");
    try {
        dispatch({ type: TYPES.LOGIN_OUT });

    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.LOGIN_FAILURE });
    }
}
