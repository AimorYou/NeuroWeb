import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("hello"));

    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Autherization: "Bearer " + token,
                },
            };

//             const response = await fetch("http://0.0.0.0:8888/api/v1/users/me", requestOptions);
//             if (!response.ok) {
//                 setToken(null);
//             }
//             localStorage.setItem("hello", token);
        };  
        // fetchUser();
    }, [token]);
    
    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )

};