const model = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { validateNewComment } = require("../utilis/validators/validators");
const { validationResult } = require("express-validator");

const createComment = [
  validateNewComment,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { postId } = req.params;
    const { content } = req.body;
    const authorId = req.user.id;
    const comment = await model.createComment(content, authorId, postId);
    res.status(201).json({ comment });
  }),
];

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const authorId = req.user.id;
  await model.deleteComment(commentId, authorId);
  res.json({ message: "Comment deleted..." });
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = rea.body;
  const authorId = req.user.id;
  await model.updateComment(commentId, authorId, content);
  res.json({ message: "Comment updated..." });
});

module.exports = { createComment, deleteComment, updateComment };
