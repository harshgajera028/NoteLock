import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }
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
    localStorage.removeItem("username");
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
          {isLoggedIn && (
            <div className="px-4 py-3 flex items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPJ9v5toYgVGvYgOZNQu6DtFKTclFGmb9fV-BoJWs3-q3Oj9knQ9dX08PhbnXJ1PwbjY&usqp=CAU" // Placeholder image, replace with actual user image URL
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-lg font-medium text-gray-200">Hello {username}</span>
            </div>
          )}
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
