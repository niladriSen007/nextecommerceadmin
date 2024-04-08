import { connection } from "@/database/connection";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";


connection();

export const POST = async (req: NextRequest) => {
  try {
    const userToken = req.cookies.get("token")?.value;

    if (!userToken) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }

    const data = await req.json();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = data;

    if (
      !title ||
      !description ||
      !media ||
      !category ||
      !price ||
      !expense
    ) {
      return NextResponse.json({
        error: "Please provide all fields",
        status: 400,
      });
    }

    const existingProduct = new Product({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });
    await existingProduct.save();

    return NextResponse.json({
      message: "Product created successfully",
      product: existingProduct,
      status: 200,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to create collection",
      status: 500,
    });
  }
};
