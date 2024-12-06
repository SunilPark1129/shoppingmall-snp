import React, { useEffect, useState } from 'react';
import './index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  loginWithEmail,
  loginWithGoogle,
} from '../../features/user/userSlice';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const { user, loginError, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [navigate]);

  const handleLoginWithEmail = (event) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async (googleData) => {
    dispatch(loginWithGoogle(googleData.credential));
  };

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  return (
    <main className="login">
      <div className="wrapper">
        <div className="login__content">
          <h1>Log-in</h1>
          <form onSubmit={handleLoginWithEmail} className="login__form">
            <div className="login__top">
              <label>
                Email Address
                <input
                  type="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
            </div>

            <div className="login__bot">
              <button type="submit">{loading ? 'Loading...' : 'LOGIN'}</button>
              {loginError && <div className="error-message">{loginError}</div>}
              <div>
                Don't have an account? <Link to={'/register'}>Sign up</Link>
              </div>
            </div>
          </form>

          <div className="login__other">
            <div className="login__label">
              <div>Log in with other method</div>
              <span></span>
            </div>

            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
