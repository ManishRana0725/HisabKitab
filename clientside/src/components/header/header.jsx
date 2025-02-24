// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo">
//         <h1>HisabKitab</h1>
//       </div>
//       <nav>
//         <ul className="nav-links">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/allfriends">Friends</Link></li>
//           <li><Link to="/transactions">Transactions</Link></li>
//           <li><Link to="/allevent">Events</Link></li>
//           <li><Link to="/profile">Profile</Link></li>
//         </ul>
//       </nav>
//       <div className="cta">
//         <Link to="/login"><button className="login-btn">Login</button></Link>
//         <Link to="/signup"><button className="signup-btn">Signup</button></Link>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { BsFillPersonFill } from "react-icons/bs"; // bootstrap icon

import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        const currentTime = Date.now() / 1000; // Get current time in seconds

        if (decoded.exp > currentTime) {
          setUser(decoded); // Store user info if token is valid
        } else {
          localStorage.removeItem("token"); // Remove expired token
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

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
        {user ? (
          <Link to="/profile">
            <BsFillPersonFill size={30} color="blue" />
          </Link>
        ) : (
          <>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="signup-btn">Signup</button></Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
