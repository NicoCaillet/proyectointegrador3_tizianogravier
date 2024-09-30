// Navbar.js
import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/img/pochoclo.png" alt="Logo" />
        </Link>
      </div>
      
      {/* Botón de Menú para Móviles */}
      <div className="menu-toggle">
        <button onClick={toggleMenu}>
          {/* Ícono de hamburguesa */}
          ☰
        </button>
      </div>

      {/* Clase dinámica para abrir/cerrar el menú */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/favorites">Favoritos</Link></li>
          <li><Link className="nav-link" to="/more/category/popular">Películas más populares</Link></li>
          <li><Link className="nav-link" to="/more/category/now_playing">Películas en cartelera</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
