import { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("utente");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: username, type: role });
    // se è agente o admin, redirigi direttamente all'area agenti
    if (role === "agente" || role === "admin") {
      navigate("/area-agenti");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome utente"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="utente">Utente</option>
            <option value="admin">Admin</option>
            <option value="agente">Agente</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 w-full hover:bg-blue-700"
          >
            Conferma
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
