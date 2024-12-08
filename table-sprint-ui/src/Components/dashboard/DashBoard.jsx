import React from 'react'
import './DashBoard.css';
import "bootstrap/dist/css/bootstrap.min.css";

const DashBoard = () => {
  return (

    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <img
        className='mb-3'
          src="https://assets.tablesprint.com/images/logos/logoWithName.png" // Replace with the actual logo URL
          alt="TableSprint Logo"
          style={{ width: '200px', height: '40px' }}
        />
        <p className=" font-monospace fw-semibold">Welcome to TableSprint admin</p>
      </div>
    </div>
  )
}

export default DashBoard