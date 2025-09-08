import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

/** Seed challenges (deduped) */
const SEED_CHALLENGES = [
  // A01
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

function getInitialChallenges() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("sx_challenges_custom") || "[]"
    );
    return [...SEED_CHALLENGES, ...saved];
  } catch {
    return [...SEED_CHALLENGES];
  }
}

const DashboardPage = () => {
  const navigate = useNavigate();

  /** ---------- AUTH GUARD ---------- */
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      if (!u) {
        navigate("/login", { replace: true });
        return;
      }
      setUser(u);
    } catch {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  /** ---------- STATE ---------- */
  const [challenges, setChallenges] = useState(getInitialChallenges);

  // topics derived from current challenge list (for admin add dropdown)
  const TOPICS = useMemo(
    () => Array.from(new Set(challenges.map((c) => c.topic))).sort(),
    [challenges]
  );

  // Best times
  const [bestTimes, setBestTimes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sx_bestTimes") || "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem("sx_bestTimes", JSON.stringify(bestTimes));
  }, [bestTimes]);

  // Filters
  const [q, setQ] = useState("");
  const [diffFilter, setDiffFilter] = useState(null); // null => show all

  // Ripple
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0, id: null });

  // Admin modal
  const [showAdminModal, setShowAdminModal] = useState(false);
  const openAdminModal = () => setShowAdminModal(true);
  const closeAdminModal = () => setShowAdminModal(false);

  // Logout confirm modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const handleLogoutConfirm = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  // Admin form (no topicKey here—derived on submit)
  const [form, setForm] = useState({
    topic: TOPICS[0] || "Broken Access Control",
    difficulty: "Easy",
    title: "",
    blurb: "",
  });
  const [adminMsg, setAdminMsg] = useState("");

  const isAdmin = user?.role === "admin";

  /** ---------- HELPERS ---------- */
  const fmt = (ms) => {
    if (ms == null || !isFinite(ms)) return "—";
    const s = Math.floor(ms / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  /** ---------- FILTER/GROUP ---------- */
  const groupedByTopic = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = challenges.filter(
      (c) =>
        (!term ||
          c.title.toLowerCase().includes(term) ||
          c.topic.toLowerCase().includes(term) ||
          c.topicKey.toLowerCase().includes(term) ||
          c.blurb.toLowerCase().includes(term)) &&
        (!diffFilter || c.difficulty === diffFilter)
    );

    const map = new Map();
    for (const item of filtered) {
      if (!map.has(item.topicKey)) map.set(item.topicKey, []);
      map.get(item.topicKey).push(item);
    }

    const order = { Easy: 0, Medium: 1, Hard: 2 };
    for (const [k, arr] of map.entries()) {
      arr.sort(
        (a, b) => order[a.difficulty] - order[b.difficulty] || a.id - b.id
      );
      map.set(k, arr);
    }
    return map;
  }, [q, diffFilter, challenges]);

  /** ---------- EVENTS ---------- */
  const handleStartClick = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      show: false,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id,
    });
    requestAnimationFrame(() => {
      setRipple({
        show: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id,
      });
    });
    setTimeout(() => navigate(`/challenge${id}`), 160);
  };

  // click-unclick behavior: clicking the active difficulty clears to "show all"
  const handleDiffClick = (value) => {
    setDiffFilter((prev) => (prev === value ? null : value));
  };

  // Add challenge (derive topicKey from existing topic or fallback)
  const addChallenge = (e) => {
    e.preventDefault();
    const { topic, difficulty, title, blurb } = form;

    if (!title.trim() || !blurb.trim() || !topic.trim()) {
      setAdminMsg("Please fill in all fields.");
      return;
    }

    const derivedTopicKey =
      challenges.find((c) => c.topic === topic)?.topicKey || "CUSTOM";

    const newItem = {
      id: Date.now(),
      topicKey: derivedTopicKey,
      topic: topic.trim(),
      title: title.trim(),
      difficulty, // "Easy" | "Medium" | "Hard"
      blurb: blurb.trim(),
    };

    const next = [...challenges, newItem];
    setChallenges(next);

    // Persist only custom items
    const customOnly = next.filter(
      (c) => !SEED_CHALLENGES.some((s) => s.id === c.id)
    );
    localStorage.setItem("sx_challenges_custom", JSON.stringify(customOnly));

    setAdminMsg("Challenge added.");
    setForm((f) => ({ ...f, title: "", blurb: "" }));
    setTimeout(() => setAdminMsg(""), 1500);
    closeAdminModal();
  };

  /** ---------- RENDER ---------- */
  const renderTopic = (topicKey) => {
    const list = groupedByTopic.get(topicKey);
    if (!list || list.length === 0) return null;
    const topicName = list[0].topic;
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

        <div className="nav-right">
          <ul className="nav-links">
            <Link to="/" className="textdecoration_none">
              <li className="nav-item">
                <span>Home</span>
              </li>
            </Link>
            <Link to="/scoreboard" className="textdecoration_none">
              <li className="nav-item">
                <span>Scoreboard</span>
              </li>
            </Link>
            <li className="nav-item">
              <span>About us</span>
            </li>
            <li className="nav-item">
              <span>Account</span>
            </li>
            {/* Logout as plain nav item with confirm modal */}
            <li
              className="nav-item"
              onClick={() => setShowLogoutConfirm(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setShowLogoutConfirm(true);
              }}
            >
              <span>Log out</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-overlay" />
        <div className="dashboard-header-content">
          <h2>
            Welcome Back!{" "}
            <span className="muted">
              [{user?.username ?? "Username"}
              {isAdmin ? " • Admin" : ""}]
            </span>
          </h2>
          <p>
            Select a topic, then pick a question (difficulty shown on each
            card).
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {/* Admin actions (centered block) */}
        {isAdmin && (
          <section className="topic-section" style={{ marginTop: 0 }}>
            <div className="admin-actions">
              <h3 className="admin-title">For Admin JubJub</h3>
              <button
                type="button"
                className="button add-btn"
                onClick={openAdminModal}
                aria-haspopup="dialog"
                aria-expanded={showAdminModal}
              >
                Add new question
              </button>
            </div>
          </section>
        )}

        {/* Admin Add Challenge Modal */}
        {isAdmin && showAdminModal && (
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            onClick={closeAdminModal}
          >
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Add a new challenge</h3>

              <form onSubmit={addChallenge}>
                <div className="modal-grid">
                  {/* Topic dropdown */}
                  <div className="input-box" style={{ marginTop: 0 }}>
                    <label className="input-label">Topic</label>
                    <select
                      className="modal-select"
                      value={form.topic}
                      onChange={(e) =>
                        setForm({ ...form, topic: e.target.value })
                      }
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty dropdown */}
                  <div className="input-box" style={{ marginTop: 0 }}>
                    <label className="input-label">Difficulty</label>
                    <select
                      className="modal-select"
                      value={form.difficulty}
                      onChange={(e) =>
                        setForm({ ...form, difficulty: e.target.value })
                      }
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div className="input-box">
                  <label className="input-label">Title</label>
                  <input
                    type="text"
                    placeholder="Short title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                {/* Blurb */}
                <div className="input-box">
                  <label className="input-label">Blurb</label>
                  <input
                    type="text"
                    placeholder="One sentence description"
                    value={form.blurb}
                    onChange={(e) =>
                      setForm({ ...form, blurb: e.target.value })
                    }
                  />
                </div>

                {adminMsg && (
                  <div className="hint" style={{ marginTop: 8 }}>
                    {adminMsg}
                  </div>
                )}

                {/* Buttons with spacing */}
                <div className="btn-row">
                  <button type="submit" className="button">
                    Add Challenge
                  </button>
                  <button
                    type="button"
                    className="button ghost"
                    onClick={closeAdminModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  type="button"
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

        {/* Topics in known OWASP order */}
        {TOPIC_ORDER.map((k) => renderTopic(k))}

        {/* Custom topics (not in TOPIC_ORDER) */}
        {[
          ...new Set(
            Array.from(groupedByTopic.keys()).filter(
              (k) => !TOPIC_ORDER.includes(k)
            )
          ),
        ].map((k) => renderTopic(k))}

        {/* Empty state */}
        {Array.from(groupedByTopic.values()).every(
          (arr) => !arr || arr.length === 0
        ) && <div className="empty">No challenges match your search.</div>}
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Confirm Logout</h3>
            <p style={{ margin: "12px 0" }}>
              Are you sure you want to log out?
            </p>
            <div className="btn-row">
              <button
                type="button"
                className="button"
                onClick={handleLogoutConfirm}
              >
                Yes, Log out
              </button>
              <button
                type="button"
                className="button ghost"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
