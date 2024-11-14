const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter");
const commentRouter = require("./routes/commentRouter");
const {
  handleNotFoundError,
  handleServerError,
} = require("./middlewares/errors/middlewares");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts/:postId/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/user", authRouter);

app.use(handleNotFoundError);
app.use(handleServerError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);