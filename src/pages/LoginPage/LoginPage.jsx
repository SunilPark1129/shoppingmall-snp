import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login">
      <div className="wrapper">
        <div className="login__content">
          <div className="login__top">
            <label>
              Email Address
              <input type="email" placeholder="Enter email" />
            </label>
            <label>
              Password
              <input type="email" placeholder="Enter email" />
            </label>
          </div>

          <div className="login__bot">
            <button>Login</button>
            <div>
              Don't have an account? <Link to={"/register"}>Sign up</Link>
            </div>
          </div>

          <div className="login__google">
            <div>Log in with other method</div>
            <div>GOOGLE BUTTON HERE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
