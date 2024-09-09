import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthService from "./AuthService";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
	const location = useLocation();

	// Check if the user is authenticated
	if (!AuthService.isAuthenticated()) {
		// Redirect to login page with the current location saved
		return <Navigate to={redirectTo} state={{ from: location }} />;
	}

	// Render the protected component if authenticated
	return children;
};

export default PrivateRoute;
