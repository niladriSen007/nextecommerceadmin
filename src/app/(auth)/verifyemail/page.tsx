"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Suspense } from "react";

const VerifyEmail = () => {
  const pathName = useSearchParams();
  const router = useRouter();

  console.log(pathName.get("token"));

  const verifyEmailFunc = async () => {
    try {
      const res = await axios.post("/api/auth/admin/verifyemail", {
        token: pathName.get("token"),
      });
      console.log(res.data);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error verifying email", error);
    }
  };

  return (
    <Suspense fallback={<>Loading.....</>}>
      <div className="flex flex-col w-screen h-screen  items-center justify-center">
        <div className=" bg-zinc-100 p-2">

        <InputOTP maxLength={6} >
          <InputOTPGroup >
            <InputOTPSlot index={0} className="border bg-zinc-300 p-2 " />
            <InputOTPSlot index={1} className="border bg-zinc-300 p-2 " />
            <InputOTPSlot index={2} className="border bg-zinc-300 p-2 " />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="border bg-zinc-300 p-2 " />
            <InputOTPSlot index={4} className="border bg-zinc-300 p-2 " />
            <InputOTPSlot index={5} className="border bg-zinc-300 p-2 " />
          </InputOTPGroup>
        </InputOTP>
        </div>

        <Button
          className="bg-green-500 mt-4 text-white p-2"
          onClick={verifyEmailFunc}
        >
          Verify Email
        </Button>
      </div>
    </Suspense>
  );
};
export default VerifyEmail;
