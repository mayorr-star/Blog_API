const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      comments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return post;
};

module.exports = { getAllPosts, getPostById };
