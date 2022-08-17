import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar ">
      <Link to="/" className="nav-item-logo">
        CF Frontend Homework
      </Link>
      <Link to="/add-invoice" className="nav-item-link">
        Add Invoice
      </Link>
    </nav>
  );
}

export default Navbar;
