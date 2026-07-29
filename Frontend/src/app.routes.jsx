import { createBrowserRouter } from "react-router"//responsible for building your routing configuration.
import Login from "./auth/pages/login.jsx"
import Register from "./auth/pages/register.jsx"
import Protected from "./auth/components/protected.jsx"
import Home from "./ui/home.jsx"
import Features from "./ui/feature.jsx"
import Working from './ui/working.jsx'
import Report from "./ui/report.jsx"

//Creates router object using createBrowserRouter and exports it (so App.jsx can use it). It takes an array [...] of route objects.
export const router = createBrowserRouter([
   { path: "/register", element: <Register />},
   { path: "/login", element: <Login /> },
   { path: "/", element:<Protected><Home /></Protected>},
   {path:"/feature",element:<Protected><Features /></Protected> },
   {path:"/working",element: <Protected><Working /></Protected>},
   {path:"/report",element:<Protected><Report /></Protected> }
])
