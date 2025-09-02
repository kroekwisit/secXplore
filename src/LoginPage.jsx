import { Link, useNavigate } from "react-router-dom";
import { FaKeyboard, FaLock, FaGoogle } from "react-icons/fa";
import "./style.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="login-page">
      {/* Navbar with same style as Dashboard */}
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

      {/* Login form */}
      <div className="login-form">
        <h2>Sign in</h2>

        {/* Username */}
        <div className="input-box">
          <label className="input-label">Username</label>
          <input type="text" />
        </div>

        {/* Password */}
        <div className="input-box">
          <label className="input-label">Password</label>
          <input type="password" />
        </div>

        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button className="button" onClick={handleLoginClick}>
          Sign in
        </button>

        <div className="register-link">
          Don’t have an account? <Link to="/Register">Create Account</Link>
        </div>

        <hr className="divider" />
        <p className="or-text">Or sign in with</p>

        <button className="google-button">
          <FaGoogle />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
