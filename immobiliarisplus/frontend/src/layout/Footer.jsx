import { NavLink } from "react-router-dom";
import { useState } from "react";

import CookiePolicy from "../components/CookiePolicy";
import PrivacyPolicy from "../components/PrivacyPolicy";

function Footer() {
  const [email, setEmail] = useState("");
  const [consenso, setConsenso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!consenso) {
      alert("Per favore accetta l’informativa privacy.");
      return;
    }

    console.log("Email inviata:", email); // log per test (scambiare con api)
    alert("Iscrizione completata!");
  };

  return (
    <footer className="w-full bg-black text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <NavLink to="/" className="text-lg font-bold text-white">
            ImmobiliarisPlus
          </NavLink>
          <p className="mt-2 text-sm text-gray-400">
            Vendi casa con più tranquillità. Trasparenza, velocità e controllo.
          </p>
        </div>

        <div>
          <h3 className="h5 font-semibold mb-2 text-white">Servizi</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <NavLink
                to="/valuta-casa"
                className="text-gray-400 hover:text-white"
              >
                Valuta casa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vendi-casa"
                className="text-gray-400 hover:text-white"
              >
                Vendi casa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/migliora-casa"
                className="text-gray-400 hover:text-white"
              >
                Migliora casa
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="h5 font-semibold mb-2 text-white">Contatti</h3>
          <p className="text-sm text-gray-400">+39 02 1234 5678</p>
          <p className="text-sm text-gray-400">info@immobiliarisplus.it</p>
          <p className="text-sm text-gray-400 mt-2">Torino, Italia</p>
        </div>

        <div>
          <h3 className="h5 font-semibold mb-2 text-white">Newsletter</h3>
          <p className="text-sm mb-3 text-gray-400">
            Ricevi consigli e novità dal mercato immobiliare
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 border rounded bg-gray-800 text-gray-200 border-gray-700 placeholder-gray-400"
            />

            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={consenso}
                onChange={() => setConsenso(!consenso)}
                className="w-4 h-4 accent-teal-500"
              />
              Acconsento al trattamento dei dati personali
            </label>

            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-700 text-white px-4 py-2 rounded transition"
            >
              Iscriviti
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-700" />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <p>© 2025 ImmobiliarisPLUS. Tutti i diritti riservati.</p>
        </div>
        <div className="flex items-center gap-4">
          <CookiePolicy />
          <PrivacyPolicy />
          <a href="#" className="hover:underline text-gray-400 hover:text-white">
            Termini e condizioni
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline text-gray-400 hover:text-white">
            facebook
          </a>
          <a href="#" className="hover:underline text-gray-400 hover:text-white">
            instagram
          </a>
          <a href="#" className="hover:underline text-gray-400 hover:text-white">
            linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
