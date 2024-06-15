import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addnote = ({ addlist, setAddlist }) => {

  const deletecards = async (id) => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteNotes",
        { id },
        {
          headers: {
            "x-access-token": token, // Include the token in the request headers
          },
        }
      );

      if (response.data.message === 'Note Deleted successfully') {
        setAddlist(response.data.UserData.ALLnotes); // Update the addlist with the remaining notes after deletion
        toast.success(response.data.message, { theme: "dark" });
      }
    } catch (error) {
      toast.error("Error: " + error.response.data.message, {
        theme: "dark",
      }); // Error in deleting note
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-around mt-12">
        {addlist.map((element) => (
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-96 mb-8 mx-4 text-white" key={element._id}>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className={`text-xl font-bold text-green-300 ${element.title.length > 14 ? "text-lg" : "text-xl"}`}>{element.title}</h1>
                <button onClick={() => deletecards(element._id)} className="text-2xl text-yellow-400 focus:outline-none">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
              <textarea className="text-white bg-gray-700 p-4 rounded-lg w-full h-40 resize-none outline-none" value={element.description} readOnly />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addnote;
