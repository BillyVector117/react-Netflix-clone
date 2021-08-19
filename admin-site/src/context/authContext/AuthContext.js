import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const initialState = {
    // String to JSON
    user: JSON.parse(localStorage.getItem("user")) || null,
    fetching: false,
    error: false,
}
export const AuthContext = createContext(initialState)
// Context Wraper
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user)) // JSON to String
    }, [state.user])
    return (
        <AuthContext.Provider value={{ user: state.user, fetching: state.fetching, error: state.error, dispatch }} >
            {children}
        </AuthContext.Provider>
    )
}
