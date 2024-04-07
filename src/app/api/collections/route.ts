import { connection } from "@/database/connection";
import { Collection } from "@/models/Collection";

import { NextRequest, NextResponse } from "next/server";

connection();

export const POST = async (req: NextRequest) => {
  const userToken = req.cookies.get("token")?.value;

  if (!userToken) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  }

  try {
    const data = await req.json();
    const { title, description, image } = data;

    if (!title || !description || !image) {
      return NextResponse.json({
        error: "Please provide all fields",
        status: 400,
      });
    }

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return NextResponse.json({
        error: "Collection already exists",
        status: 400,
      });
    }

    const collection = new Collection({
      title,
      description,
      image,
    });

    await collection.save();

    return NextResponse.json({
      message: "Collection created successfully",
      collection,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log("Error creating collection", error);
    return NextResponse.json({
      error: "Error creating collection",
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  const userToken = req.cookies.get("token")?.value;

  if (!userToken) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  }

  try {
    const collections = await Collection.find().sort({ createdAt: -1 });

    return NextResponse.json({
      collections,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching collections", error);
    return NextResponse.json({
      error: "Error fetching collections",
      status: 500,
    });
  }
};


