import { request, setAuthToken as _setAuthToken, clearAuthToken as _clearAuthToken, getPersistedAuthToken } from "./request";

export async function login(credentials) {
  const res = await request("/auth/login", { method: "POST", body: credentials });
  if (res.ok) {
    // expected server payload: { token, user }
    return res.data;
  }
  console.error("login failed", res.error || res.status);
  return null;
}

export function setAuthToken(token) {
  _setAuthToken(token);
}

export function clearAuthToken() {
  _clearAuthToken();
}

export { getPersistedAuthToken };
