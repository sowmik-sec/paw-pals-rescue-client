import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then()
      .catch((err) => console.error(err));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/pet-listing">Pet Listing</NavLink>
      </li>
      <li>
        <NavLink to="/donation-campaigns">Donation Campaigns</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Paw Pals Rescue
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <button onClick={toggleDropdown}>
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                title={user?.displayName}
                alt="User"
              />
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg z-10">
                <li>
                  <button onClick={handleLogout} className="block px-4 py-2">
                    Logout
                  </button>
                </li>
                <li>
                  <Link to="/dashboard" className="block px-4 py-2">
                    Dashboard
                  </Link>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
