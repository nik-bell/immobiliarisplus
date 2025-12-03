import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import CookiePolicy from "../components/CookiePolicy";
import PrivacyPolicy from "../components/PrivacyPolicy";

import LogoPNG from "../assets/Logo.png";

/**
 * Footer
 *
 * Application footer component with navigation links, contact information, and newsletter subscription.
 * Features include:
 * - Logo and company tagline
 * - Service links (Valuta casa, Vendi casa, Migliora casa, Contratto Esclusiva)
 * - Contact information (phone, email, location)
 * - Newsletter subscription form with privacy consent validation
 * - Cookie policy and privacy policy links
 * - Social media links
 *
 * @component
 * @returns {JSX.Element} Footer section with multiple columns and newsletter form
 */
function Footer() {
  /**
   * Newsletter email input value.
   * @type {[string, Function]}
   */
  const [email, setEmail] = useState("");

  /**
   * Privacy consent checkbox state.
   * @type {[boolean, Function]}
   */
  const [consenso, setConsenso] = useState(false);

  /**
   * Privacy consent validation error message.
   * @type {[string, Function]}
   */
  const [consensoError, setConsensoError] = useState("");

  /**
   * Success message displayed after successful subscription.
   * @type {[string, Function]}
   */
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Clears success message after 1.5 seconds of display.
   * Prevents memory leaks by cleaning up timeout on unmount or message change.
   */
  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(""), 1500);
    return () => clearTimeout(t);
  }, [successMessage]);

  /**
   * Handles newsletter subscription form submission.
   * Validates privacy consent, displays success message, and resets form.
   *
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!consenso) {
      setConsensoError("Per favore accetta l'informativa privacy.");
      return;
    }

    setSuccessMessage("Iscrizione completata!");
    setEmail("");
    setConsenso(false);
    setConsensoError("");
  };

  return (
    <footer className="w-full bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* LOGO */}
        <div>
          <NavLink to="/" className="flex items-center">
            <img src={LogoPNG} alt="Logo" className="h-10 w-auto" />
          </NavLink>

          <p className="mt-2 text-sm text-gray-400">
            Vendi casa con più tranquillità. Trasparenza, velocità e controllo.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="h5 font-semibold mb-2 text-white">Servizi</h3>
          <ul className="space-y-1 text-sm">
            <li><NavLink to="/valuta-casa" className="text-gray-400 hover:text-white">Valuta casa</NavLink></li>
            <li><NavLink to="/vendi-casa" className="text-gray-400 hover:text-white">Vendi casa</NavLink></li>
            <li><NavLink to="/migliora-casa" className="text-gray-400 hover:text-white">Migliora casa</NavLink></li>
            <li><NavLink to="/contratto-esclusiva" className="text-gray-400 hover:text-white">Contratto Esclusiva</NavLink></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="h5 font-semibold mb-2 text-white">Contatti</h3>
          <p className="text-sm text-gray-400">+39 02 1234 5678</p>
          <p className="text-sm text-gray-400">info@immobiliarisplus.it</p>
          <p className="text-sm text-gray-400 mt-2">Torino, Italia</p>
        </div>

        {/* NEWSLETTER */}
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
                onChange={() => {
                  const newVal = !consenso;
                  setConsenso(newVal);
                  if (newVal) setConsensoError("");
                }}
                className="w-4 h-4 accent-teal-500"
              />
              Acconsento al trattamento dei dati personali
            </label>

            {consensoError && (
              <p className="text-sm text-red-400 mt-1">{consensoError}</p>
            )}

            {successMessage && (
              <p className="text-sm text-green-400 mt-1">{successMessage}</p>
            )}

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
        <div>
          © 2025 ImmobiliarisPLUS. Tutti i diritti riservati.
        </div>

        <div className="flex items-center gap-4">
          <CookiePolicy />
          <PrivacyPolicy />
          <a href="#" className="hover:underline hover:text-white">Termini e condizioni</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline hover:text-white">facebook</a>
          <a href="#" className="hover:underline hover:text-white">instagram</a>
          <a href="#" className="hover:underline hover:text-white">linkedin</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
