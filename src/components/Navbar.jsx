import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import './style/navbar.css';
import { navLayout } from '../data/navigationLinks';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
  NavLink,
} from 'react-router-dom';
import { SvgSearch, SvgUser, SvgTable, SvgBag } from '../svg/SVGFiles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLinkLists,
  menList,
  menuList,
  womenList,
} from '../utils/navbarLinks';
import HamburgerIcon from '../assets/icons/HamburgerIcon';

function Navbar() {
  // temporary
  const user = true;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [query] = useSearchParams();
  const category = query.getAll('category');

  let gender = null;

  const [curCategory, setCurCategory] = useState('');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (category.length !== 0) {
      // word exchange
      const exchange = category.map((item) => {
        if (item === 'female') return 'women';
        if (item === 'male') return 'men';
        return item;
      });

      setCurCategory(exchange);
    } else {
      setCurCategory('');
      setLinks(null);
    }

    if (category.length === 1) {
      setLinks(getLinkLists(category[0]));
    }
  }, [query]);

  const onCheckEnter = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value === '') {
        return navigate('/');
      }
      navigate(`/?page=1&name=${event.target.value}`);
    }
  };

  const handleLogout = () => {
    // ******** work on it later ********
    // dispatch(logout());
  };

  return (
    <header className="navbar">
      {/* admin page button */}
      {/*         
        {user && user.level === 'admin' && (
          <Link to="/admin/product?page=1">
            Admin page
          </Link>
        )}
       */}
      <nav className="navbar__top">
        <div className="navbar__top-box navbar__top-box--left">
          <Link className="navbar__logo" to={'/'}>
            <div className="image-container">
              <img src="/image/sparklogo.png" alt="" />
            </div>
          </Link>
          <HamburgerIcon />
          <ul className="navbar__link-box">
            {menuList.map(({ to, label }) => {
              let active = false;
              if (curCategory.includes(label.toLowerCase())) {
                active = true;
              }
              const classlabel = active
                ? 'navbar__link navbar__link--active'
                : 'navbar__link';
              return (
                <li key={label}>
                  <Link to={to} className={classlabel}>
                    {label.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar__top-box navbar__top-box--right">
          <label className="searchbar">
            <div className="searchbar__svg svg-box">{SvgSearch}</div>
            <input
              type="text"
              autoComplete="off"
              placeholder="Search Product"
              onKeyDown={onCheckEnter}
            />
          </label>
          <div className="navbar__top-feature">
            {user ? (
              <div onClick={() => navigate('/login')}>
                <div className="svg-box">{SvgUser}</div> Login
              </div>
            ) : (
              <div onClick={() => console.log('logout')}>
                <div className="svg-box">{SvgUser}</div> Login
              </div>
            )}
            <div onClick={() => navigate('/cart')}>
              <div className="svg-box">{SvgBag}</div> Cart(0)
            </div>
            <div onClick={() => navigate('/order')}>
              <div className="svg-box">{SvgTable}</div> My Order
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
