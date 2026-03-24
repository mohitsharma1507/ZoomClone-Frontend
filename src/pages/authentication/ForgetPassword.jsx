import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import "./Login.css"; // reuse same CSS

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please fill out this field");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email },
      );

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => {
          navigate("/verify-forgot-password-otp", { state: { email } });
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

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/login")}
          >
            <FaArrowLeft />
          </button>

          <div className="login-header">
            <h1>Forgot Password</h1>
            <p>Enter your email to receive an OTP</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onBlur={() => {
                  if (!email.trim()) setError("Please fill out this field");
                }}
                className={error ? "input-error" : ""}
              />
              {error && <span className="error-message">{error}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="btn-loader"></span> : "Send OTP"}
            </button>

            <div className="register-link">
              Remember your password?{" "}
              <span
                style={{ cursor: "pointer", color: "#ff6347", fontWeight: 600 }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
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

export default ForgotPassword;
