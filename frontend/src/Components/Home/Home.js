import React from "react";
import Sidebar from "../Navbar/Navbar"; // Assuming Sidebar.js is in the same directory

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-200 p-4 sm:p-10">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-8">
              Welcome to NoteVerse Platform
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
              Write, Edit, and Manage Notes at ease. Keep your Notes
              Confidential and Secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
