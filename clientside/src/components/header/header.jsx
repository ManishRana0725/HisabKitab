// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// import { BsFillPersonFill } from "react-icons/bs"; // Bootstrap icon

// import "./Header.css";

// const Header = () => {
//   const [user, setUser] = useState(null);

//   // Function to check token validity
//   const checkUser = () => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const currentTime = Date.now() / 1000;

//         if (decoded.exp > currentTime) {
//           setUser(decoded); // Store user info if token is valid
//         } else {
//           localStorage.removeItem("token");
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem("token");
//         setUser(null);
//       }
//     } else {
//       setUser(null);
//     }
//   };

//   // Run when the component mounts
//   useEffect(() => {
//     checkUser(); // Check token validity on mount

//     // Listen for storage changes (e.g., when a user logs in)
//     const handleStorageChange = () => {
//       checkUser();
//     };

//     window.addEventListener("storage", handleStorageChange);
    
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

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
//         </ul>
//       </nav>

//       <div className="cta">
//         {user ? (
//           <Link to="/profile">
//             <BsFillPersonFill className="profile-icon" />
//           </Link>
//         ) : (
//           <>
//             <Link to="/login"><button className="login-btn">Login</button></Link>
//             <Link to="/signup"><button className="signup-btn">Signup</button></Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };

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
