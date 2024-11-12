const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const deleteCommentByPostId = async (postId) => {
  await prisma.comment.deleteMany({
    where: {
      postId: postId,
    },
  });
};

const deleteComment = async (id) => {
  await prisma.comment.delete({
    where: {
      id: id,
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

module.exports = { deleteCommentByPostId, deleteComment, createComment };
