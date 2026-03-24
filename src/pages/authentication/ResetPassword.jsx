import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.resetToken || "";

  const [inputValue, setInputValue] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  // Redirect if no resetToken
  useEffect(() => {
    if (!resetToken) navigate("/forget-password");
  }, [resetToken, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors({ ...errors, [name]: "Please fill out this field" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!inputValue.newPassword.trim())
      newErrors.newPassword = "Please fill out this field";
    else if (inputValue.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";

    if (!inputValue.confirmPassword.trim())
      newErrors.confirmPassword = "Please fill out this field";
    else if (inputValue.newPassword !== inputValue.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        { resetToken, newPassword: inputValue.newPassword },
      );

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => navigate("/login"), 1500);
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

  const PasswordInput = ({ id, name, value, placeholder, show, onToggle }) => (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        onBlur={handleBlur}
        className={errors[name] ? "input-error" : ""}
        style={{ width: "100%", paddingRight: "40px" }}
      />
      <span
        onClick={onToggle}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#a0aec0",
          display: "flex",
          alignItems: "center",
        }}
      >
        {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </span>
    </div>
  );

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
            <h1>Reset Password</h1>
            <p>Set your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <PasswordInput
                id="newPassword"
                name="newPassword"
                value={inputValue.newPassword}
                placeholder="Enter new password"
                show={showNewPassword}
                onToggle={() => setShowNewPassword(!showNewPassword)}
              />
              {errors.newPassword && (
                <span className="error-message">{errors.newPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={inputValue.confirmPassword}
                placeholder="Confirm new password"
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loader"></span>
              ) : (
                "Reset Password"
              )}
            </button>
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

export default ResetPassword;
