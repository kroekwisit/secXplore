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

          <button className="button" onClick={handleLoginClick}>Sign in</button>

        <div className="register-link">
          Don’t have an account? <Link to="/Register">Create Account</Link>
        </div>

        <hr className="divider" />
        <p className="or-text">Or sign up with</p>

        <button className="google-button"><FaGoogle /></button>
      </div>
    </div>
  );
};

export default LoginPage;
