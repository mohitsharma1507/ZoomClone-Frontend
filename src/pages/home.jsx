import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Photo from "../assets/logo3.png";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;

    try {
      setLoading(true);
      await addToUserHistory(meetingCode);
      navigate(`/${meetingCode}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landingContainer">
      {/* ── NAV ── */}
      <nav>
        <div className="navHeader">
          <h2>Meetify</h2>
        </div>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              transform: menuOpen
                ? "rotate(45deg) translate(5px, 5px)"
                : "none",
            }}
          />
          <span
            style={{
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "none",
            }}
          />
          <span
            style={{
              transform: menuOpen
                ? "rotate(-45deg) translate(5px, -5px)"
                : "none",
            }}
          />
        </button>

        {/* Nav Links */}
        <div className={`navList ${menuOpen ? "navOpen" : ""}`}>
          <p
            onClick={() => {
              navigate("/history");
              closeMenu();
            }}
          >
            ⏱ History
          </p>
          <div
            role="button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
              closeMenu();
            }}
          >
            <p>Logout</p>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="landingMainContainer">
        <div className="heroText">
          <h1>
            Providing Quality <span>Video Calls</span> Just Like Quality
            Education
          </h1>
          <p>
            Connect seamlessly with anyone, anywhere. Enter your meeting code
            below to join instantly.
          </p>

          {/* Input Row */}
          <div className="inputRow">
            <input
              type="text"
              disabled={loading}
              placeholder="Meeting Code E.g. abc123"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              onKeyDown={(e) =>
                !loading && e.key === "Enter" && handleJoinVideoCall()
              }
            />
            <div
              className="ctaButton"
              onClick={!loading ? handleJoinVideoCall : null}
              style={{
                opacity: loading ? 0.7 : 1,
                pointerEvents: loading ? "none" : "auto",
              }}
            >
              {loading ? <span className="loader"></span> : <span>JOIN</span>}
            </div>
          </div>
        </div>

        <div className="heroImage">
          <img src={Photo} alt="Video call illustration" />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home);
