import { connection } from "@/database/connection";
import { comparePass } from "@/helpers/comparePass";
import { generateJwtToken } from "@/helpers/generateJwtToken";
import { sendMailToUser } from "@/helpers/sendMailToUser";
import { Admin } from "@/models/Admin";

import { NextRequest, NextResponse } from "next/server";



export const POST = async (req: NextRequest) => {

  await connection();

  try {
    const data = await req.json();
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json({
        error: "Please provide all fields",
        status: 400,
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    // console.log(existingAdmin)

    const comparePassword = await comparePass(password, existingAdmin.password);

    if (!existingAdmin || !comparePassword) {
      return NextResponse.json({
        error: "Invalid credentials",
        status: 400,
      });
    }

    const token = generateJwtToken(existingAdmin._id);

    // await sendMailToUser(email, 'VERIFY', admin._id);

    existingAdmin.verificationToken = token;

    await existingAdmin.save();

    const response = NextResponse.json({
      message: "Admin Logged in successfully",
      // existingAdmin,
      token,
      status: 200,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log("Error creating admin", error);
    return NextResponse.json({
      error: "Error creating admin",
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";