import React from 'react';
import './index.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './components/banner/Banner';

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <main className="landing">
      <Banner />
      <div className="landing-container">
        <div className="landing-grid"></div>
      </div>
    </main>
  );
}

export default LandingPage;
