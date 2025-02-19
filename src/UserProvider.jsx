// user context provider

import React, { useState } from "react";
import userContext from "./userContext";

const UserProvider = ({children}) => {
    const getInitialState = () => {
        const u = sessionStorage.getItem('user');
        return u ? JSON.parse(u) : {};
    }
    
    const [user, setUser] = useState(getInitialState)

    // accepts data object with user information 
    // (will be obtained from login form)
    // updates user and adds to session storage
    const addUser = (data) => {
        setUser(user => (
            {...data}
        ))
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    // for log out, resets user to empty object & removes from session storage
    const clearUser = () => {
        setUser(user => (
            {}
        ));
        sessionStorage.removeItem('user');
    }

    return (
        <userContext.Provider value={{user, addUser, clearUser}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;