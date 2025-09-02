import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0 });

  const handleRegisterClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      show: false,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    requestAnimationFrame(() =>
      setRipple({
        show: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    );

    setTimeout(() => navigate("/Dashboard"), 160);
  };

  return (
    <div className="login-page">
      {/* Navbar (same as Login) */}
      <nav className="navbar">
        <Link to="/" className="logo textdecoration_none">
          <span className="logo-gradient">secXplore</span>
        </Link>
        <ul className="nav-links">
          <Link to="/" className="textdecoration_none">
            <li className="nav-item">
              <span>Home</span>
            </li>
          </Link>
          <li className="nav-item">
            <span>About us</span>
          </li>
        </ul>
      </nav>

      {/* Register form (same template as login) */}
      <div className="login-form">
        <h2>Register</h2>

        <div className="input-box">
          <label className="input-label">Username</label>
          <input type="text" />
        </div>

        <div className="input-box">
          <label className="input-label">Email</label>
          <input type="email" autoComplete="email" />
        </div>

        <div className="input-box">
          <label className="input-label">Password</label>
          <input type="password" />
        </div>

        <div className="input-box">
          <label className="input-label">Confirm Password</label>
          <input type="password" />
        </div>

        <button className="button register-btn" onClick={handleRegisterClick}>
          <span>Create Account</span>
          {ripple.show && (
            <span
              className="ripple-circle"
              style={{ left: ripple.x, top: ripple.y }}
            />
          )}
        </button>

        <div className="register-link">
          Already have an account?{" "}
          <Link to="/login">
            <strong>Sign in</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
