const Password = require("../Models/Password"); // import Password Model

//import Error.js from Utils
const handleErrorResponse = require("../Utils/Error");

// import Success.js from Utils
const handleSuccessResponse = require("../Utils/Success");

// API ---> TO ADD PASSWORD
exports.AddPassword = async (req, res) => {
  console.log(req.body);
  const { title, password, website } = req.body;

  // The authenticateJWT middleware will verify the token and attach decoded user information to req.user
  const userId = req.user.id;

  try {
    const newPassword = await Password.create({ title, password, website, userId });
    return handleSuccessResponse(res, 201, "Password Added Successfully", newPassword);
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API ---> TO FETCH PASSWORDS
exports.GetPasswords = async (req, res) => {
  const userId = req.user.id;

  try {
    const allUserPasswords = await Password.find({ userId });

    if (!allUserPasswords) {
      return handleErrorResponse(res, 404, "Token is invalid. Please log in again", null);
    }

    return handleSuccessResponse(res, 200, "Token Valid", allUserPasswords);
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API ---> TO DELETE PASSWORD
exports.DeletePassword = async (req, res) => {
  const { id } = req.body; // receive id from req.body/CLIENT
  const userId = req.user.id;

  try {
    const deletePassword = await Password.findByIdAndDelete(id); // Delete the password by _id

    if (!deletePassword) {
      return handleErrorResponse(res, 404, "Password not found or you don't have permission to delete it", null);
    }

    const AllUserPasswords = await Password.find({ userId }); // Fetch ALL passwords belonging to the userID

    const obj = {
      ALLpasswords: AllUserPasswords,
      DeletedPassword: deletePassword,
    };

    return handleSuccessResponse(res, 200, "Password Deleted successfully", obj);
  } catch (error) {
    console.log("error in server", error);
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};
