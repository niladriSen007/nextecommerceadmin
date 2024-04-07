"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import ImageUpload from "../upload/ImageUpload";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

const NewCollectionForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoaded(true);
    // console.log(values);
    try {
      const response = await axios.post("/api/collections", {
        ...values
      });

      if (response.data.success) {
        toast("Collection created successfully");
        router.push("/collections");
      }

      setIsLoaded(false);
    } catch (error) {
      console.log(error);
      toast("Failed to create collection");
    }
  };

  return (
    <div className="px-10 py-6">
      <p className="font-bold text-3xl">Create Collection</p>
      <Separator className="bg-gray-700 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    // onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className=""
                    placeholder="Description"
                    {...field}
                    rows={5}
                    // onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field } : any) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white" disabled={isLoaded}>
              { isLoaded ? "Loading..." : "Submit"}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/collections")}
              className="bg-red-500 hover:bg-red-700 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default NewCollectionForm;
