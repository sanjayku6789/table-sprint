import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import ForgotPassword from "../forgetpassword/ForgetPassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login Error:", err);
    }
  };

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const handleShowForgotPassword = () => setShowForgotPassword(true);
  const handleCloseForgotPassword = () => setShowForgotPassword(false);

  return (
    <div className="login-container">
      <div className="card-container">
        <div className="text-center mb-4">
          <img
            src="https://assets.tablesprint.com/images/logos/logoWithName.png"
            alt="TableSprint Logo"
            className="logo"
          />
          <p className="card-subtitle">Welcome to TableSprint admin</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInput}
            type="email"
            name="email"
            value={values.email}
            className="form-control mb-2"
            id="email"
            placeholder="Email-id"
          />
          <input
            onChange={handleInput}
            type="password"
            name="password"
            value={values.password}
            className="form-control mb-2 mt-4"
            id="password"
            placeholder="Password"
          />

          <div className="d-flex justify-content-between align-items-end mb-3">
            <div className="d-flex ms-auto">
              <button
                type="button"
                className="btn btn-link forgot-password"
                onClick={handleShowForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-login w-100 mt-4">
            Log In
          </button>

          {message && <p className="text-success mt-3">{message}</p>}
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </div>

      {showForgotPassword && (
        <ForgotPassword onClose={handleCloseForgotPassword} />
      )}
    </div>
  );
};

export default Login;
