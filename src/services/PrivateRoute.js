import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthService from "./AuthService";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
	const location = useLocation();

	// Redirect to login if not authenticated
	if (!AuthService.isAuthenticated()) {
		return <Navigate to={redirectTo} state={{ from: location }} />;
	}

	// Render children if authenticated
	return children;
};

export default PrivateRoute;
