const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const deleteCommentByPostId = async (postId) => {
  await prisma.comment.deleteMany({
    where: {
      postId: postId,
    },
  });
};

const deleteComment = async (id, authorId) => {
  await prisma.comment.delete({
    where: {
      id: id,
      authorId: authorId,
    },
  });
};

const createComment = async (content, authorId, postId) => {
  const comment = await prisma.comment.create({
    data: {
      content: content,
      authorId: authorId,
      postId: postId,
    },
  });
  return comment;
};

const updateComment = async (id, authorId, content) => {
  await prisma.comment.update({
    where: {
      id: id,
      authorId: authorId,
    },
    data: {
      content: content,
    },
  });
};

module.exports = {
  deleteCommentByPostId,
  deleteComment,
  createComment,
  updateComment,
};
