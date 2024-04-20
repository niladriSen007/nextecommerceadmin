import { connection } from "@/database/connection";
import Customer from "@/models/Customer";
import Order from "@/models/Order";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { orderId: string } }
  ) => {
    await connection();
  
    /* const userToken = req.cookies.get("token")?.value;
  
    if (!userToken) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    } */
  
    const { orderId } = params;
  
    try {
      if (!orderId) {
        return NextResponse.json({
          error: "Please provide all fields",
          status: 400,
        });
      }
  
      const orderDetails = await Order.findById(orderId).populate({
        path: "products.product",
        model: Product,
      });
  
      if (!orderDetails) {
        return NextResponse.json({
          error: "Order not found",
          status: 404,
        });
      }

      const customer = await Customer.findOne({ customerId :  orderDetails.customerId});


  
      return NextResponse.json({
        status: 200,
        orderDetails,
        customer,
      });
    } catch (error) {
      console.log("Error fetching product", error);
      return NextResponse.json({
        error: "Error fetching product",
        status: 500,
      });
    }
  };