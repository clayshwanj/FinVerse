import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../axiosapi";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await api.get("auth/account"); // Backend route secured with protectRoute middleware
        console.log({ res });

        if (res.status === 200) setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/loginpage" />;

  return <Outlet />; // Render the child routes if authenticated
};

export default ProtectedRoute;
