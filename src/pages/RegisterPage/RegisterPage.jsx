import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/user/userSlice';
import Loading from '../../components/common/Loading';

function RegisterPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [policyError, setPolicyError] = useState('');
  const { registrationError } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);

  const handleRegister = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData;
    const checkConfirmPassword = password === confirmPassword;
    if (!checkConfirmPassword) {
      setPasswordError('The password confirmation does not match.');
      return;
    }
    if (!policy) {
      setPolicyError('Please agree to the policy.');
      return;
    }
    setPasswordError('');
    setPolicyError('');
    dispatch(registerUser({ name, email, password, navigate }));
  };

  const handleChange = (event) => {
    let { id, value, type, checked } = event.target;
    if (id === 'confirmPassword' && passwordError) setPasswordError('');
    if (type === 'checkbox') {
      if (policyError) setPolicyError('');
      setFormData((prevState) => ({ ...prevState, [id]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  return (
    <main className="login">
      <div className="wrapper">
        <div className="login__content">
          <h1>Register</h1>
          <form onSubmit={handleRegister} className="login__form">
            <div className="login__top">
              <label>
                Email
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Name
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Confirm Password
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter email"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
              </label>
              <label className="input-row" tabIndex={0}>
                <input
                  type="checkbox"
                  id="policy"
                  checked={formData.policy}
                  onChange={handleChange}
                />{' '}
                I agree to the terms of service
              </label>
            </div>
            {loading && <Loading />}
            {registrationError && (
              <div>
                <div className="error-message">{registrationError}</div>
              </div>
            )}
            {policyError && (
              <div>
                <div className="error-message">{policyError}</div>
              </div>
            )}
            {passwordError && (
              <div>
                <div className="error-message">{passwordError}</div>
              </div>
            )}
            <div className="login__bot">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
