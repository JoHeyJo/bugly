import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "./userContext";
import DropDown from "./DropDown";
import { useLocation } from 'react-router-dom';

type NavBarProp = {
  logout: () => Promise<void>;
}

function Navigation({ logout }: NavBarProp) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const currentURL = location.pathname;

  function loggedInNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to={`users/${user?.id}`}>
            Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {user?.firstName || user?.email}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
        <DropDown logout={logout} />
        <ul className="navbar-nav ms-auto">
          <li className="nav-item me-4">
            <NavLink className="nav-link" to={currentURL === '/' ? `users/5` : '/'}>
              {currentURL !== '/' ? 'Home' : 'Projects'}
            </NavLink>
          </li>
        </ul>
    </nav>
  )
}

export default Navigation;