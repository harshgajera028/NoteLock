import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Navbar/Navbar"; // Assuming Sidebar.js is in the same directory
import logo from "./logo.png"; // Update the path to your logo

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 bg-gradient-to-r from-blue-200 to-purple-200 p-4 sm:p-10 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
          }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center animate-fade-in">
            <img src={logo} alt="NoteLock Logo" className="w-24 h-24 mb-6 mx-auto" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 sm:mb-8">
              Welcome to NoteLock Platform
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6">
              Write, Edit, and Manage Notes with ease. Keep your Notes Confidential and Secure.
            </p>
            <div className="space-y-4">

              <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors mb-4">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
