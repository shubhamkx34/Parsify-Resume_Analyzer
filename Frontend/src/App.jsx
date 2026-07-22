//Imports <RouterProvider>, a special React component whose only job is to handle and display routes.
import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"

function App() {
  return (
//renders whichever page matches the browser's current URL using <RouterProvider>.  
    <RouterProvider router = {router}/> 
  )
}

export default App

