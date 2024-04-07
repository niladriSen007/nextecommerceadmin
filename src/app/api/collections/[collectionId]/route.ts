import { connection } from "@/database/connection";
import { Collection } from "@/models/Collection";
import { NextRequest, NextResponse } from "next/server";

connection();

export const DELETE = async (req: NextRequest,{params} : {params : {collectionId : string}} ) => {
    const userToken = req.cookies.get("token")?.value;
  
    if (!userToken) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }

    const { collectionId } = params;

    // console.log(params?.collectionId)
  
    try {

  
      if (!collectionId) {
        return NextResponse.json({
          error: "Please provide collection id",
          status: 400,
        });
      }
  
      const collection = await Collection.findByIdAndDelete(collectionId);
  
      if (!collection) {
        return NextResponse.json({
          error: "Collection not found",
          status: 404,
        });
      }
  
      return NextResponse.json({
        message: "Collection deleted successfully",
        status: 200,
        success: true,
      });
    } catch (error) {
      console.log("Error deleting collection", error);
      return NextResponse.json({
        error: "Error deleting collection",
        status: 500,
      });
    }
  }