import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
