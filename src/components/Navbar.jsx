import React from "react";
import "./style/navbar.css";
import { navLayout } from "../data/navigationLinks";
import { Link } from "react-router-dom";
import "./style/navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-top">
        <label className="input-label">
          {/* svg */}
          <input type="text" autoComplete="off" placeholder="Search Product" />
        </label>
        <div className="nav-btns">
          <button>Login</button>
          <button>Cart(0)</button>
          <button>My Order</button>
        </div>
      </div>
      <div className="nav-logo img-box">{/* logo here */}</div>
      <nav>
        <ul className="nav-list">
          {navLayout.map(({ to, label }) => {
            return (
              <li key={label} className="nav-item">
                <Link to={to}>{label.toUpperCase()}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
