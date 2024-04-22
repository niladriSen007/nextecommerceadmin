
import { connection } from "@/database/connection";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async ( req:NextRequest, { params }: { params: { productId: string } } ) => {
    await connection();
    
    const { productId } = params;
    
    try {
        if (!productId) {
        return NextResponse.json({
            error: "Please provide all fields",
            status: 400,
        });
        }

        const product = await Product.findById(productId);
    
        const products = await Product.find({
            $or: [
                {category : product?.category},
                {tags : { $in : product?.tags}},
                {collections :{ $in : product?.collections}}
            ],
            _id: { $ne: productId }
        })
    
        if (!products) {
        return NextResponse.json({
            error: "Product not found",
            status: 404,
        });
        }
    
        return NextResponse.json({
        status: 200,
        products,
        });
    } catch (error) {
        console.log("Error fetching product", error);
        return NextResponse.json({
        error: "Error fetching product",
        status: 500,
        });
    }
    }


export const dynamic = "force-dynamic";