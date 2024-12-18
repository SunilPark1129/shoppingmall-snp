import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function ErrorPage() {
  return (
    <section className="errorpage">
      <div className="wrapper">
        <div className="container">
          <Link to={'/'}>
            <div className="image-container">
              <img src="/image/sparklogo.png" alt="logo" />
            </div>
          </Link>
          <h1>404 Page</h1>
          <p>We don't have this page</p>
          <Link to={'/'}>Go to homepage</Link>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
