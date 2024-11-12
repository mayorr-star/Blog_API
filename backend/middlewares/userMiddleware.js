const jwt = require("jsonwebtoken");
require("dotenv").config();

const retrieveUser = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403);
    } else {
      req.user = authData.user;
      next();
    }
  });
};

module.exports = retrieveUser;