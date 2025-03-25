import React from "react";
import { Navigate } from "react-router-dom";
import api from "../axiosapi";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await api.get("auth/account"); // Backend route secured with protectRoute middleware
        console.log({ res });

        if (res.status === 200) setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/loginpage" />;
};

export default ProtectedRoute;
