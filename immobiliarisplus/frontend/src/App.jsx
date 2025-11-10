import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appRoutes from "./routes/AppRoutes";

function App() {
  const routes = createBrowserRouter(appRoutes);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
