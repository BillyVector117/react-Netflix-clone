import { createContext, useReducer } from "react"
import MovieReducer from "./MovieReducer"
const initialState = {
    movies: [],
    fetching: false,
    error: false,
}
export const MovieContext = createContext(initialState)
// Context Wraper
export const MovieContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MovieReducer, initialState)
    return (
        <MovieContext.Provider value={{ movies: state.movies, fetching: state.fetching, error: state.error, dispatch }} >
            {children}
        </MovieContext.Provider>
    )
}
