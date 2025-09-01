import { FaLock, FaKeyboard, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/Dashboard");
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

      {/* Reuse the same card template as Login */}
      <div className="login-form">
        <h2>Register</h2>

        <div className="input-box">
          <input type="text" placeholder="Username" autoComplete="username" />
          <FaKeyboard className="icon" />
        </div>

        <div className="input-box">
          <input type="email" placeholder="Email" autoComplete="email" />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <FaLock className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <FaLock className="icon" />
        </div>

        <button className="button" onClick={handleRegisterClick}>
          Create Account
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
