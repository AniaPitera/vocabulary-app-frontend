import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    try {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      navigate("/home");
    } catch (error) {
      console.error("Invalid token:", error);
      setAuthToken(null);
      setUser(null);
      localStorage.removeItem("token");
    }
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
