import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, Alert, Snackbar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { pink } from "@mui/material/colors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Navbar/Navbar"; // Adjust the import path according to your project structure

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState(null); // State for the alert message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Name validation
  const validateName = (name) => {
    const pattern = /^[A-Za-z\s]+$/;
    return pattern.test(name) && name.length >= 5 && name.length <= 24;
  };

  // Email validation
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const RegisterData = async () => {
    const { name, email, password } = user;

    // if name, email and password exists
    if (name && email && password) {
      if (validateEmail(email) && validateName(name)) {
        if (password.length >= 6 && password.length <= 25) {
          try {
            // axios used to make HTTP POST request to a local server endpoint --> Axios is a promise-based library, so it uses the .then() method to handle responses asynchronously.
            const response = await axios.post(
              "http://localhost:4000/register",
              user
            );

            if (response.data.message === "Successfully Registered") {
              toast.success("Successfully Registered", { theme: "colored" });
              // After Login Successfully it will redirect user to the login page
              setTimeout(() => {
                navigate("/login"); // Redirect to the login page after 2 sec
              }, 2000);
            }
          } catch (error) {
            toast.error("Error: " + error.response.data.message, {
              theme: "colored",
            }); // error : user already registered or any other error
          }
        } else {
          toast.error("Password must be between 6 and 25 characters", {
            theme: "dark",
          });
        }
      } else if (!validateName(name)) {
        toast.error(
          "Name should be a minimum of 5 characters, a maximum of 24 characters, and may only consist of letters and spaces",
          {
            theme: "dark",
          }
        );
      } else {
        toast.error("Email must be in the format 'user@domain.com'", {
          theme: "dark",
        });
      }
    } else {
      if (
        (!name && !email && !password) ||
        (name && !email && !password) ||
        (!name && email && !password) ||
        (!name && !email && password)
      ) {
        setAlertMessage("Please enter your details");
      } else if (!name && password && email) {
        setAlertMessage("Name is required");
      } else if (!validateName(name)) {
        setAlertMessage("Invalid Name");
      } else if (!email && password && name) {
        setAlertMessage("Email is required");
      } else if (!validateEmail(email)) {
        setAlertMessage("Invalid email address");
      } else if (!password && email && name) {
        setAlertMessage("Password is required");
      }
      // Open the snackbar
      setOpenSnackbar(true);

      // Set a timeout to close the snackbar after 3 seconds
      setTimeout(() => {
        setOpenSnackbar(false);
        setAlertMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-grow items-center justify-center">
        <ToastContainer autoClose={2000} style={{ marginTop: "70px", marginRight: "-10px" }} />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000} // Auto-hide after 2 seconds
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ marginTop: "70px", marginRight: "-20px" }}
        >
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
        </Snackbar>
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <Avatar sx={{ bgcolor: pink[500] }}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 className="text-2xl font-bold text">Register</h2>
          </div>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 text-gray-900 border rounded focus:outline-none focus:border-blue-500"
              type="text"
              name="name"
              value={user.name}
              placeholder="Name *"
              onChange={handleChange}
              required
            />
            <input
              className="w-full px-4 py-2 text-gray-900 border rounded focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              value={user.email}
              placeholder="Email Address *"
              onChange={handleChange}
              required
            />
            <input
              className="w-full px-4 py-2 text-gray-900 border rounded focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              value={user.password}
              placeholder="Password *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={RegisterData}
              className="w-full py-2 mb-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
            <Link to="/login" className=" text-blue-500 hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
