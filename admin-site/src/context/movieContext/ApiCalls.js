import { TYPES } from "./MovieActions";
import axios from "axios"
export const getMovies = async (dispatch) => {
    dispatch({ type: TYPES.GET_MOVIES_START });
    try {
        const response = await axios.get("https://api-netflix-app.herokuapp.com/movies&series", {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.GET_MOVIES_SUCCESS, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.GET_MOVIES_FAILURE })
    }
}

export const deleteMovie = async (id, dispatch) => {
    dispatch({ type: TYPES.DELETE_MOVIE_START })
    try {
        await axios.delete(`https://api-netflix-app.herokuapp.com/movie&series/${id}`, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.DELETE_MOVIE_SUCCESS, payload: id })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.DELETE_MOVIE_FAILURE })
    }
}
export const createMovie = async (movie, dispatch) => {
    dispatch({ type: TYPES.UPLOAD_MOVIE_START })
    try {
        const response = await axios.post(`https://api-netflix-app.herokuapp.com/movie&series`, movie, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.UPLOAD_MOVIE_SUCCESS, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.UPLOAD_MOVIE_FAILURE })
    }
}
export const updateMovie = async (movie, dispatch) => {
    dispatch({ type: TYPES.UPDATE_MOVIE_START })
    try {
        // request responses with the updated object (likely movie param)
        const response = await axios.put(`https://api-netflix-app.herokuapp.com/movie&series/${movie._id}`, movie, {
            headers: { authtoken: "Bearer " + JSON.parse(localStorage.getItem("user")).myToken }
        })
        dispatch({ type: TYPES.UPDATE_MOVIE_SUCCESS, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: TYPES.UPDATE_MOVIE_FAILURE })
    }
}
