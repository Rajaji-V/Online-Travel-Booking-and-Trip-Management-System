import React, { createContext, useState, useContext, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("userInfo");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            return null;
        }
    });

    const login = async (email, password) => {
        const { data } = await API.post("/users/login", { email, password });
        setUser(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await API.post("/users/register", { name, email, password });
        setUser(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
    };

    const toggleFavorite = async (tripId) => {
        if (!user) return;
        try {
            const { data } = await API.post("/users/favorites", { tripId });
            const updatedUser = { ...user, favorites: data };
            setUser(updatedUser);
            localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Error toggling favorite", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userInfo");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
