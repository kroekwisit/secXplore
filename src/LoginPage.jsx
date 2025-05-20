import { FaLock, FaGoogle, FaKeyboard } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <nav className="navbar">
        <Link to="/" className="logo">secXplore</Link>
        <ul className="nav-links">
          <Link to="/" className="textdecoration_none"><li>Home</li></Link>
          <li>About us</li>
          </ul>
      </nav>

      <div className="login-form">
        <h2>Sign in</h2>

        <div className="input-box">
          <input type="text" placeholder="Username" />
          <FaKeyboard className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" />
          <FaLock className="icon" />
        </div>

        <div className="options">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <Link to="/Dashboard"><button className="button">Sign in</button></Link>

        <div className="register-link">
          Don’t have an account? <Link to="/Register"><a href="#">Create Account</a></Link>
        </div>

        <hr className="divider" />
        <p className="or-text">Or sign up with</p>

        <button className="google-button"><FaGoogle /></button>
      </div>
    </div>
  );
};

export default LoginPage;
