import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/img/cine.png" alt="Logo" />
        </Link>
      </div>
      
      <div className="menu-toggle">
        <button onClick={toggleMenu}>
          ☰
        </button>
      </div>

    <div> 
    {/* <SearchForm {...props} />  */}
    
    </div>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/favorites">Favoritos</Link></li>
          <li><Link className="nav-link" to="/more/category/popular">Películas más destacadas</Link></li>
          <li><Link className="nav-link" to="/more/category/now_playing">Películas en cartelera</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
