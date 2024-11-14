const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  console.log("Populating DB...");
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    // Create posts
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.lines({min: 1, max: 15}),
        content: faker.lorem.paragraphs({min: 50, max: 200}),
        author: { connect: { id: user.id } },
        published: true
      },
    });

    // Create comments
    const comment = await prisma.comment.create({
      data: {
        content: faker.lorem.paragraphs({min: 50, max: 200}),
        post: { connect: { id: post.id } },
        author: { connect: { id: user.id } },
      },
    });
  }
  console.log("DB populated.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
