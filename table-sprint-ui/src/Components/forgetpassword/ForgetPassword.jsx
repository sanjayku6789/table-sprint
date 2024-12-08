import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgetPassword.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
const ForgotPassword = ({ onClose }) => {
  const handleBackToLogin = () => {
    onClose(); // Close the modal
  };

  return (
    <div
      className="modal fade show d-block forgot-password-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="forgotPasswordModalLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center w-100" id="forgotPasswordModalLabel">
              Did you forget password?
            </h5>
          </div>
          <div className="modal-body">
          <p className="text-center">Enter your email address and we’ll send you a link to restore password</p>
            
          
           
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
            />
            
            <button className="btn btn-primary btn-block w-100 mb-3">
              Submit
            </button>
            <p className="text-center">
              <Link
                to="#"
                className="text-decoration-none"
                onClick={handleBackToLogin}
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


