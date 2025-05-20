import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleStartClick = (id) => {
    navigate(`/challenge${id}`);
  };

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">secXplore</Link>
        <ul className="nav-links">
          <Link to="/" className="textdecoration_none"><li>Home</li></Link>
          <li>Scoreboard</li>
          <li>About us</li>
          <li>Account</li>
        </ul>
      </nav>

      {/* Top banner with image */}
      <div className="dashboard-header">
        <div className="dashboard-overlay" />
        <div className="dashboard-header-content">
          <h2>Welcome Back! [Username]</h2>
          <p>Process</p>
          <p>Complete: 1/10 Topic</p>
        </div>
      </div>

      {/* Main content area below the image */}
      <div className="dashboard-content">
        <h3>Challenge Selection</h3>

        <div className="challenge-box">
          <p><strong>1. Broken Access Control</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(1)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>2. Cryptographic Failures</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(2)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>3. Injection</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(3)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>4. Insecure Design</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(4)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>5. Security Misconfiguration</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(5)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>6. Vulnerable and Outdated Components</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(6)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>7. Identification and Authentication Failures</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(7)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>8. Software and Data Integrity Failures</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(8)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>9. Security Logging and Monitoring Failures</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(9)}>Start</button>
          </div>
        </div>

        <div className="challenge-box">
          <p><strong>10. Server-Side Request Forgery (SSRF)</strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat dapibus sem, id dictum lorem mattis non.</p>
          <div className="challenge-footer">
            <span>Best time: xx:xx</span>
            <button className="start-button" onClick={() => handleStartClick(10)}>Start</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
