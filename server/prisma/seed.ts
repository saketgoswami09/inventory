import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import path from "path";

// Prisma 7 requires a driver adapter — url is no longer read from schema.prisma
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function deleteAllData(orderedFileNames: string[]) {
  // Deletion must be REVERSED to satisfy FK constraints:
  // children must be deleted before their parents.
  const reversed = [...orderedFileNames].reverse();

  for (const fileName of reversed) {
    // Prisma client exposes model names with a lowercase first letter
    // e.g. model Products → prisma.products, model SalesSummary → prisma.salesSummary
    const rawName = path.basename(fileName, path.extname(fileName));
    const model: any = (prisma as any)[rawName];

    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${rawName}`);
    } else {
      console.error(
        `Model "${rawName}" not found on PrismaClient. Check the file name matches the Prisma model (camelCase).`
      );
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Insertion order: parents before children
  //   products must come before sales & purchases (FK)
  //   expenseSummary must come before expenseByCategory (FK)
  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const rawName = path.basename(fileName, path.extname(fileName));
    const model: any = (prisma as any)[rawName];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({ data });
    }

    console.log(`Seeded ${rawName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
