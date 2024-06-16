import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking the presence of a token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const LogOut = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login First", { theme: "colored" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    localStorage.removeItem("token");
    toast.success("Logged out successfully", { theme: "colored" });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    return;
  };

  return (
    <div className="flex h-screen">
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 transition-transform transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-3xl font-extrabold text-white">NoteLock</span>
            <button
              className="lg:hidden text-white focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <ul className="flex flex-col flex-1">
            <li className="px-4 py-2">
              <Link
                to="/"
                className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-200 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="px-4 py-2">
                  <Link
                    to="/note"
                    className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-200 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Add Notes
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link
                    onClick={LogOut}
                    className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-200 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="px-4 py-2">
                  <Link
                    to="/login"
                    className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-200 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link
                    to="/register"
                    className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-200 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Hamburger button */}
      <button
        className={`fixed top-0 left-0 p-4 text-gray-900 lg:hidden focus:outline-none ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Main content */}
      <div className={`flex-1 p-10 transition-all duration-300 ${isOpen ? 'lg:ml-64' : ''}`}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
