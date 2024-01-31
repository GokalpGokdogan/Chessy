import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; 

export const useLogout = () => {

    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useContext(UserContext);
    
    const logout = () => {

        setIsLoading(true);
        localStorage.removeItem('user');
        
        dispatch({type: 'LOGOUT'})
        
        setIsLoading(false);
    }

    return {logout, isLoading}
}