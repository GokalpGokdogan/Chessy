import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; 


export const useLogin = () => { 

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useContext(UserContext);

    const login = async (mail, password) => {

        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mail,password})
        });

        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok) {

            //save the user in localStorage
            localStorage.setItem('user', JSON.stringify(json/*.user*/));

            dispatch({type: 'LOGIN', payload: json/*.user*/});

            setIsLoading(false);

        }
    }

    return {login, error, isLoading};

}