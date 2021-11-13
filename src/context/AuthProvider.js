import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase';

//////////// context to provide the function return of useFirebase hoook to every component 

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const allContexts = useFirebase();
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;