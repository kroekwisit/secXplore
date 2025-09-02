import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const SAMPLE = [
  { name: "alice", points: 1540, solved: 18 },
  { name: "daisy", points: 1270, solved: 15 },
  { name: "gina", points: 1110, solved: 13 },
  { name: "bob", points: 980, solved: 12 },
  { name: "hank", points: 990, solved: 11 },
  { name: "ivy", points: 860, solved: 10 },
  { name: "charlie", points: 640, solved: 9 },
  { name: "eric", points: 720, solved: 8 },
  { name: "fred", points: 450, solved: 5 },
  { name: "john", points: 410, solved: 4 },
  { name: "john", points: 410, solved: 4 },
  { name: "john", points: 410, solved: 4 },
  { name: "john", points: 410, solved: 4 },
  { name: "john", points: 410, solved: 4 },
  { name: "john", points: 410, solved: 4 },
  { name: "john", points: 410, solved: 4 },
];

const ScoreboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo textdecoration_none">
          <span className="logo-gradient">secXplore</span>
        </Link>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/" className="textdecoration_none">
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/scoreboard" className="textdecoration_none">
              <span>Scoreboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <span>About us</span>
          </li>
          <li className="nav-item">
            <span>Account</span>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-overlay" />
        <div className="dashboard-header-content">
          <h2>Scoreboard</h2>
          <p className="muted">Ranked by points</p>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <h3>Leaderboard</h3>

        <div className="lb-wrap lb-wrap--center">
          <table className="lb">
            <thead>
              <tr>
                <th className="lb-th--sm">#</th>
                <th>Name</th>
                <th>Points</th>
                <th>Solved</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE.map((r, i) => (
                <tr key={r.name}>
                  <td className="lb-td--sm">{i + 1}</td>
                  <td className="lb-name">{r.name}</td>
                  <td>{r.points.toLocaleString()}</td>
                  <td>{r.solved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoreboardPage;
