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
    <footer className="w-full bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <NavLink to="/" className="text-lg font-bold">
            ImmobiliarisPlus
          </NavLink>
          <p className="mt-2 text-sm text-gray-600">
            Vendi casa con più tranquillità. Trasparenza, velocità e controllo.
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Servizi</h5>
          <ul className="space-y-1 text-sm">
            <li>
              <NavLink
                to="/valuta-casa"
                className="text-gray-600 hover:text-gray-800"
              >
                Valuta casa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vendi-casa"
                className="text-gray-600 hover:text-gray-800"
              >
                Vendi casa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/migliora-casa"
                className="text-gray-600 hover:text-gray-800"
              >
                Migliora casa
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Contatti</h5>
          <p className="text-sm">+39 02 1234 5678</p>
          <p className="text-sm">info@immobiliarisplus.it</p>
          <p className="text-sm mt-2">Milano, Italia</p>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Newsletter</h5>
          <p className="text-sm mb-3">
            Ricevi consigli e novità dal mercato immobiliare
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 border rounded"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={consenso}
                onChange={() => setConsenso(!consenso)}
                className="w-4 h-4"
              />
              Acconsento al trattamento dei dati personali
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Iscriviti
            </button>
          </form>
        </div>
      </div>

      <hr />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <p>© 2025 ImmobiliarisPLUS. Tutti i diritti riservati.</p>
        </div>
        <div className="flex items-center gap-4">
          <CookiePolicy />
          <PrivacyPolicy />
          <a href="#" className="hover:underline">
            Termini e condizioni
          </a>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            facebook
          </a>
          <a href="#" className="hover:underline">
            instagram
          </a>
          <a href="#" className="hover:underline">
            linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
