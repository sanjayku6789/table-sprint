import React from "react";
import { NavLink } from 'react-router-dom';
import { FaHome, FaTh, FaCogs, FaBoxes } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css"; 

const NavBar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/home/dashboard" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
        <FaHome className="icon" />
        <span className="menu-text">Dashboard</span>
        <span className="arrow"></span>
      </NavLink>
      <NavLink to="/home/category" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
        <FaTh className="icon" />
        <span className="menu-text">Category</span>
        <span className="arrow"></span>
      </NavLink>
      <NavLink to="/home/SubCategory" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
        <FaCogs className="icon" />
        <span className="menu-text">Subcategory</span>
        <span className="arrow"></span>
      </NavLink>
      <NavLink to="/home/products" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
        <FaBoxes className="icon" />
        <span className="menu-text">Products</span>
        <span className="arrow"></span>
      </NavLink>
    </div>
  );
};

export default NavBar;
