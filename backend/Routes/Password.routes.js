const express = require("express");
const router = express.Router();

const passwordController = require('../Controllers/Password.controllers'); // Import the password controller

const JWTauthMiddleware = require('../Middleware/checkAuth.middleware');

// Route to add a password
router.post("/api/v1/addPassword", JWTauthMiddleware, passwordController.AddPassword);

// Route to get all passwords
router.get("/api/v1/getPasswords", JWTauthMiddleware, passwordController.GetPasswords);

// Route to delete a password
router.post("/api/v1/deletePassword", JWTauthMiddleware, passwordController.DeletePassword);

module.exports = router;
