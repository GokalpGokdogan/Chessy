import { createContext, useEffect, useReducer } from "react";
import {jwtDecode} from 'jwt-decode';

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export const UserContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(userReducer, {user: null});

    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user) {
            const decodedUser = JSON.parse(user);
            const decodedToken = jwtDecode(decodedUser.token);
            const currentTime = Date.now().valueOf() / 1000;

            if (decodedToken.exp < currentTime) {
                dispatch({type: 'LOGOUT'});
            } else {
                dispatch({type: 'LOGIN', payload: decodedUser});
            }
        }
    }, [])

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}