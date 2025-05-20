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
      <nav className="navbar">
        <Link to="/" className="logo">
          secXplore
        </Link>
        <ul className="nav-links">
          <Link to="/" className="textdecoration_none">
            <li>Home</li>
          </Link>
          <li>About us</li>
        </ul>
      </nav>

      <div className="login-form">
        <h2>Register</h2>

        <div className="input-box">
          <input type="text" placeholder="Username" />
          <FaKeyboard className="icon" />
        </div>

        <div className="input-box">
          <input type="email" placeholder="Email" />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" />
          <FaLock className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Confirm Password" />
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
