import { login as apiLogin } from "./auth";
import { setAuthToken } from "./request";

// performLogin: centralizes the login side-effects (API call + set token)
export async function performLogin(credentials) {
  const resp = await apiLogin(credentials);
  if (!resp) return null;
  if (resp.token) {
    setAuthToken(resp.token);
  }
  return resp;
}

export default { performLogin };
