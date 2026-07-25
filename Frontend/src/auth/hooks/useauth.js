//This is hook layer that manages state and api layers of react.
import { AuthContext } from "../context/auth.context.jsx"; //state layer imported
import { useContext } from "react";
import { login, logout, register, getUser } from "../services/auth.api.js"; //Api layer imported

export const useauth = () => {
  //AuthContext is like a central storage box for your app
  //useContext command opens that box, grabs all the data inside it, and saves it into a single variable named context
  const context = useContext(AuthContext);

  const { user, setUser,token, setToken, loading, setLoading } = context; //This unpacks the context variable so you need not use context.login /logout etc .

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password }); //Register api call from react api layer
      setUser(data.user);
      setToken(data.accessToken); // Save the token into memory!
      return { success: true };
    } catch (errorMessage) {
      return { success: false, message: errorMessage }; //// Returns the backend error text
    } finally {
      setLoading(false);
    }
  };

  //Data here is the logged-in user's profile data returned from the server:
  // return res.status(200).json({
  // message: "Logged in successfully!",
  // user: {
  //   username: user.username,
  //   email: user.email,
  // },
  // accessToken,

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password }); //Login api is called from react api layer [auth.api.js]
      setUser(data.user);
      setToken(data.accessToken); // Save the token into memory! //Receives the response from the backend via [auth.api.js]
      return { success: true };
    } catch (errorMessage) {
      return { success: false, message: errorMessage }; //// Returns the backend error text
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
    await logout(token); 
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
