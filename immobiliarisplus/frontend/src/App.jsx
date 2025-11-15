import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appRoutes from "./routes/AppRoutes";

import { AuthContextProvider } from "./providers/AuthContextProvider";

function App() {
  const routes = createBrowserRouter(appRoutes);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </>
  );
}

export default App;
