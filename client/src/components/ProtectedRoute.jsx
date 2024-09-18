import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios"; // or your preferred HTTP client
import customFetch from "../utils/customFetch";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state
  const location = useLocation();

  useEffect(() => {
    // Function to check authentication
    const checkAuth = async () => {
      try {
        // Replace with your API endpoint for checking authentication
        const response = await customFetch.get("/auth/isAuthenticated");
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication", error);
        setIsAuthenticated(false); // or handle errors as needed
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // You can render a loading spinner or some placeholder while checking authentication
    return <Loader />;
  }

  if (!isAuthenticated) {
    // Redirect to login and store the current location for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
