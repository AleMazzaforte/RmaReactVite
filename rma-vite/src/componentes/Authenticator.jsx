import {React, createContext, useEffect, useState} from 'react'


export const AuthContext = createContext();

export const Authenticator = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => { 
        const checkAuth = async () => { 
            const token = localStorage.getItem('token'); 
            if (token) { 
                setIsAuthenticated(true); 
            } 
            else { 
                setIsAuthenticated(false); 
            } 
        }; 
        checkAuth(); 
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    )
}
