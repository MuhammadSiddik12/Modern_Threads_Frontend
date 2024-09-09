import React, { createContext, useState, useEffect, useMemo } from "react";
import AuthService from "../services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		AuthService.isAuthenticated()
	);

	useEffect(() => {
		// Update authentication status on component mount
		setIsAuthenticated(AuthService.isAuthenticated());
	}, []);

	const login = (userData) => {
		try {
			AuthService.login(userData);
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Login failed:", error);
			toast.error("Login failed. Please try again."); // Show error toast
		}
	};

	const logout = () => {
		try {
			AuthService.logout();
			setIsAuthenticated(false);
		} catch (error) {
			console.error("Logout failed:", error);
			toast.error("Logout failed. Please try again."); // Show error toast
		}
	};

	const contextValue = useMemo(
		() => ({ isAuthenticated, login, logout }),
		[isAuthenticated]
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
