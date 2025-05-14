import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      { id: uuidv4(), name: "John Doe", email: "john@example.com", password: await bcrypt.hash("Password1234", 10) },
      { id: uuidv4(), name: "Jane Doe", email: "jane@example.com", password: await bcrypt.hash("Password1234", 10) },
      { id: uuidv4(), name: "Bob Smith", email: "bob@example.com", password: await bcrypt.hash("Password1234", 10) },
      { id: uuidv4(), name: "Alice Johnson", email: "alice@example.com", password: await bcrypt.hash("Password1234", 10) },
      { id: uuidv4(), name: "Charlie Brown", email: "charlie@example.com", password: await bcrypt.hash("Password1234", 10) },
    ]
  });

  console.log("Database seeded successfully");
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });