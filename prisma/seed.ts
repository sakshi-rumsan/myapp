import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDatabase() {
  const users = [
    { email: 'cat@example.com', password: 'password1', roles: ['user'] },
  
    // Add more user objects as needed, ensuring unique email addresses
  ];

  // Filter out duplicate emails before creating users
  const uniqueUsers = users.filter(
    (user, index, self) => index === self.findIndex(u => u.email === user.email)
  );

  await prisma.user.createMany({ data: uniqueUsers });
}

async function main() {
  await seedDatabase();
  await prisma.$disconnect();
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
