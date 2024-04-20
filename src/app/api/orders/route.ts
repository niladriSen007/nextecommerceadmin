import { connection } from "@/database/connection";
import Customer from "@/models/Customer";
import Order from "@/models/Order";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  await connection();

  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    const orderDetails = await Promise.all(orders.map(async (order) => {
      const customer = await Customer.findOne({
        customerId: order?.customerId,
      });

      return {
        _id: order?._id,
        customer: customer?.name,
        products: order.products.length,
        totalAmount: order?.totalAmount,
        createdAt: format(order?.createdAt, "dd MMM yyyy"),
      };
    }));

    return NextResponse.json({
      orders: orderDetails,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log("Error getting orders", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
};
