import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../Navbar/Navbar"; // Update to the correct import path for Sidebar
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState(null); // State for the alert message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Email validation
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const LoginData = async () => {
    const { email, password } = user;

    if (email && password) { // if email and password both exists
      if (validateEmail(email)) {
        if (password.length >= 6 && password.length <= 25) {

          try {
            const response = await axios.post("http://localhost:4000/login", user)
            if (response.data.UserData.userToken) {
              localStorage.setItem("token", response.data.UserData.userToken); // store token on user local storage
              toast.success(`${response.data.UserData.LoginUser.name} Login Successfully`, { theme: "colored" });
              setTimeout(() => {
                navigate("/note"); // Redirect to the note page after 2 sec
              }, 2000);
            }
          }
          catch (error) {
            toast.error("Error: " + error.response.data.message, {
              theme: "colored",
            }); // error : user already registered or any other error
          }

        } else {
          toast.error("Password must be between 6 and 25 characters", {
            theme: "dark",
          });
        }
      } else {
        toast.error("Email must be in the format 'user@domain.com", {
          theme: "dark",
        });
      }
    } else {
      if (!email && !password) {
        setAlertMessage("Please enter your details");
      } else if (!email && password) {
        setAlertMessage("Email is required");
      } else if (!validateEmail(email)) {
        setAlertMessage("Invalid email address");
      } else if (!password && email) {
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center h-screen bg-gray-200">
        <ToastContainer autoClose={2000} />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000} // Auto-hide after 2 seconds
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
        </Snackbar>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-4">
            <Avatar sx={{ bgcolor: "orange" }}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <h1 className="text-2xl font-semibold text-center mb-6">LOGIN</h1>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              value={user.email}
              placeholder="Email Address *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
              onClick={LoginData}
              className="w-full py-2 mb-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
            <Link to="/register" className="text-blue-500 hover:underline">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
