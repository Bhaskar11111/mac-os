import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/authApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        getCurrentUser()
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);

    const register = async (payload) => {
        setLoading(true);
        setError("");

        try {
            const data = await registerUser(payload);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return data.user;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (payload) => {
        setLoading(true);
        setError("");

        try {
            const data = await loginUser(payload);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return data.user;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await logoutUser();
        localStorage.removeItem("token");
        setUser(null);
        window.history.pushState({}, "", "/login");
        window.dispatchEvent(new PopStateEvent("popstate"));
    };

    const value = useMemo(
        () => ({ user, setUser, loading, error, register, login, logout }),
        [user, loading, error]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
