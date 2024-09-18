import { createContext, useContext, useEffect, useState } from "react";
import { useGetElements } from "../utils/crud";
import customFetch from "../utils/customFetch";
import { useAppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getNotfication } from "../utils/notfications";

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { queryClient } = useAppContext();
  const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    data: user = [],
    isFetching: isFetching,
    isLoading: isLoading,
    isSuccess: isSuccess,
  } = useGetElements({ query: ["current-user"] });

  const logout = async () => {
    await customFetch.get("/auth/logout");
    navigate("/");

    queryClient.invalidateQueries();
    // getNotfication(true, 'تم تسجيل الخروج!')
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
