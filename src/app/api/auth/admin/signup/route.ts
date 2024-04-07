import { connection } from "@/database/connection";
import { hashPassword } from "@/helpers/hashPassword";
import { sendMailToUser } from "@/helpers/sendMailToUser";
import { Admin } from "@/models/Admin";
import { NextRequest, NextResponse } from "next/server";

connection();

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        const { email, password, username } = data;
    
        if (!email || !password || !username) {
        return NextResponse.json({
            error: "Please provide all fields",
            status: 400,
        });
        }
    
        const existingAdmin = await Admin.findOne({ email });
    
        if (existingAdmin) {
        return NextResponse.json({
            error: "Admin already exists",
            status: 400,
        });
        }
    
        const hashedPass = await hashPassword(password);

        const admin = new Admin({
        email,
        password : hashedPass,
        username,
        });
    
        await admin.save();

        await sendMailToUser(email, 'VERIFY', admin._id);
    
        return NextResponse.json({
        message: "Admin created successfully",
        admin,
        status: 200,
        success: true,
        });
    } catch (error) {
        console.log("Error creating admin", error);
        return NextResponse.json({
        error: "Error creating admin",
        status: 500,
        });
    }
    };