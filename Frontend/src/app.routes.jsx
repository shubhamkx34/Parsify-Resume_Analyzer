//This code is used for routing as this is the modern standard for React Router

//createBrowserRouter function from React Router, is responsible for building your routing configuration.
import { createBrowserRouter } from "react-router"
import Login from "./auth/pages/login.jsx"
import Register from "./auth/pages/register.jsx"
import Home from "./auth/pages/home/home.jsx"
import Protected from "./auth/components/protected.jsx"
import Features from "./auth/pages/home/feature.jsx"

//Creates router object using createBrowserRouter and exports it (so App.jsx can use it). It takes an array [...] of route objects.
export const router = createBrowserRouter([
   { path: "/register", element: <Register />},
  { path: "/login", element: <Login /> },
  { path: "/", element:<Protected><Home /></Protected>},
{path:"/feature",element: <Features />}
])
