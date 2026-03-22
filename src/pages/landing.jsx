// import React from "react";
// import "../App.css";
// import MobilePhoto from "../assets/mobile.png";
// import { Link, useNavigate } from "react-router-dom";

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="landingContainer">
//       <nav>
//         <div className="navHeader">
//           <h2> Meetify</h2>
//         </div>
//         <div className="navList">
//           <p
//             onClick={() => {
//               navigate("/ad1234");
//             }}
//           >
//             Join as a Guest
//           </p>
//           <p
//             onClick={() => {
//               navigate("/register");
//             }}
//           >
//             Register
//           </p>
//           <div role="button">
//             <p
//               onClick={() => {
//                 navigate("/login");
//               }}
//             >
//               Login
//             </p>
//           </div>
//         </div>
//       </nav>

//       <div className="landingMainContainer">
//         <div>
//           <h1>
//             <span style={{ color: "orangered" }}>Connect</span> with your loved
//             Ones
//           </h1>
//           <p>Cover a distance by Meetify Video Call</p>
//           <div role="button">
//             <Link to={"/register"}> Get Started</Link>
//           </div>
//         </div>
//         <div>
//           <img src={MobilePhoto} alt="Mobile Photo" />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import "../App.css";
import MobilePhoto from "../assets/mobile.png";
import BgImage from "../assets/background.png";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="landingContainer"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav>
        <div className="navHeader">
          <h2>Meetify</h2>
        </div>

        {/* Hamburger button - sirf mobile pe dikhega */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav links - mobile pe dropdown */}
        <div className={`navList ${menuOpen ? "navOpen" : ""}`}>
          <p
            onClick={() => {
              navigate("/ad1234");
              setMenuOpen(false);
            }}
          >
            Join as a Guest
          </p>
          <p
            onClick={() => {
              navigate("/register");
              setMenuOpen(false);
            }}
          >
            Register
          </p>
          <div
            role="button"
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="heroText">
          <h1>
            <span>Connect</span> with your loved Ones
          </h1>
          <p>Cover a distance by Meetify Video Call</p>
          <div role="button" className="ctaButton">
            <Link to={"/register"}>Get Started</Link>
          </div>
        </div>
        <div className="heroImage">
          <img src={MobilePhoto} alt="Mobile Photo" />
        </div>
      </div>
    </div>
  );
}
