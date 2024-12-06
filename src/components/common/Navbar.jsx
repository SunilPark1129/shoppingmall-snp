import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import './style/navbar.style.css';
import { navLayout } from '../../data/navigationLinks';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
  NavLink,
} from 'react-router-dom';
import { SvgSearch, SvgUser, SvgTable, SvgBag } from '../../svg/SVGFiles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLinkLists,
  menList,
  menuList,
  womenList,
} from '../../utils/navbarLinks';
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import ExitIcon from '../../assets/icons/ExitIcon';
import { logout } from '../../features/user/userSlice';

function Navbar({ user }) {
  const serachRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [query] = useSearchParams();
  const category = query.getAll('category');
  const [isModalOn, setIsModalOn] = useState(false);

  const [curCategory, setCurCategory] = useState('');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    serachRef.current.value = '';
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
      handleSearch(event.target.value);
    }
  };

  const handleSearch = (val) => {
    if (val.trim() === '') return;
    navigate(`/?name=${val}`);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  function handleModalOpen() {
    setIsModalOn((prev) => !prev);
  }

  return (
    <>
      <div className="navbar-size"></div>
      <header className="navbar">
        {/* admin page button */}
        {/*         
        {user && user.level === 'admin' && (
          <Link to="/admin/product?page=1">
            Admin page
          </Link>
        )}
       */}
        <nav className="navbar__content">
          <div className="navbar__top">
            <div className="navbar__top-box navbar__top-box--left">
              <Link className="navbar__logo" to={'/'}>
                <div className="image-container">
                  <img src="/image/sparklogo.png" alt="" />
                </div>
              </Link>
              <div onClick={handleModalOpen}>
                <HamburgerIcon />
              </div>
            </div>
            <div className="navbar__top-box navbar__top-box--right">
              <label className="searchbar mobile-disappear">
                <div
                  className="searchbar__svg svg-box"
                  onClick={() => handleSearch(serachRef.current.value)}
                >
                  {SvgSearch}
                </div>
                <input
                  ref={serachRef}
                  type="text"
                  autoComplete="off"
                  placeholder="Search Product"
                  onKeyDown={onCheckEnter}
                />
              </label>
              <div className="navbar__top-feature">
                {user ? (
                  <div
                    onClick={handleLogout}
                    className="navbar__login navbar__login--logout"
                  >
                    <div className="svg-box">{SvgUser}</div>
                    <span> Logout</span>
                  </div>
                ) : (
                  <div
                    onClick={() => navigate('/login')}
                    className="navbar__login"
                  >
                    <div className="svg-box">{SvgUser}</div>
                    <span> Login</span>
                  </div>
                )}
                <div onClick={() => navigate('/cart')}>
                  <div className="svg-box">{SvgBag}</div>
                  <span className="mobile-disappear"> Cart (0)</span>
                </div>
                <div onClick={() => navigate('/order')}>
                  <div className="svg-box">{SvgTable}</div>
                  <span className="mobile-disappear"> My Order</span>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar__bot mobile-appear">
            <label className="searchbar">
              <div className="searchbar__svg svg-box">{SvgSearch}</div>
              <input
                type="text"
                autoComplete="off"
                placeholder="Search Product"
                onKeyDown={onCheckEnter}
              />
            </label>
          </div>

          {/* aside menu */}
          <div
            className={`navbar__link ${isModalOn && 'navbar__link--active'}`}
          >
            <div className="modal-close" onClick={handleModalOpen}>
              <ExitIcon />
            </div>
            <div className="navbar__link-container">
              <ul>
                {menuList.map(({ to, label }) => {
                  let active = false;
                  if (curCategory.includes(label.toLowerCase())) {
                    active = true;
                  }
                  const classlabel = active
                    ? 'navbar__link-text navbar__link-text--active'
                    : 'navbar__link-text';

                  return (
                    <li key={label} className="navbar__link-item">
                      <Link to={to} className={classlabel}>
                        {label.toUpperCase()}
                      </Link>
                      {active && (
                        <ul>
                          {links &&
                            links.map(({ label, to }) => {
                              let isTarget = false;

                              if (curCategory.length === 2) {
                                isTarget =
                                  curCategory[1].toLowerCase() ===
                                  label.toLowerCase();
                              }
                              return (
                                <li key={label}>
                                  <Link
                                    to={to}
                                    className={`${isTarget && 'isTarget'}`}
                                  >
                                    {label.toUpperCase()}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      )}
                    </li>
                  );
                })}
                <li key={'home'} className="navbar__link-item">
                  <Link
                    className={`${
                      category.length === 0
                        ? 'navbar__link-text navbar__link-text--active'
                        : 'navbar__link-text'
                    }`}
                    to={'/'}
                  >
                    Home
                  </Link>
                </li>
              </ul>
              {user && (
                <div className="navbar__name">
                  <div className="line"></div>
                  <div>
                    <div>Hi, {user.name}</div>
                    <div>{user.email}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {isModalOn && (
            <div className="modal-bg" onClick={handleModalOpen}></div>
          )}
          {/*  */}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
