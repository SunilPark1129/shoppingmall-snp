import React from 'react';
import './style/navbar.css';
import { navLayout } from '../data/navigationLinks';
import { Link } from 'react-router-dom';
import { SvgSearch, SvgUser, SvgTable, SvgBag } from '../svg/SVGFiles';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__top">
        <label className="searchbar">
          <div className="searchbar__svg svg-box">{SvgSearch}</div>
          <input type="text" autoComplete="off" placeholder="Search Product" />
        </label>
        <div className="navbar__top__links">
          <Link to={'/login'}>
            <div className="svg-box">{SvgUser}</div> Login
          </Link>
          <Link to={'/cart'}>
            <div className="svg-box">{SvgBag}</div> Cart(0)
          </Link>
          <Link to={'/order'}>
            <div className="svg-box">{SvgTable}</div> My Order
          </Link>
        </div>
      </div>
      <Link className="navbar__logo" to={'/'}>
        <div className="navbar__logo__parent image-container">
          <img src="/image/sparklogo.png" alt="" />
        </div>
      </Link>
      <nav>
        <ul className="navbar__content">
          {navLayout.map(({ to, label }) => {
            return (
              <li key={label}>
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
