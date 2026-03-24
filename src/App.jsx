import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/landing";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import VideoMeetComponent from "./pages/videomeet";
import Home from "./pages/home";
import { AuthProvider } from "./contexts/AuthContext";
import History from "./pages/history";
import OTPVerification from "./pages/authentication/OTP";
import ForgetPassword from "./pages/authentication/ForgetPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import VerifyForgotPasswordOTP from "./pages/authentication/VerifyForgetOtp";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/verify-otp" element={<OTPVerification />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route
            path="/verify-forgot-password-otp"
            element={<VerifyForgotPasswordOTP />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/:url" element={<VideoMeetComponent />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
