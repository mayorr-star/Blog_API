const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const model = require("../models/user");
require("dotenv").config();

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bycrypt.hash(password, 10);
  await model.createUser(username, email, hashedPassword);
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await model.getUserByUsername(username);

  if (!user) 
    return res.status(401).json({ error: "Username or Password is incorrect" });

  // const isPasswordValid = await bycrypt.compare(password, user.password);
  // if (!isPasswordValid) return res.status(401).json({error: 'Username or Password is incorrect'});

  jwt.sign(
    { user },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" },
    (err, token) => {
      res.json({ token });
    }
  );
};

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.status(403).json({message: 'Forbidden'});
  } else {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
};

module.exports = { verifyToken, signIn, signUp };
