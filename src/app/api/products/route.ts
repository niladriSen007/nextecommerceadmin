import { connection } from "@/database/connection";
import { Collection } from "@/models/Collection";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req: NextRequest) => {
  await connection();

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

    if (!title || !description || !media || !category || !price || !expense) {
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

    if (collections) {
      collections.forEach(async (collection: string) => {
        const existingCollection = await Collection.findById(collection);
        if (existingCollection) {
          existingCollection.products.push(existingProduct?._id);
          await existingCollection.save();
        }
      });
    }

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

export const GET = async (req: NextRequest) => {
  await connection();

  /* let userToken = req.cookies.get("token")?.value;

  if (!userToken) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  } */

  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json({
      products,
      status: 200,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch products",
      status: 500,
    });
  }
};


export const dynamic = "force-dynamic";