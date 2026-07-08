import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Run all independent queries in parallel
    const [
      popularProducts,
      salesSummary,
      purchases,
      purchaseSummary,
      expenses,
      expenseSummary,
      expenseByCategory,
    ] = await Promise.all([
      prisma.products.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      }),

      prisma.salesSummary.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      }),

      prisma.purchases.findMany({
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

      prisma.expenses.findMany({
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

      prisma.expenseByCategory.findMany(),
    ]);

    // Convert Prisma Decimal values to string for JSON serialization
    const formattedExpenseByCategory = expenseByCategory.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.status(200).json({
      popularProducts,
      salesSummary,
      purchases,
      purchaseSummary,
      expenses,
      expenseSummary,
      expenseByCategory: formattedExpenseByCategory,
    });
  } catch (error) {
    console.error("Error retrieving dashboard metrics:", error);

    res.status(500).json({
      message: "Error retrieving dashboard metrics",
    });
  }
};
