const model = require("../models/posts");

const getAllPosts = async (req, res) => {
  const { published } = req.query;
  if (published) {
    const posts = await model.getAllPosts();
    res.json(posts);
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  const post = await model.getPostById(postId);
  res.json(post);
};

const createPost = async (req, res) => {
  res.json('post created...')
}

module.exports = { getAllPosts, getPostById, createPost };
