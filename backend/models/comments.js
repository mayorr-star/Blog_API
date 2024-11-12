const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const deleteCommentByPostId = async (postId) => {
  await prisma.comment.deleteMany({
    where: {
      postId: postId,
    },
  });
};

module.exports = { deleteCommentByPostId };
