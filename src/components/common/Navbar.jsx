import React, { Fragment, useEffect, useState } from 'react';
import './style/navbar.style.css';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkLists, menuList } from '../../utils/navbarLinks';
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import ExitIcon from '../../assets/icons/ExitIcon';
import { logout } from '../../features/user/userSlice';
import { getCartQty } from '../../features/cart/cartSlice';
import SearchIcon from '../../assets/icons/SearchIcon';
import BagIcon from '../../assets/icons/BagIcon';
import TableIcon from '../../assets/icons/TableIcon';
import UserIcon from '../../assets/icons/UserIcon';

function Navbar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [query] = useSearchParams();
  const category = query.getAll('category');
  const [isModalOn, setIsModalOn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { cartItemCount } = useSelector((state) => state.cart);
  const [curCategory, setCurCategory] = useState('');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (category.length !== 0) {
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
      handleSearch();
    }
  };

  function handleSearchClick() {
    setIsSearching((prev) => !prev);
    setSearchValue('');
  }

  const handleSearch = () => {
    if (searchValue.trim() === '') return;
    navigate(`/?name=${searchValue}`);
    handleSearchClick();
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  function handleModalOpen() {
    setIsModalOn((prev) => !prev);
  }

  useEffect(() => {
    if (user) {
      dispatch(getCartQty());
    }
  }, [user]);

  return (
    <Fragment>
      <div className="navbar-size"></div>
      <header className="navbar">
        {/* admin page button */}

        <nav className="navbar__content">
          <div className="navbar__top">
            <div className="navbar__top-box navbar__top-box--left">
              <Link className="navbar__logo" to={'/'}>
                <div className="image-container">
                  <img src="/image/sparklogo.png" alt="logo" />
                </div>
              </Link>
              <div className="navbar__menu" onClick={handleModalOpen}>
                <HamburgerIcon />
              </div>
            </div>
            <div className="navbar__top-box navbar__top-box--right mobile-disappear">
              {user && user.level === 'admin' && (
                <Link className="navbar__admin" to="/admin/product?page=1">
                  Admin page
                </Link>
              )}
              <div className="navbar__top-feature">
                <button className="navbar__search" onClick={handleSearchClick}>
                  <SearchIcon />
                </button>
                <div onClick={() => navigate('/cart')}>
                  <div className="svg-box">
                    <BagIcon />
                  </div>
                  <span className="mobile-disappear">Cart</span>(
                  {cartItemCount || 0})
                </div>
                <div onClick={() => navigate('/order')}>
                  <div className="svg-box">
                    <TableIcon />
                  </div>
                  <span className="mobile-disappear"> My Order</span>
                </div>
              </div>
            </div>
            {user ? (
              <div
                onClick={handleLogout}
                className="navbar__login navbar__login--logout"
              >
                <div className="svg-box">
                  <UserIcon />
                </div>
                <span> Logout</span>
              </div>
            ) : (
              <div onClick={handleLogin} className="navbar__login">
                <div className="svg-box">
                  <UserIcon />
                </div>
                <span> Login</span>
              </div>
            )}
          </div>
          <div className="navbar__bot mobile-appear">
            <div className="navbar__top-feature">
              <button className="navbar__search" onClick={handleSearchClick}>
                <SearchIcon />
              </button>
              <div onClick={() => navigate('/cart')}>
                <div className="svg-box">
                  <BagIcon />
                </div>
                <span className="mobile-disappear">Cart</span>(
                {cartItemCount || 0})
              </div>
              <div onClick={() => navigate('/order')}>
                <div className="svg-box">
                  <TableIcon />
                </div>
                <span className="mobile-disappear"> My Order</span>
              </div>
            </div>
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
      {isSearching && (
        <Fragment>
          <div className="search-modal">
            <div className="container">
              <label>
                <SearchIcon />
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Search Product..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={onCheckEnter}
                />
              </label>
              <button onClick={handleSearch}>ENTER</button>
            </div>
          </div>
          <div className="search-bg" onClick={handleSearchClick}></div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Navbar;
