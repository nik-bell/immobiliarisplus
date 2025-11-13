import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./providers/AuthProvider";

function App() {
  const routes = createBrowserRouter(appRoutes);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </>
  );
}

export default App;
