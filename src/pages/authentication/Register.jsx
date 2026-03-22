import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Registers from "../../assets/Register.png";
import { FaArrowLeft } from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
        [name]: "Please Fill Out this Field",
      });
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const newErrors = {};
    Object.keys(inputValue).forEach((key) => {
      if (!inputValue[key].trim()) {
        newErrors[key] = `Please fill out this field`;
      }
    });

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          ...inputValue,
        },
        { withCredentials: true },
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: inputValue.email } });
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-image-section">
          <img src={Registers} alt="Register Illustration" />
        </div>

        <div className="register-form-section">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <div className="register-header">
            <h1>Register Now</h1>
            <p>Join us and start connecting with your loved ones</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                onBlur={handleBlur}
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                onBlur={handleBlur}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>

            <div className="login-link">
              Already have an account? <Link to={"/login"}>Login here</Link>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Register;
