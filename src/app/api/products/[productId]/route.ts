import { connection } from "@/database/connection";
import { Collection } from "@/models/Collection";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  await connection();

  /* const userToken = req.cookies.get("token")?.value;

  if (!userToken) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  } */

  const { productId } = params;

  try {
    if (!productId) {
      return NextResponse.json({
        error: "Please provide all fields",
        status: 400,
      });
    }

    const product = await Product.findById(productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return NextResponse.json({
        error: "Product not found",
        status: 404,
      });
    }

    return NextResponse.json({
      status: 200,
      product,
    });
  } catch (error) {
    console.log("Error fetching product", error);
    return NextResponse.json({
      error: "Error fetching product",
      status: 500,
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  await connection();

  const userToken = req.cookies.get("token")?.value;

  if (!userToken) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  }

  const { productId } = params;

  try {
    if (!productId) {
      return NextResponse.json({
        error: "Please provide all fields",
        status: 400,
      });
    }

    const product = await Product.findByIdAndDelete(productId);

    await Promise.all(
      product?.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product?._id },
        })
      )
    );

    return NextResponse.json({
      status: 204,
      success: true,
    });
  } catch (error) {
    console.log("Error deleting product", error);
    return NextResponse.json({
      error: "Error deleting product",
      status: 500,
    });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  await connection();

  const userToken = req.cookies.get("token")?.value;

  if (!userToken) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  }

  const { productId } = params;

  try {
    if (!productId) {
      return NextResponse.json({
        error: "Please provide all fields",
        status: 400,
      });
    }

    const data = await req.json();
    const {collections} = data;

    const product = await Product.findById(productId);
   

    if (!product) {
      return NextResponse.json({
        error: "Product not found",
        status: 404,
      });
    }

    //if we add new collections to the product
    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );
    //if we remove collections from the product
    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );

    await Promise.all([
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product?._id },
        })
      ),
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product?._id },
        })
      ),
    ]);


    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...data,
        collections,
      },
      { new: true }
    ).populate({path:"collections", model: Collection});

    await updatedProduct?.save();

    return NextResponse.json({
      updatedProduct,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log("Error updating product", error);
    return NextResponse.json({
      error: "Error updating product",
      status: 500,
    });
  }
};
