import { TYPES } from "./MovieActions"
const MovieReducer = (state, action) => {
    switch (action.type) {
        case TYPES.GET_MOVIES_START:
            return { movies: [], fetching: true, error: false }
        case TYPES.GET_MOVIES_SUCCESS:
            return { movies: action.payload, fetching: false, error: false }
        case TYPES.GET_MOVIES_FAILURE:
            return { movies: null, fetching: false, error: true }
        case TYPES.DELETE_MOVIE_START:
            return { ...state, fetching: true, error: false }
        case TYPES.DELETE_MOVIE_SUCCESS:
            return { movies: state.movies.filter((item) => item._id !== action.payload), fetching: false, error: false }
        case TYPES.DELETE_MOVIE_FAILURE:
            return { ...state, fetching: false, error: true }
        case TYPES.UPLOAD_MOVIE_START:
            return { ...state, fetching: true, error: false }
        case TYPES.UPLOAD_MOVIE_SUCCESS:
            return { movies: [...state.movies, action.payload], fetching: false, error: false }
        case TYPES.UPLOAD_MOVIE_FAILURE:
            return { ...state, fetching: false, error: true }
        case TYPES.UPDATE_MOVIE_START:
            return { ...state, fetching: true, error: false }
        case TYPES.UPDATE_MOVIE_SUCCESS:
            return { movies: state.movies.map((movie) =>  movie._id === action.payload._id ? action.payload : movie ), fetching: false, error: false }
        case TYPES.UPDATE_MOVIE_FAILURE:
            return { ...state, fetching: false, error: true }
        default:
            return { ...state }
    }
}
export default MovieReducer
