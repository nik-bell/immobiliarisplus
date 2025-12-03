import { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { performLogin, getValuationsDashboard } from "../api/api";
import LogoPng from '../assets/Logo.png';

// helper for prefetching the AreaAgenti chunk
const AreaAgentiImport = () => import("../pages/AreaAgenti");

import BACKGROUND_IMAGE_URL from '../assets/img-login.png'

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("utente");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await performLogin({ email, password });
        if (resp && resp.token) {

          // determine role coming from API (could be resp.role or resp.user.role)
          const apiRole = (resp.role || resp.user?.role || role || "USER").toString();
          const mapRole = (r) => {
            const upper = String(r).toUpperCase();
            if (upper === "ADMIN") return "admin";
            if (upper === "AGENT" || upper === "AGENTE") return "agente";
            return "utente";
          };
          const mappedType = mapRole(apiRole);

          const userData = resp.user ? { ...resp.user, type: mappedType } : { name: email, type: mappedType };
          login(userData);
          // prefetch AreaAgenti chunk and warm dashboard data to reduce perceived load
          try {
            AreaAgentiImport();
            getValuationsDashboard();
          } catch (e) {
            // ignore prefetch errors
          }
          if (userData.type === "agente" || userData.type === "admin") {
            navigate("/area-agenti");
          }
          onClose();
        } else {
          setError("Credenziali non valide");
        }
      } catch (err) {
        setError("Errore durante il login");
      } finally {
        setLoading(false);
      }
    })();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-end z-60 bg-cover bg-center"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative h-full w-full flex flex-col sm:flex-row items-center justify-center p-6 sm:p-10 sm:gap-2">
        <div className="w-full sm:w-1/2 md:1/3 flex flex-col justify-center items-center">
          <img src={LogoPng} alt="Logo immobiliaris" className="lg:max-w-lg" />
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-1 text-white/90 text-center tracking-wider">
            Bentornato
          </h2>
          <p className='mb-6 lg:mx-12 font-semibold lg:text-xl text-white/80 text-center tracking-wider'>Accedi alla tua area riservata utilizzando le credenziali Agente o Amministratore.</p>
        </div>
        <div className="bg-black/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full shadow-2xl w-full sm:w-1/2 lg:w-96">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label
              htmlFor="email-input"
              className="block text-sm font-medium text-white -mb-3"
            >Email</label>
            <input
              type="email"
              placeholder="Inserisci l'email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-white/30 bg-white/20 text-white placeholder-gray rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
              required
            />
            <label
              htmlFor="password-input"
              className="block text-sm font-medium text-white -mb-3"
            >Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Inserisci la password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-white/30 bg-white/20 text-white placeholder-gray rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
                aria-label={isPasswordVisible ? "Nascondi password" : "Mostra password"}
              >
                {isPasswordVisible ? (
                  <svg
                    className="w-5 h-5 text-white/70 hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2" 
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2" 
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-white/70 hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>

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
              className="px-6 py-3 bg-teal-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-teal-500 hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "Caricamento..." : "Accedi"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-white/80 text-sm hover:text-white mt-1 transition duration-300"
            >
              Annulla
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
