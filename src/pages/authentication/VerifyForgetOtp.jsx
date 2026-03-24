import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import "./Login.css";

const VerifyForgotPasswordOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  // Redirect if no email in state
  useEffect(() => {
    if (!email) navigate("/forget-password");
  }, [email, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/verify-forgot-password-otp`,
        { email, otp },
      );

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => {
          navigate("/reset-password", {
            state: { resetToken: data.resetToken },
          });
        }, 1000);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      handleError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/resend-otp`,
        { email },
      );
      handleSuccess(data.message || "OTP resent!");
      setTimer(60);
      setCanResend(false);
      setOtp("");
      setError("");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to resend OTP. Try again.";
      handleError(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/forget-password")}
          >
            <FaArrowLeft />
          </button>

          <div className="login-header">
            <h1>Verify OTP</h1>
            <p>
              OTP sent to <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
                onBlur={() => {
                  if (!otp.trim()) setError("Please enter the OTP");
                }}
                className={error ? "input-error" : ""}
              />
              {error && <span className="error-message">{error}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="btn-loader"></span> : "Verify OTP"}
            </button>

            <div className="register-link">
              {canResend ? (
                <span
                  style={{
                    cursor: "pointer",
                    color: "#ff6347",
                    fontWeight: 600,
                  }}
                  onClick={!resendLoading ? handleResend : undefined}
                >
                  {resendLoading ? "Resending..." : "Resend OTP"}
                </span>
              ) : (
                <span style={{ color: "#a0aec0" }}>
                  Resend OTP in <strong>{timer}s</strong>
                </span>
              )}
            </div>
          </form>
          <ToastContainer />
        </div>

        <div className="login-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForgotPasswordOTP;
