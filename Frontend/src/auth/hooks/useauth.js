// This hook layer manages state consumption, side effects, and API calls.
import { AuthContext } from "../context/auth.context.jsx"; 
import { useContext, useEffect } from "react";
import { login, logout, register, getUser } from "../services/auth.api.js"; 

export const useauth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, token, setToken, loading, setLoading } = context; 

  //This useEffect acts as an automatic background checker that restores your logged-in session whenever you refresh the web page, preventing the app from kicking you out to the login screen.
  useEffect(() => {
    const getAndSetUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      if (!user) {
        try {
          const data = await getUser(token);  
          if (data && data.user) {  
            setUser(data.user); 
          }
        } catch (err) {
          console.error("Failed to fetch user on reload:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [token, user, setUser, setLoading]);

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password }); 
      setUser(data.user);
      localStorage.setItem("token", data.accessToken); // Save to browser storage
      setToken(data.accessToken); 
      return { success: true };
    } catch (errorMessage) {
      return { success: false, message: errorMessage }; 
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password }); 
      setUser(data.user);
      localStorage.setItem("token", data.accessToken); // Save to browser storage
      setToken(data.accessToken); 
      return { success: true };
    } catch (errorMessage) {
      return { success: false, message: errorMessage }; 
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); 
      localStorage.removeItem("token"); // Clear from browser storage
      setUser(null); 
      setToken(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleLogout, handleRegister };
};