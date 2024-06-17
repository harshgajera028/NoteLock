const Password = require("../Models/Password"); // import Password Model

// Import Error.js from Utils
const handleErrorResponse = require("../Utils/Error");

// Import Success.js from Utils
const handleSuccessResponse = require("../Utils/Success");

// API ---> TO ADD PASSWORD
exports.AddPassword = async (req, res) => {
  console.log(req.body);
  const { website, username, password } = req.body;

  console.log("REQ ID : ", req.user.id);
  console.log("REQ USER", req.user);
  console.log("REQ ", req);

  const userId = req.user.id;

  console.log(userId);

  try {
    if (!website || !username || !password) {
      throw new Error("Missing required fields");
    }

    const allPasswords = await Password.create({ website, username, password, userId });
    return handleSuccessResponse(
      res,
      201,
      "Password Added Successfully",
      allPasswords
    );
  } catch (error) {
    console.error("Error in AddPassword:", error); // Log the error for debugging
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API ---> TO FETCH PASSWORDS
exports.GetPasswords = async (req, res) => {
  const userId = req.user.id;

  try {
    const allUserPasswords = await Password.find({ userId });

    if (!allUserPasswords) {
      return handleErrorResponse(
        res,
        404,
        "Token is invalid. Please log in again",
        null
      );
    }

    return handleSuccessResponse(res, 200, "Token Valid", allUserPasswords);
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API ---> TO DELETE PASSWORD
exports.DeletePassword = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;

  try {
    const deletePassword = await Password.findByIdAndDelete(id);

    if (!deletePassword) {
      return handleErrorResponse(
        res,
        404,
        "Password not found or you don't have permission to delete it",
        null
      );
    }

    const AllUserPasswords = await Password.find({ userId });

    const obj = {
      ALLpasswords: AllUserPasswords,
      DeletedPassword: deletePassword,
    };

    return handleSuccessResponse(res, 200, "Password Deleted Successfully", obj);
  } catch (error) {
    console.log("Error in server", error);
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};
