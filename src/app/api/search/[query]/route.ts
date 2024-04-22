import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
    const { query } = params;

    if (!query) {
      return {
        status: 400,
        json: {
          error: "No query provided",
        },
      };
    }

    const results  = await Product.find({ title: { $regex: new RegExp(query), $options: 'i' } });

    if (!results) {
      return {
        status: 404,
        json: {
          error: "No Such results found!",
        },
      };
    }

    return NextResponse.json({
      status: 200,
      results,
    });
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      json: {
        error: "No Such results found!",
      },
    };
  }
};


export const dynamic = "force-dynamic";