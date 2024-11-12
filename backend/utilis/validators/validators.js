const { body } = require("express-validator");
const model = require("../../models/user");

const validateNewPost = [
  body("title").trim().notEmpty().withMessage("Please enter a title").escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Please type the post content")
    .escape(),
];

const validateNewUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please enter your username")
    .isLength({ min: 1, max: 50 })
    .withMessage("Username must cannot be greater than 50 characters")
    .custom(async (value) => {
      const user = await model.getUserByUsername(value);
      if (user) throw new Error("Username already exists");
    })
    .withMessage("Username already exists")
    .escape(),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await model.getUserByEmail(value);
      if (user) throw new Error("Email already exists");
    })
    .withMessage("Email already exists")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain a special character")
    .escape(),
  body("password_confirmation")
    .custom((value, { req }) => {
      {
        return value === req.body.password;
      }
    })
    .withMessage("Passwords do not match"),
];

const validateUserLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please enter your username")
    .escape(),
  body("password").trim().notEmpty().withMessage("Please enter password"),
];

const validateNewComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Please type your comment")
    .escape(),
];

module.exports = {
  validateNewComment,
  validateNewPost,
  validateNewUser,
  validateUserLogin,
};
