const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the authorization header
    const token = authHeader.slice(7);

    // Verify the token
    jwt.verify(token, PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      // Store the user object in the request for later use
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Middleware to check if user is an admin
const checkAdminRole = (req, res, next) => {
  if (req.user && req.user.role === "1") {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};

module.exports = {
  authenticateUser,
  checkAdminRole,
};
