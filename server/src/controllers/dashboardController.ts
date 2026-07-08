import "dotenv/config";
import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export const getDashboardMetrics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Run all independent database queries in parallel
    const [
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummaryRaw,
    ] = await Promise.all([
      prisma.products.findMany({
        take: 15,
        orderBy: {
          stockQuantity: "desc",
        },
      }),

      prisma.salesSummary.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      }),

      prisma.purchaseSummary.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      }),

      prisma.expenseSummary.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      }),

      prisma.expenseByCategory.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      }),
    ]);

    // Convert BigInt to string before sending JSON
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      }),
    );

    res.status(200).json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    console.error("Error retrieving dashboard metrics:", error);

    res.status(500).json({
      message: "Error retrieving dashboard metrics",
    });
  }
};