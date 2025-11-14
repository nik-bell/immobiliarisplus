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
    <footer>
      <div>
        <div>
          <NavLink to="/">
            {/* <img src="/logo.png" alt="Logo" /> */}
            <strong>ImmobiliarisPlus</strong>
          </NavLink>
          <p>
            Vendi casa con più tranquillità. Trasparenza, velocità e controllo.
          </p>
        </div>
        <div>
          <h5>Servizi</h5>
          <NavLink to="/valuta-casa">Vendi casa</NavLink>
          <NavLink to="/vendi-casa">Vendi casa</NavLink>
          <NavLink to="/migliora-casa">Migliora casa</NavLink>
        </div>
        <div>
          <h5>Contatti</h5>
          <a href="tel:+390212345678">+39 02 1234 5678</a>
          <a href="mailto:info@immobiliarisplus.it">info@immobiliarisplus.it</a>
          <p>Milano, Italia</p>
        </div>
        <div>
          <h5>Newsletter</h5>
          <p>Ricevi consigli e novità dal mercato immobiliare</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Checkbox per il consenso privacy (consigliata per GDPR) */}
            <label className="checkbox-privacy">
              <input
                type="checkbox"
                checked={consenso}
                onChange={() => setConsenso(!consenso)}
              />
              Acconsento al trattamento dei dati personali
            </label>

            {/* Bottone di invio */}
            <button type="submit">Iscriviti</button>
          </form>
        </div>
      </div>
      <hr />

      <div>
        <p>© 2025 ImmobiliarisPLUS. Tutti i diritti riservati.</p>
      </div>
      <div>
        <CookiePolicy />
        <PrivacyPolicy />
        <a href="#">Termini e condizioni</a>
      </div>
      <div>
        <a href="">facebook icon</a>
        <a href="">instagram icon</a>
        <a href="">linkedin icon</a>
      </div>
    </footer>
  );
}

export default Footer;
