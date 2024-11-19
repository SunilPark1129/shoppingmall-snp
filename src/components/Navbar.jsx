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
} from 'react-router-dom';
import { SvgSearch, SvgUser, SvgTable, SvgBag } from '../svg/SVGFiles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLinkLists,
  menList,
  menuList,
  womenList,
} from '../utils/navbarLinks';

function Navbar() {
  // temporary
  const user = true;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [query] = useSearchParams();
  const category = query.getAll('category');

  let gender = null;
  if (category.includes('male')) {
    gender = 'male';
  } else if (category.includes('female')) {
    gender = 'female';
  }

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

  // need user token
  // useEffect(() => {
  //   if (user) {
  //     dispatch(getCartQty());
  //   }
  // }, [user]);

  return (
    <header className="navbar">
      <div className="navbar__top">
        {/* admin page button */}
        {/*         
        {user && user.level === 'admin' && (
          <Link to="/admin/product?page=1">
            Admin page
          </Link>
        )}
       */}
        <label className="searchbar">
          <div className="searchbar__svg svg-box">{SvgSearch}</div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Search Product"
            onKeyDown={onCheckEnter}
          />
        </label>
        <div className="navbar__top-links">
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
      <Link className="navbar__logo" to={'/'}>
        <div className="image-container">
          <img src="/image/sparklogo.png" alt="" />
        </div>
      </Link>
      <nav>
        <ul className="navbar__content">
          {menuList.map(({ to, label }) => {
            return (
              <li key={label}>
                <Link to={to}>{label.toUpperCase()}</Link>
              </li>
            );
          })}
        </ul>
        {links && (
          <ul className="navbar__content navbar__content--semi">
            {links.map(({ label, to }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
