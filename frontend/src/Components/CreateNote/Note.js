import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Navbar from "../Navbar/Navbar";
import Addnote from "../AddNote/Addnote";

const Note = () => {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [addlist, setAddlist] = useState([]);
  const [user, setUser] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          "http://localhost:4000/api/v1/getNotes",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.data.message === "Token Valid") {
          setAddlist(response.data.UserData);
        }
      }
    } catch (error) {
      console.error("Error in Getting notes:", error);
      toast.error("Error: " + error.response.data.message, {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const user = jwtDecode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        getNotes();
      }
    }
  }, [navigate]);

  const addNotes = async () => {
    const { title, description } = user;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login to Add Notes", { theme: "colored" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    if (!title || !description) {
      if (!title && description) {
        setAlertMessage("Title is required");
      } else if (title && !description) {
        setAlertMessage("Description is required");
      } else {
        setAlertMessage("Both title and description are required");
      }

      setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
        setAlertMessage(null);
      }, 3000);

      return;
    }

    if (title.length < 3 || title.length > 25) {
      toast.error("Title must be between 3 and 25 characters", {
        theme: "dark",
      });
      return;
    }

    if (description.length <= 5) {
      toast.error("Description must be greater than 5 characters", {
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/addNotes",
        user,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.data.message === "Notes Added Successfully") {
        toast.success(response.data.message, { theme: "dark" });
        getNotes();
        setUser({ title: "", description: "" });
      }
    } catch (error) {
      toast.error("Error: " + error.response.data.message, {
        theme: "colored",
      });
    }
  };

  // const LogOut = () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     toast.error("Please Login First", { theme: "colored" });
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
  //     return;
  //   }

  //   localStorage.removeItem("token");
  //   toast.success("Logged out successfully", { theme: "colored" });
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 2000);
  //   return;
  // };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex">
      <Navbar />

      <div className="flex-1 p-4 lg:ml-64">
        <ToastContainer autoClose={2000} style={{ marginTop: "20px" }} />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ marginTop: "10px" }}
        >
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
        </Snackbar>

        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Note</h2>
            <div>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                type="text"
                name="title"
                value={user.title}
                placeholder="Title"
                onChange={handleChange}
                required
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                name="description"
                value={user.description}
                onChange={handleChange}
                rows={5}
                placeholder="Add description..."
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={addNotes}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              >
                Add Note
              </button>
              {/* <button
                onClick={LogOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log Out
              </button> */}
            </div>
          </div>
        </div>

        <Addnote addlist={addlist} setAddlist={setAddlist} />
      </div>
    </div>
  );
};

export default Note;
