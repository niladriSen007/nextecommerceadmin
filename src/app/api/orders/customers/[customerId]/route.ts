import { connection } from "@/database/connection";
import Order from "@/models/Order";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  await connection();

  try {
    const { customerId } = params;

    const orders = await Order.find({ customerId })
      .populate({ path: "products.product", model: Product })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      orders,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log("Error getting orders", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
};

export const dynamic = "force-dynamic";
