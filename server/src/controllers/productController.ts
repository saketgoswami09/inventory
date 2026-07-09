import "dotenv/config";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "../../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const search = req.query.search?.toString().trim();

    const products = await prisma.products.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,

      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);

    res.status(500).json({
      message: "Error retrieving products",
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      productId,
      name,
      price,
      rating,
      stockQuantity,
    } = req.body;

    if (
      typeof productId !== "string" ||
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof stockQuantity !== "number"
    ) {
      res.status(400).json({
        message:
          "productId, name, price, and stockQuantity are required",
      });

      return;
    }

    if (
      !productId.trim() ||
      !name.trim() ||
      price < 0 ||
      stockQuantity < 0 ||
      (rating !== undefined &&
        rating !== null &&
        (typeof rating !== "number" || rating < 0 || rating > 5))
    ) {
      res.status(400).json({
        message: "Invalid product data",
      });

      return;
    }

    const product = await prisma.products.create({
      data: {
        productId: productId.trim(),
        name: name.trim(),
        price,
        rating: rating ?? null,
        stockQuantity,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        message: "A product with this ID already exists",
      });

      return;
    }

    res.status(500).json({
      message: "Error creating product",
    });
  }
};