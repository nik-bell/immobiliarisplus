/**
 * @file RoleProtectedRoute.jsx
 * @description Route protection component that restricts access based on user authentication and role.
 *              Redirects unauthenticated users or users without allowed roles to home page.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

/**
 * Props for RoleProtectedRoute component.
 * @typedef {Object} RoleProtectedRouteProps
 * @property {Array<string>} allowedRoles - Array of user role strings that are permitted to access this route.
 */

/**
 * RoleProtectedRoute
 *
 * A route wrapper component that enforces authentication and role-based access control.
 * If the user is not logged in or their role is not in the allowedRoles list, they are redirected to home.
 * Otherwise, the route's child components are rendered via Outlet.
 *
 * @param {RoleProtectedRouteProps} props
 * @param {Array<string>} props.allowedRoles - List of permitted user roles (e.g., ["admin", "agent"]).
 * @returns {JSX.Element} Either a redirect to home or an Outlet for nested routes.
 */
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
