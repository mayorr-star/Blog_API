const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

const deleteCommentByPostId = asyncHandler(async(postId) => {
  await prisma.comment.deleteMany({
    where: {
      postId: postId,
    },
  });
});

const deleteComment = asyncHandler(async(id, authorId) => {
  await prisma.comment.delete({
    where: {
      id: id,
      authorId: authorId,
    },
  });
});

const createComment = asyncHandler(async(content, authorId, postId) => {
  const comment = await prisma.comment.create({
    data: {
      content: content,
      authorId: authorId,
      postId: postId,
    },
  });
  return comment;
});

const updateComment = asyncHandler(async(id, authorId, content) => {
  await prisma.comment.update({
    where: {
      id: id,
      authorId: authorId,
    },
    data: {
      content: content,
    },
  });
});

module.exports = {
  deleteCommentByPostId,
  deleteComment,
  createComment,
  updateComment,
};
