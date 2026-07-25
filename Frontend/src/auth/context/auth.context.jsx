//THis File lies under state layer which helps to store the logged-in user data and manage loading while an api is called.
//It allows you to share user data across your entire app without passing variables manually from parent to child components.

import { createContext, useState,useEffect } from "react";
import {getUser} from "../services/auth.api"

export const AuthContext = createContext(); //The Storage Box

export const AuthProvider = ({ children }) => {  //This activates the storage across your whole website so every page can share the data.
  const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  //Restrict state loss after reload of page 
  useEffect(() => {
  const getAndSetUser = async () => {
    // Pass your stored token string into the function!
    const data = await getUser(token);  
    //Token send to auth.api.js which clips it to the HTTP header and fetches your profile from the backend server.
    if (data && data.user) {  //If the server replies with valid user details
      setUser(data.user); //Accepts the data from auth.api.js getUser() api which fetched user details from backend server.
    }
    setLoading(false);
  };
  getAndSetUser();
}, [token]);

  return <AuthContext.Provider value={{ user, setUser,token, setToken, loading, setLoading }}>{children}</AuthContext.Provider>;
};
 