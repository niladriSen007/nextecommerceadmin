"use client";
import { columns } from "@/components/collections/CollectionColumns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Collections() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [collections, setCollections] = useState([]);
  const router = useRouter();

   const getCollections = async () => {
    setIsLoaded(true);
    try {
      const response = await axios.get("/api/collections");

      if (response.data.success) {
        const data = response.data.collections;
        setCollections(data);
        // console.log(response.data);
        setIsLoaded(false);
      } else {
        console.log("Error fetching collections");
      }
    } catch (error) {
      console.log("Error fetching collections", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="py-6 px-10">
      <div className="flex max-md:flex-col md:items-center md:justify-between">
        <p className="font-bold text-3xl">Collections</p>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 max-md:mt-4"
          onClick={() => router.push(`/collections/createnewcollection`)}
        >
          Create new collection <Plus className="ml-1" size={20} />
        </Button>
      </div>
      <Separator className="bg-gray-700 mt-4 mb-7" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
}
