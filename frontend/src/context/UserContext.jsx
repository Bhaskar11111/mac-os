import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/me", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};