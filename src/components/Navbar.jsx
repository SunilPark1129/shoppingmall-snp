import React from "react";
import "./style/navbar.css";
import { navLayout } from "../data/navigationLinks";
import { Link } from "react-router-dom";
import "./style/navbar.css";
import { SvgSearch, SvgUser, SvgTable, SvgBag } from "../svg/SVGFiles";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-top">
        <label className="input-label">
          <div className="nav-search svg-box">{SvgSearch}</div>
          <input type="text" autoComplete="off" placeholder="Search Product" />
        </label>
        <div className="nav-btns">
          <button>
            <div className="svg-box">{SvgUser}</div> Login
          </button>
          <button>
            <div className="svg-box">{SvgBag}</div> Cart(0)
          </button>
          <button>
            <div className="svg-box">{SvgTable}</div> My Order
          </button>
        </div>
      </div>
      <Link className="nav-logo-a" to={"/"}>
        <div className="nav-logo img-box">
          <img src="/image/sparklogo.png" alt="" />
        </div>
      </Link>
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
