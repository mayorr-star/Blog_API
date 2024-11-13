const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { NotFoundError } = require("../middlewares/errors/errorHandlers");

const prisma = new PrismaClient();

const getAllPosts = asyncHandler(async () => {
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
  if (!posts) throw new NotFoundError("Posts not found");
  return posts;
});

const getPostById = asyncHandler(async (id) => {
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
  if (!post) throw new NotFoundError("Post not found");
  return post;
});

const createPost = asyncHandler(
  async (title, content, authorId, published = false) => {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
        published: published,
      },
    });
    return post;
  }
);

const updatePost = asyncHandler(
  async (title, content, id, published = false) => {
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
  }
);

const deletePost = asyncHandler(async (id) => {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
