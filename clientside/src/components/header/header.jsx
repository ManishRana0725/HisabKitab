
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AuthContext } from "../authcontext"; // Import Auth Context

import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext); // ✅ Now user is globally managed

  return (
    <header className="header">
      <div className="logo">
        <h1>HisabKitab</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allfriends">Friends</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/allevent">Events</Link></li>
        </ul>
      </nav>

      <div className="cta">
        {!user ? (
          <>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="signup-btn">Signup</button></Link>
          </>
        ) : (
          <Link to="/profile">
            <BsFillPersonFill className="profile-icon" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
