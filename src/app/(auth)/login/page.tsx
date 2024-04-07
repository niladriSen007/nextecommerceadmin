"use client";
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { cn } from "@/utils/cn"
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {

  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    setIsLoaded(true);
    try {
      e.preventDefault();
    // console.log(formState)

    const res = await axios.post("/api/auth/admin/login", formState);
    console.log(res.data);
    setIsLoaded(false);
    router.push(`/verifyemail?token=${res.data.token}`);
    } catch (error) {
      console.log("Error creating admin", error);
      throw new Error("Error creating admin");
    }
  };


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-200">

    <Card className="mx-auto max-w-sm border border-zinc-400 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center mb-4">Login to Sneakkerz</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email"  onChange={handleInputChange} value={formState.email}/>
          </LabelInputContainer>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required onChange={handleInputChange} value={formState.password}/>
          </div>
          <Button type="submit" className="w-full" >
           { isLoaded ?" Loading..." : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};