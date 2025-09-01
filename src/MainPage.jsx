import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./style.css";

const MainPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0 });

  const handleSignInClick = () => navigate("/login");

  const handleStartClick = (e) => {
    // ripple feedback
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

    // navigate to Dashboard quickly after ripple
    setTimeout(() => navigate("/Dashboard"), 180);
  };

  // light parallax on mouse move
  const onHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) / r.width; // -0.5..0.5
    const my = (e.clientY - (r.top + r.height / 2)) / r.height; // -0.5..0.5
    el.style.setProperty("--mx", mx.toFixed(3));
    el.style.setProperty("--my", my.toFixed(3));
  };

  return (
    <div className="main-page">
      <nav className="navbar">
        <Link to="/" className="logo textdecoration_none">
          <span className="logo-gradient">secXplore</span>
        </Link>

        <div className="nav-right">
          <ul className="nav-links">
            <Link to="/" className="textdecoration_none">
              <li className="nav-item">
                <span>Home</span>
              </li>
            </Link>
            <li className="nav-item">
              <span>Scoreboard</span>
            </li>
            <li className="nav-item">
              <span>About us</span>
            </li>
          </ul>
          <button className="sign-in-button" onClick={handleSignInClick}>
            Sign in
          </button>
        </div>
      </nav>

      <section
        className="hero"
        ref={heroRef}
        onMouseMove={onHeroMove}
        role="banner"
        aria-label="secXplore hero"
      >
        <div className="overlay" />
        <div className="hero-text">
          <p className="brand">secXplore</p>

          {/* your original subheadline, with a CSS typewriter mask */}
          <p className="subline type-mask">
            Neque curabitur sed quam quisque morbi pellentesque hendrerit sed
            adipiscing.
          </p>

          <button className="start-button ripple" onClick={handleStartClick}>
            <span>Start</span>
            {ripple.show && (
              <span
                className="ripple-circle"
                style={{ left: ripple.x, top: ripple.y }}
              />
            )}
          </button>
        </div>
      </section>

      {/* keep your information; just prettier + interactive list */}
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
