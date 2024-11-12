const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
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

const createPost = async (title, content, authorId, published = false) => {
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: authorId,
      published: published,
    },
  });
  return post;
};

const updatePost = async (title, content, id, published = false) => {
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  return post;
};

const deletePost = async (id) => {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
