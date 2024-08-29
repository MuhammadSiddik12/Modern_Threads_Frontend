import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		AuthService.isAuthenticated()
	);

	useEffect(() => {
		setIsAuthenticated(AuthService.isAuthenticated());
	}, []);

	const login = (userData) => {
		AuthService.login(userData);
		setIsAuthenticated(true);
	};

	const logout = () => {
		AuthService.logout();
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
