const postModel = require("../models/posts");
const commentModel = require('../models/comments');
const { validationResult } = require("express-validator");
const { validateNewPost } = require("../utilis/validators/validators");

const getAllPosts = async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.json({ posts });
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  const post = await postModel.getPostById(postId);
  res.json({ post });
};

const createPost = [
  validateNewPost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    const { title, content, publish } = req.body;
    const { authorId } = req.params;
    const post = await postModel.createPost(title, content, authorId, publish);
    res.status(201).json({ message: "Post created...", post });
  },
];

const updatePost = [
  validateNewPost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    const { title, content, publish } = req.body;
    const { postId } = req.params;
    const updatedPost = await postModel.updatePost(title, content, postId, publish);
    res.json({ message: "Post updated...", updatedPost });
  },
];

const deletePost = async (req, res) => {
  const { postId } = req.params;
  await commentModel.deleteCommentByPostId(postId);
  await postModel.deletePost(postId);
  res.json({message: 'Post deleted...'})
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
