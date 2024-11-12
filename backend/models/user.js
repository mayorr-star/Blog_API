const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (username, email, password) => {
  await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
};

const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  return user;
};

module.exports = { createUser, getUserByUsername };
