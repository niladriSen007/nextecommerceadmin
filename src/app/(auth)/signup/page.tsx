"use client";
import React, { useState } from "react";

import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";

export default function SignupFormDemo() {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoaded(true);
    try {
    e.preventDefault();
    // console.log(formState)

    const res = await axios.post("/api/auth/admin/signup", formState);
    console.log(res.data);
    setIsLoaded(false);
    router.push("/login");
    } catch (error) {
      console.log("Error creating admin", error);
      throw new Error("Error creating admin");
    }
  };

  const [formState, setFormState] = useState({
    username: "",
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

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-200">
      <div className="max-w-sm  w-full mx-auto flex flex-col items-center justify-center rounded-none md:rounded-2xl p-4 md:p-8  border border-zinc-400 shadow-2xl bg-white dark:bg-black">
        <h2 className="font-bold text-xl mb-2 text-neutral-800 dark:text-neutral-200 mx-6 text-center">
          Welcome to Sneakkerz.
        </h2>

        <form className="my-6" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="firstname">Username</Label>
            <Input
              id="username"
              placeholder="Tyler"
              type="text"
              value={formState?.username}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={formState?.email}
              onChange={handleInputChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formState?.password}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
           { isLoaded ? "Loading..." : <>Sign up to Sneakkerz &rarr;</>}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <Button
            className=" relative group/btn bg-white dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full text-black border border-black hover:bg-slate-900 hover:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={() => router.push("/login")}
          >
            Login to Sneakkerz &rarr;
            <BottomGradient />
          </Button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
