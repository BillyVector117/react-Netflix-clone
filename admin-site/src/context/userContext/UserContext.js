import { createContext, useReducer } from "react"
import UserReducer from "./UserReducer"

const initialState = {
    users: [],
    fetching: false,
    error: false,
}
export const UserContext = createContext(initialState)
// Context Wraper
export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)
    return (
        <UserContext.Provider value={{ users: state.users, fetching: state.fetching, error: state.error, dispatch }} >
            {children}
        </UserContext.Provider>
    )
}
