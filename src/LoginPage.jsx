import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginClick = (e) => {
    e.preventDefault();

    // Basic login logic
    if (username === "Bob" && password === "123") {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "Bob", role: "user" })
      );
      navigate("/Dashboard");
    } else if (username === "Admin" && password === "admin123") {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "Admin", role: "admin" })
      );
      navigate("/Dashboard");
    } else {
      setError("Invalid username or password");
    }
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

        <div className="input-box">
          <label className="input-label">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label className="input-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="field-error">{error}</p>}

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
      </div>
    </div>
  );
};

export default LoginPage;
