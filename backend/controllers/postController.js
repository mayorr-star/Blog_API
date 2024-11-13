const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const postModel = require("../models/posts");
const commentModel = require("../models/comments");
const { validateNewPost } = require("../utilis/validators/validators");
const { NotFoundError } = require("../middlewares/errors/errorHandlers");

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postModel.getAllPosts();
  if (!posts) throw new NotFoundError("Posts not found");
  res.json({ posts });
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await postModel.getPostById(postId);
  if (!post) throw new NotFoundError("Post not found");
  res.json({ post });
});

const createPost = [
  validateNewPost,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    const { title, content, publish } = req.body;
    const { authorId } = req.params;
    const post = await postModel.createPost(title, content, authorId, publish);
    res.status(201).json({ message: "Post created...", post });
  }),
];

const updatePost = [
  validateNewPost,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    const { title, content, publish } = req.body;
    const { postId } = req.params;
    const updatedPost = await postModel.updatePost(
      title,
      content,
      postId,
      publish
    );
    res.json({ message: "Post updated...", updatedPost });
  }),
];

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  await commentModel.deleteCommentByPostId(postId);
  await postModel.deletePost(postId);
  res.json({ message: "Post deleted..." });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
