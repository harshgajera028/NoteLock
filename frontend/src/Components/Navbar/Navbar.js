import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${
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
                className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Home
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link
                to="/login"
                className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Login
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link
                to="/register"
                className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Register
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link
                to="/note"
                className="block px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Add Notes
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <button
        className="fixed top-0 left-0 p-4 text-white lg:hidden focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      <div className="flex-1 p-10 lg:ml-64 bg-gray-100"> {/* Main content area with bg color */}
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
