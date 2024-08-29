import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "./authService";

const PrivateRoute = ({ children }) => {
	// Check if the user is authenticated
	if (!AuthService.isAuthenticated()) {
		// Redirect to login page if not authenticated
		return <Navigate to="/login" />;
	}

	// Render the protected component if authenticated
	return children;
};

export default PrivateRoute;
