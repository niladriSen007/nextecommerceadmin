import { connection } from "@/database/connection";
import { Collection } from "@/models/Collection";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";




export const GET = async (req: NextRequest,{params} : {params : {collectionId : string}} ) => {

  await connection();


    const userToken = req.cookies.get("token")?.value;
  
    if (!userToken) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }
  
    const { collectionId } = params;
  
    try {
      if (!collectionId) {
        return NextResponse.json({
          error: "Please provide collection id",
          status: 400,
        });
      }
  
      const collection = await Collection?.findById(collectionId);
  
      if (!collection) {
        return NextResponse.json({
          error: "Collection not found",
          status: 404,
        });
      }
  
      return NextResponse.json({
         collection,
        status: 200,
        success: true,
      });
    } catch (error) {
      console.log("Error fetching collection", error);
      return NextResponse.json({
        error: "Error fetching collection",
        status: 500,
      });
    }
  }


export const PUT = async (req: NextRequest,{params} : {params : {collectionId : string }}) => {

  await connection();


    const userToken = req.cookies.get("token")?.value;
  
    if (!userToken) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }
  

    const {collectionId} = params;
    const data = await req.json();

  
    try {
      if (!collectionId) {
        return NextResponse.json({
          error: "Please provide all fields",
          status: 400,
        });
      }
  
      const collection = await Collection.findByIdAndUpdate(collectionId, {...data}, {
        new: true,
      });

      if (!collection) {
        return NextResponse.json({
          error: "Collection not found",
          status: 404,
        });
      }

      await collection.save();
  
      return NextResponse.json({
        collection,
        status: 201,
        success: true,
      });
    } catch (error) {
      console.log("Error creating collection", error);
      return NextResponse.json({
        error: "Error creating collection",
        status: 500,
      });
    }
  }
export const DELETE = async (req: NextRequest,{params} : {params : {collectionId : string}} ) => {


  await connection();
  
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


  
      await Product.updateMany(
        { collections: collectionId },
        { $pull: { collections: collectionId } }
      );

  
      return NextResponse.json({
        message: "Collection deleted successfully",
        status: 200,
        success: true,
      });

      
    } catch (error) {
      console.log("[collectionId_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }