//Imports <RouterProvider>, a special React component whose only job is to handle and display routes.
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./auth/context/auth.context.jsx";
import { UPFE_DataProvider } from "./ui/context/UPFE_Data.context.jsx";

function App() {
  return (
    //renders whichever page matches the browser's current URL using <RouterProvider>.

    <AuthProvider>
      <UPFE_DataProvider>
        <RouterProvider router={router} />
      </UPFE_DataProvider>
    </AuthProvider>
  );
}

export default App;
