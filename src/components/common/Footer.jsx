import React from 'react';
import { Link } from 'react-router-dom';
import {
  dressList,
  menList,
  menuList,
  pantsList,
  topList,
  womenList,
} from '../../utils/navbarLinks';
import './style/footer.style.css';

function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <div className="footer__links">
          <div className="footer__links__content">
            <h2>WOMEN</h2>
            <ul>
              {womenList.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__links__content">
            <h2>MEN</h2>
            <ul>
              {menuList.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__links__content">
            <h2>TOP</h2>
            <ul>
              {topList.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__links__content">
            <h2>PANTS</h2>
            <ul>
              {pantsList.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__links__content">
            <h2>DRESS</h2>
            <ul>
              {dressList.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__copyright">
          <div className="logo-img-box">
            <img src="/image/sparklogo.png" alt="spark logo" />
          </div>
          <div className="copyright">
            This website is a project that simulates an online shopping mall,
            and <strong>purchasing items is not possible</strong>. The photos
            used on this website do not represent items actually sold here. All
            images, except for those used in the banners, are{' '}
            <strong>sourced from H&M products</strong>, and no names,
            information, or images have been altered.
          </div>
          <div>
            2024 Coding Noona Course | Demo Shoppingmall Project - Sunil Park
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
