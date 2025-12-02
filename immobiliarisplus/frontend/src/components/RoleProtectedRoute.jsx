import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function RoleProtectedRoute({ allowedRoles }) {
  const { isLoggedIn, userType } = useAuth();

  // Non loggato → redirect
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Ruolo NON ammesso → redirect
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  // Accesso consentito → render delle sottorotte
  return <Outlet />;
}
