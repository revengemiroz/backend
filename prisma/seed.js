const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedTodo() {
  const todo = [];

  for (let i = 100; i <= 200; i++) {
    todo.push({
      task: `task_${i}`,
      description: `desc_${i}`,
    });
  }

  for (const todoData of todo) {
    console.log('created', todoData.task);
    await prisma.todo.create({
      data: todoData,
    });
  }
}

async function main() {
  // Call your seeding function here
  await seedTodo();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
