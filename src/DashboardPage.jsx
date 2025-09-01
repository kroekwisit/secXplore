import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

/**
 * Data model:
 * - topicKey: keeps OWASP ordering if you want (A01..A10), but we don't show it in UI
 * - topic: topic header shown to users
 * - difficulty: "Easy" | "Medium" | "Hard"
 * - id: must be unique; Start -> /challenge{id}
 */
const CHALLENGES = [
  // A01 Broken Access Control — includes a new Hard item as requested
  {
    id: 1,
    topicKey: "A01",
    topic: "Broken Access Control",
    title: "Test question 1",
    difficulty: "Easy",
    blurb:
      "Find an insecure direct object reference to read another user's data.",
  },
  {
    id: 101,
    topicKey: "A01",
    topic: "Broken Access Control",
    title: "IDOR Basics",
    difficulty: "Easy",
    blurb:
      "Find an insecure direct object reference to read another user's data.",
  },
  {
    id: 102,
    topicKey: "A01",
    topic: "Broken Access Control",
    title: "Forced Browsing",
    difficulty: "Medium",
    blurb: "Access an admin-only page by guessing hidden paths.",
  },
  {
    id: 103,
    topicKey: "A01",
    topic: "Broken Access Control",
    title: "Privilege Escalation Chain",
    difficulty: "Hard",
    blurb: "Chain weak role checks to reach admin actions.",
  },

  // A02
  {
    id: 201,
    topicKey: "A02",
    topic: "Cryptographic Failures",
    title: "Weak Hash Disclosure",
    difficulty: "Medium",
    blurb: "Spot plaintext secrets or MD5 hashes in transit.",
  },
  {
    id: 201,
    topicKey: "A02",
    topic: "Cryptographic Failures",
    title: "Weak Hash Disclosure",
    difficulty: "Medium",
    blurb: "Spot plaintext secrets or MD5 hashes in transit.",
  },

  // A03
  {
    id: 301,
    topicKey: "A03",
    topic: "Injection",
    title: "SQLi Login Bypass",
    difficulty: "Hard",
    blurb: "Bypass login via classic SQL injection payloads.",
  },

  // A04
  {
    id: 401,
    topicKey: "A04",
    topic: "Insecure Design",
    title: "No Rate Limit",
    difficulty: "Easy",
    blurb: "Abuse missing rate-limits to brute-force a code.",
  },

  // A05
  {
    id: 501,
    topicKey: "A05",
    topic: "Security Misconfiguration",
    title: "Verbose Error Leaks",
    difficulty: "Easy",
    blurb: "Trigger a stack trace that reveals internals.",
  },

  // A06
  {
    id: 601,
    topicKey: "A06",
    topic: "Vulnerable & Outdated Components",
    title: "Known CVE Module",
    difficulty: "Medium",
    blurb: "Identify a dependency with a public CVE.",
  },

  // A07
  {
    id: 701,
    topicKey: "A07",
    topic: "Identification & Authentication Failures",
    title: "Weak Session ID",
    difficulty: "Hard",
    blurb: "Predictable session tokens let you hijack sessions.",
  },

  // A08
  {
    id: 801,
    topicKey: "A08",
    topic: "Software & Data Integrity Failures",
    title: "Unsigned Update",
    difficulty: "Medium",
    blurb: "Exploit a tampered update feed.",
  },

  // A09
  {
    id: 901,
    topicKey: "A09",
    topic: "Security Logging & Monitoring Failures",
    title: "Silent Attack",
    difficulty: "Easy",
    blurb: "Perform actions that leave no useful traces.",
  },

  // A10
  {
    id: 1001,
    topicKey: "A10",
    topic: "Server-Side Request Forgery (SSRF)",
    title: "Metadata Steal",
    difficulty: "Hard",
    blurb: "Pivot the server to internal metadata endpoints.",
  },
];

// Optional fixed order by OWASP; we won't display the key, just use it to order sections
const TOPIC_ORDER = [
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
];

