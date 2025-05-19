import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Challenge1.css";

const SimulationPage = () => {
  const [showHint, setShowHint] = useState(false);
  const [url, setUrl] = useState("https://secxplore.com/login");
  const [inputUrl, setInputUrl] = useState(url);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [flagError, setFlagError] = useState("");

  const navigateTo = (newUrl) => {
    setUrl(newUrl);
    setInputUrl(newUrl);
    setLoginError("");
  };

  const handleAddressBarKeyPress = (e) => {
    if (e.key === "Enter") {
      navigateTo(inputUrl);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Bob" && password === "123") {
      navigateTo("https://secxplore.com/home/user=678");
      setUsername("");
      setPassword("");
      setLoginError("");
      return;
    }
    setLoginError("Invalid username or password.");
    return;
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  const handleSubmitAnswer = () => {
    if (answer.trim() === "flag{You_can_access_another_user?}") {
      setShowPopup(true);
      setFlagError("");
    } else {
      setFlagError("Incorrect flag. Try again");
      setTimeout(() => {
      setFlagError("");
    }, 3000);
    }
  };

  const renderPage = () => {
    const userMatch = url.match(/user=(\d+)/);
    const userId = userMatch ? userMatch[1] : null;
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleLogin(e);
      }
    };

    if (url.includes("/login")) {
      return (
        <div>
          <h2>🔐 Login</h2>
          <p>Username:</p>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p>Password:</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br /><br />
          <button onClick={handleLogin}>Login</button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </div>
      );
    }

    if (url.includes("/home") && userId) {
      if (userId === "678") {
        return (
          <div>
            <h2>Welcome back Bob!</h2>
            <p>Hope you have a great day!.</p>
          </div>
        );
      } else if (userId === "1") {
        return (
          <div className="flag-box">
            <h2>⚠️ Broken Access Control</h2>
            <p className="flag">flag&#123;You_can_access_another_user?&#125;</p>
          </div>
        );
      } else {
        return (
          <div>
            <h2>Unknown User</h2>
            <p>This user ID is not recognized.</p>
          </div>
        );
      }
    }

    return (
      <div>
        <h2>404 - Page Not Found</h2>
        <p>Check the URL or go back to <code>/login</code>.</p>
      </div>
    );
  };

  return (
    <div className="simulation-container">
      <nav className="navbar">
        <Link to="/" className="logo">secXplore</Link>
        <ul className="nav-links">
          <Link to="/" className="textdecoration_none"><li>Home</li></Link>
          <li>Scoreboard</li>
          <li>About us</li>
          <li>Account</li>
        </ul>
      </nav>

      <div className="content">
        <div className="left-panel">
          <h3>Challenge #1</h3>
          <p>Your username is <strong>Bob</strong> and your password is <strong>123</strong>.<br />
            You have to find the flag, maybe it store in admin page.<br />
            Admin usually have the <strong>first ID</strong> right?
          </p>
          <input
            type="text"
            placeholder="Answer here"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button className="submit" onClick={handleSubmitAnswer}>Submit</button>

          {flagError && (
            <p style={{ color: "red", marginTop: "10px" }}>{flagError}</p>
          )}

          {showHint && (
            <div className="hint-box">
              <p>💬 Hint: Check the address bar and find the flag directory.</p>
            </div>
          )}

          <div className="bottom-buttons">
            <button className="hint" onClick={handleHintClick}>💡 HINT</button>
            <Link to="/"><button className="skip">SKIP? ➔</button></Link>
          </div>
        </div>

        <div className="right-panel">
          <div className="simulator-box">
            <div className="browser-window">
              <div className="browser-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="address-bar">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyDown={handleAddressBarKeyPress}
                />
                <button onClick={() => navigateTo(inputUrl)}>Go</button>
              </div>
              <div className="webpage-content">{renderPage()}</div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>🎉 Challenge Completed!</h3>
            <p>You found the flag successfully.</p>

            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Close</button>
              <Link to="/" className="confirm-button">
                <button>Confirm</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationPage;
