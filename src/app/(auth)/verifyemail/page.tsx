"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"

const VerifyEmail = () => {

    const pathName = useSearchParams();
    const router = useRouter();

    console.log(pathName.get("token"));

    const verifyEmailFunc = async() => {
        try {
            const res = await axios.post("/api/auth/admin/verifyemail", { token: pathName.get("token") });
            console.log(res.data);
            router.push("/dashboard")
        } catch (error) {
            console.log("Error verifying email", error);
        }
    }

  return (
    <>
        <div className="flex w-screen h-screen flex items-center justify-center">
            <Button className="bg-green-500 text-white p-2" onClick={verifyEmailFunc}>Verify Email</Button>
        </div>
    </>
  )
}
export default VerifyEmail