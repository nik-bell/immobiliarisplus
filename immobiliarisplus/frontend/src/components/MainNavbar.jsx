import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav>
      <div>
        <NavLink to="/">
          {/* <img src="/logo.png" alt="Logo" /> */}
          <strong>ImmobiliarisPlus</strong>
        </NavLink>
      </div>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/vendi-casa">Vendi casa</NavLink>
        <NavLink to="/migliora-casa">Migliora casa</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </div>

      <div>
        <NavLink to="/valuta-casa">
          <button>Valuta casa</button>
        </NavLink>
        <NavLink to="/contattaci">
          <button>Contattaci</button>
        </NavLink>
      </div>
    </nav>
  );
};

export default MainNavbar;
