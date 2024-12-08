import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; // Import external CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faUserCircle } from "@fortawesome/free-solid-svg-icons"; // Import the icons

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    alert("You have logged out!");
  };

  return (
    <>
      <nav className="navbar custom-navbar">
        <Link className="navbar-brand" href="#">
          <img
            src="https://assets.tablesprint.com/images/logos/logoWithName.png"
            className="d-inline-block align-top"
            alt="TableSprint-Logo"
          />
        </Link>
        <div className="user-profile">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="2x" 
            className="user-icon"
            onClick={handleLogoutClick} // Handle icon click
          />
        </div>
      </nav>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="logoutModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header text-center flex-column">
                <h5 className="modal-title d-flex align-items-center" id="logoutModalLabel">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger me-2" />
                  Log Out
                </h5>
              </div>
              <div className="modal-body text-center">
              Are you sure you want to log out??
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  className="btn cancel-btn me-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="btn custom-btn"
                  onClick={handleConfirmLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
