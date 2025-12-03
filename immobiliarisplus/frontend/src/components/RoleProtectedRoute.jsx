import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function RoleProtectedRoute({ allowedRoles }) {
  const { isLoggedIn, userType } = useAuth();

  // Not logged in → redirect
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Role NOT allowed → redirect
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  // Access allowed → render sub-routes
  return <Outlet />;
}
