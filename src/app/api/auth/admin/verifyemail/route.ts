import { connection } from "@/database/connection";
import { Admin } from "@/models/Admin";
import { NextRequest, NextResponse } from "next/server";

connection();

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const { token } = data;

  console.log(token);

  if (!token) {
    return NextResponse.json({
      error: "Please provide all fields",
      status: 400,
    });
  }

  const user = await Admin.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({
      error: "User not found",
      status: 404,
    });
  }

  console.log(user)

  //   await updatedUser.save();

  user.isAdmin = true;
  user.verificationToken = null;
  user.verificationTokenExpires = null;

  await user.save();

  return NextResponse.json({
    message: "Email verified successfully",
    status: 200,
    success: true,
  });
};
