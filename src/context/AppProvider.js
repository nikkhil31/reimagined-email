import { createContext, useContext, useReducer } from "react"

const AppContext = createContext()



export function useAppcontext() {
    return useContext(AppContext)
}

export const appReducer = (state, action) => {
    switch (action.type) {
        case 'COMPOSE':
            return { ...state, compose: action.payload }
        case 'LIST':
            return { ...state, list: action.payload }
        case 'DETAILS':
            return { ...state, details: action.payload }
        case 'LOGIN':
            return { ...state, user: action.payload }
        default:
            return state
    }
}


export const AppContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, {
        list: [],
        details: {
            id: null,
            subject: '',
            messages: []
        },
        compose: 1
    })



    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}