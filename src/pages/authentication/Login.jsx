import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors({
        ...errors,
        [name]: `Please fill out this field`,
      });
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(inputValue).forEach((key) => {
      if (!inputValue[key].trim()) {
        newErrors[key] = `Please fill out this field`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true },
      );
      console.log(data);
      const { success, message, token } = data;
      if (success) {
        localStorage.setItem("token", token);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      handleError(message);
    } finally {
      setLoading(false);
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <button type="button" className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Login to continue your journey</p>
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
                onChange={handleOnChange}
                onBlur={handleBlur}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  className={errors.password ? "input-error" : ""}
                  style={{ width: "100%", paddingRight: "40px" }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
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
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <div style={{ textAlign: "right", marginTop: "-0.5rem" }}>
              <Link
                to="/forget-password"
                style={{
                  fontSize: "0.85rem",
                  color: "#ff6347",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="btn-loader"></span> : "Login"}
            </button>

            <div className="register-link">
              Don't have an account?{" "}
              <Link to={"/register"}>Create one now</Link>
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

export default Login;
