import axios from "axios";
import { TYPES } from "./UserActions";

export const getUsers = async (dispatch) => {
    dispatch({ type: TYPES.GET_USERS_START });
    try {
        const res = await axios.get("https://api-netflix-app.herokuapp.com/users/", {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        // res.data.isAdmin && 
        dispatch({ type: TYPES.GET_USERS_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.GET_USERS_FAILURE });
    }
}
export const uploadUserWithAuth = async (data, dispatch) => {
    dispatch({ type: TYPES.UPLOAD_USER_START });
    try {
        const res = await axios.post("https://api-netflix-app.herokuapp.com/register", data, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        // res.data.isAdmin && 
        dispatch({ type: TYPES.UPLOAD_USER_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.UPLOAD_USER_FAILURE });
    }
}
export const updateUser = async (data, dispatch) => {
    dispatch({ type: TYPES.UPDATE_USER_START });
    try {
        const res = await axios.put(`https://api-netflix-app.herokuapp.com/users/${data._id}`, data, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        console.log("res.data", res.data)
        // res.data.isAdmin && 
        dispatch({ type: TYPES.UPDATE_USER_SUCCESS, payload: res.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.UPDATE_USER_FAILURE });
    }
}
export const deleteUser = async (dataId, dispatch) => {
    dispatch({ type: TYPES.DELETE_USER_START });
    try {
        await axios.delete(`https://api-netflix-app.herokuapp.com/users/${dataId}`, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        // res.data.isAdmin && 
        dispatch({ type: TYPES.DELETE_USER_SUCCESS, payload: dataId })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.DELETE_USER_FAILURE });
    }
}

