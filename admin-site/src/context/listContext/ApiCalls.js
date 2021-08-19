import { TYPES } from "./ListActions";
import axios from "axios"
export const getLists = async (dispatch) => {
    dispatch({ type: TYPES.GET_LISTS_START });
    try {
        // Ex. Custom URL: http://localhost:5000/lists/?type=movie&genre=Comedy
        const response = await axios.get("https://api-netflix-app.herokuapp.com/lists/", {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.GET_LISTS_SUCCESS, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.GET_LISTS_FAILURE })
    }
}

 export const deleteList = async (id, dispatch) => {
    dispatch({ type: TYPES.DELETE_LISTS_START })
    try {
        await axios.delete(`https://api-netflix-app.herokuapp.com/lists/${id}`, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.DELETE_LISTS_SUCCESS, payload: id })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.DELETE_LISTS_FAILURE })
    }
}
 export const createList = async (list, dispatch) => {
    dispatch({ type: TYPES.UPLOAD_LIST_START })
    try {
        const response = await axios.post(`https://api-netflix-app.herokuapp.com/lists/`, list, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.UPLOAD_LIST_SUCCESS, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.UPLOAD_LIST_FAILURE })
    }
}
export const updateList = async (list, dispatch) => {
    dispatch({ type: TYPES.UPDATE_LIST_START })
    try {
        // request responses with the updated object (likely this list param)
        const response = await axios.put(`https://api-netflix-app.herokuapp.com/lists/${list._id}`, list, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.UPDATE_LIST_SUCCESS, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.UPDATE_LIST_FAILURE })
    }
}
