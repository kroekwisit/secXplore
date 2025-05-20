import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleStartClick = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="logo">secXplore</div>
        <div className="nav-right">
          <ul className="nav-links">
            <Link to="/" className="textdecoration_none">
              <li>Home</li>
            </Link>
            <li>Scoreboard</li>
            <li>About us</li>
          </ul>
          <button className="sign-in-button" onClick={handleSignInClick}>
            Sign in
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="overlay" />
        <div className="hero-text">
          <p>
            secXplore
            <br />
            Neque curabitur sed quam quisque morbi pellentesque hendrerit sed
            adipiscing.
          </p>
          <button className="start-button" onClick={handleStartClick}>
            Start
          </button>
        </div>
      </section>

      <section className="owasp-list">
        <h1>OWASP TOP 10 2021</h1>
        <div className="columns">
          <ol start="1">
            <li>Broken Access Control</li>
            <li>Cryptographic Failures</li>
            <li>Injection</li>
            <li>Insecure Design</li>
            <li>Security Misconfiguration</li>
          </ol>
          <ol start="6">
            <li>Vulnerable and Outdated Components</li>
            <li>Identification and Authentication Failures</li>
            <li>Software and Data Integrity Failures</li>
            <li>Security Logging and Monitoring Failures</li>
            <li>Server-Side Request Forgery (SSRF)</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
