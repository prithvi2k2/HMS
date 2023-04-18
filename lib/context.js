import { useState, useEffect, createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const defaultState = {
        loggedin: false,
        username: null,
        role: null,
    }

    const [context, setContext] = useState(defaultState)

    // Get context from cache if available
    useEffect(() => {
        const state = JSON.parse(localStorage.getItem('state'))
        if (state) setContext(state);
    }, [])

    // Set context on change in localstorage
    const updateContext = async (updates) => {
        let newContext = { ...context, ...updates }
        setContext(newContext)
        if (typeof window !== 'undefined') localStorage.setItem('state', JSON.stringify(newContext));
    }

    // Reset context to default on logout
    const resetContext = () => {
        setContext(defaultState)
    }
    return (
        <AppContext.Provider value={{ context, updateContext, resetContext }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}