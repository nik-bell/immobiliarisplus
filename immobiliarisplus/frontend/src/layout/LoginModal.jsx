import { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, setAuthToken } from "../api/api";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("utente");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await apiLogin({ email, password });
        if (resp && resp.token) {
          setAuthToken(resp.token);

          // determine role coming from API (could be resp.role or resp.user.role)
          const apiRole = (resp.role || resp.user?.role || role || "USER").toString();
          const mapRole = (r) => {
            const upper = String(r).toUpperCase();
            if (upper === "ADMIN") return "admin";
            if (upper === "AGENT" || upper === "AGENTE") return "agente";
            return "utente";
          };
          const mappedType = mapRole(apiRole);

          const userData = resp.user
            ? { ...resp.user, type: mappedType }
            : { name: email, type: mappedType };

          login(userData);
          console.log("Login avvenuto con successo:", { name: userData.name, type: userData.type });
          if (userData.type === "agente" || userData.type === "admin") {
            navigate("/area-agenti");
          }
          onClose();
        } else {
          setError("Credenziali non valide");
        }
      } catch (err) {
        setError("Errore durante il login");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
            required
          />

          {/* <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="utente">Utente</option>
            <option value="admin">Admin</option>
            <option value="agente">Agente</option>
          </select> */}

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 w-full hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Caricamento..." : "Conferma"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 text-sm hover:underline mt-1"
          >
            Annulla
          </button>
        </form>
      </div>
    </div>
  );
}
