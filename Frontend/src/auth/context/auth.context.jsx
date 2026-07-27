//THis File lies under state layer which helps to store the logged-in user data and manage loading while an api is called.
//It allows you to share user data across your entire app without passing variables manually from parent to child components.

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(); //The Storage Box

export const AuthProvider = ({ children }) => {
  //This activates the storage across your whole website so every page can share the data.
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  return <AuthContext.Provider value={{ user, setUser, token, setToken, loading, setLoading }}>{children}</AuthContext.Provider>;
};
