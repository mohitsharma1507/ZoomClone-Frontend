// import React, { useContext, useState } from "react";
// import withAuth from "../utils/withAuth";
// import { useNavigate } from "react-router";
// import { IconButton, Button, TextField } from "@mui/material";
// import RestoreIcon from "@mui/icons-material/Restore";
// import Photo from "../assets/logo3.png";
// import "../App.css";
// import { AuthContext } from "../contexts/AuthContext";

// function Home() {
//   const navigate = useNavigate();
//   const [meetingCode, setMeetingCode] = useState("");
//   const { addToUserHistory } = useContext(AuthContext);
//   const handleJoinVideoCall = async () => {
//     await addToUserHistory(meetingCode);
//     navigate(`/${meetingCode}`);
//   };
//   const goToHistory = () => {
//     navigate("/history");
//   };

//   return (
//     <>
//       <div className="navbar">
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <h2 style={{ fontWeight: "bold" }}>Meetify</h2>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
//           <div className="historyBtn" onClick={goToHistory}>
//             <RestoreIcon />
//             <p>History</p>
//           </div>
//           <Button
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/");
//             }}
//           >
//             Logout
//           </Button>
//         </div>
//       </div>

//       <div className="meetContainer">
//         <div className="leftPanel">
//           <div>
//             <h2>Providing Quality Video Call Just Like Quality Education</h2>
//             <div style={{ display: "flex", gap: "18px" }}>
//               <TextField
//                 onChange={(e) => setMeetingCode(e.target.value)}
//                 id="outlined-basic"
//                 label="Meeting Code"
//                 variant="outlined"
//               />
//               <Button onClick={handleJoinVideoCall} variant="contained">
//                 Join
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="rightPanel">
//           <img srcSet={Photo} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default withAuth(Home);
import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Photo from "../assets/logo3.png";

function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="landingContainer">
      {/* ── NAV ── */}
      <nav>
        <div className="navHeader">
          <h2>Meetify</h2>
        </div>

        <div className="navList">
          <p onClick={() => navigate("/history")}>⏱ History</p>
          <div
            role="button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
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
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Enter Meeting Code"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoinVideoCall()}
              style={{
                padding: "0.75rem 1.2rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(255,99,71,0.4)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                width: "240px",
                backdropFilter: "blur(4px)",
              }}
            />
            <div
              className="ctaButton"
              onClick={handleJoinVideoCall}
              style={{ padding: "0.75rem 2rem" }}
            >
              <span
                style={{ color: "white", fontWeight: 600, fontSize: "1rem" }}
              >
                JOIN
              </span>
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
