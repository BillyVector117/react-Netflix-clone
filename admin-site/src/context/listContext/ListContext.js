import { createContext, useReducer } from "react"
import ListReducer from "./ListReducer"
const initialState = {
    lists: [],
    fetching: false,
    error: false,
}
export const ListContext = createContext(initialState)
// Context Wraper
export const ListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ListReducer, initialState)
    return (
        <ListContext.Provider value={{ lists: state.lists, fetching: state.fetching, error: state.error, dispatch }} >
            {children}
        </ListContext.Provider>
    )
}
