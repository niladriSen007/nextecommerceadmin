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
      <div className="flex w-screen h-screen  items-center justify-center">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button
          className="bg-green-500 text-white p-2"
          onClick={verifyEmailFunc}
        >
          Verify Email
        </Button>
      </div>
    </Suspense>
  );
};
export default VerifyEmail;