const DashboardPage = () => {
  const navigate = useNavigate();

  // Optional best times (persist)
  const [bestTimes, setBestTimes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sx_bestTimes") || "{}");
    } catch {
      return {};
    }
  });
  useEffect(
    () => localStorage.setItem("sx_bestTimes", JSON.stringify(bestTimes)),
    [bestTimes]
  );

  // Search + difficulty filter
  const [q, setQ] = useState("");
  const [diffFilter, setDiffFilter] = useState(null); // null = show all

  // Ripple state
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0, id: null });

  const fmt = (ms) => {
    if (ms == null || !isFinite(ms)) return "—";
    const s = Math.floor(ms / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // Filter then group by topicKey (header shows only the topic name)
  const groupedByTopic = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = CHALLENGES.filter(
      (c) =>
        (!term ||
          c.title.toLowerCase().includes(term) ||
          c.topic.toLowerCase().includes(term) ||
          c.topicKey.toLowerCase().includes(term) ||
          c.blurb.toLowerCase().includes(term)) &&
        (!diffFilter || c.difficulty === diffFilter)
    );

    // group
    const map = new Map();
    for (const item of filtered) {
      if (!map.has(item.topicKey)) map.set(item.topicKey, []);
      map.get(item.topicKey).push(item);
    }

    // sort inside a topic: Easy → Medium → Hard → then by id
    const order = { Easy: 0, Medium: 1, Hard: 2 };
    for (const [k, arr] of map.entries()) {
      arr.sort(
        (a, b) => order[a.difficulty] - order[b.difficulty] || a.id - b.id
      );
      map.set(k, arr);
    }
    return map;
  }, [q, diffFilter]);

  const handleStartClick = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      show: false,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id,
    });
    requestAnimationFrame(() =>
      setRipple({
        show: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id,
      })
    );
    setTimeout(() => navigate(`/challenge${id}`), 160);
  };

  // click-unclick behavior: clicking the active difficulty clears to "show all"
  const handleDiffClick = (value) => {
    setDiffFilter((prev) => (prev === value ? null : value));
  };

  const renderTopic = (topicKey) => {
    const list = groupedByTopic.get(topicKey);
    if (!list || list.length === 0) return null;
    const topicName = list[0].topic; // display only the name
    return (
      <section className="topic-section" key={topicKey}>
        <h4 className="topic-title">{topicName}</h4>
        <div className="card-grid">
          {list.map((c) => (
            <article key={c.id} className="ch-card" tabIndex={0}>
              <header className="ch-head">
                <h5 className="ch-title">{c.title}</h5>
                <span className={`sev sev--${c.difficulty.toLowerCase()}`}>
                  {c.difficulty}
                </span>
              </header>
              <p className="ch-blurb">{c.blurb}</p>
              <div className="ch-meta">
                <span className="best">Best: {fmt(bestTimes[c.id])}</span>
              </div>
              <div className="ch-actions">
                <button
                  className="button"
                  onClick={(e) => handleStartClick(e, c.id)}
                >
                  <span>Start</span>
                  {ripple.show && ripple.id === c.id && (
                    <span
                      className="ripple-circle"
                      style={{ left: ripple.x, top: ripple.y }}
                    />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="dashboard-page">
      {/* Navbar */}
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
            <span>Scoreboard</span>
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
          <h2>
            Welcome Back! <span className="muted">[Username]</span>
          </h2>
          <p>
            Select a topic, then pick a question (difficulty shown on each
            card).
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <h3>Challenge Selection</h3>

        {/* Controls: centered search with difficulty on its right */}
        <div className="controls controls--centered">
          <div className="search-wrap">
            <input
              className="search"
              placeholder="Search by title/topic (e.g., 'Broken', 'SQLi', 'SSRF')"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search challenges"
            />

            <div className="segmented segmented--inline">
              {["Easy", "Medium", "Hard"].map((d) => (
                <button
                  key={d}
                  className={`seg-btn ${
                    diffFilter === d ? "seg-btn--active" : ""
                  }`}
                  onClick={() => handleDiffClick(d)}
                  aria-pressed={diffFilter === d}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Topics in OWASP order; header shows only topic name */}
        {TOPIC_ORDER.map(renderTopic)}

        {/* Empty state */}
        {TOPIC_ORDER.every(
          (k) => !groupedByTopic.get(k) || groupedByTopic.get(k).length === 0
        ) && <div className="empty">No challenges match your search.</div>}
      </div>
    </div>
  );
};

export default DashboardPage;
