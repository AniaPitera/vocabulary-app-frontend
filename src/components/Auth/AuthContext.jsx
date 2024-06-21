import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(authToken ? jwtDecode(authToken) : null);

  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setUser(jwtDecode(token));
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
