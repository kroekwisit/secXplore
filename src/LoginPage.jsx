import { FaLock, FaGoogle, FaKeyboard } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <nav className="navbar">
        <Link to="/" className="logo">secXplore</Link>
        <ul className="nav-links">
          <Link to ="/"><li><a >Home</a></li></Link>
          <li><a>Scoreboard</a></li>
          <li><a>About us</a></li>
        </ul>
        <ul className="nav-links">
          <li><a href="">Support</a></li>
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

        <button className="button">Sign in</button>

        <div className="register-link">
          Don’t have an account? <a href="#">Create Account</a>
        </div>

        <hr className="divider" />
        <p className="or-text">Or sign up with</p>

        <button className="google-button"><FaGoogle /></button>
      </div>
    </div>
  );
};

export default LoginPage;
