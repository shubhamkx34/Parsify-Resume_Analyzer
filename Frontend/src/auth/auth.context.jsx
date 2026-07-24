//THis File lies under state layer which helps to store the logged-in user data and manage loading while an api is called.
//It allows you to share user data across your entire app without passing variables manually from parent to child components.

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

  return <AuthContext.provider value={{ user, setuser, loading, setloading }}>{children}</AuthContext.provider>;
};
