const express = require("express");
require("dotenv").config();
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter");
const commentRouter = require('./routes/commentRouter');
const { handleNotFoundError, handleServerError} = require('./middlewares/errors/middlewares');

const app = express();
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
