"use client";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const router = useRouter();

  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      const data = response.data;
      if (data.success) {
        setAllProducts(data.products);
      } else {
        console.log("Error fetching products");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="py-6 px-10">
        <div className="flex max-md:flex-col md:items-center md:justify-between">
          <p className="font-bold text-3xl">Products</p>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 max-md:mt-4"
            onClick={() => router.push(`/products/createnewproduct`)}
          >
            Create new product <Plus className="ml-1" size={20} />
          </Button>
        </div>
        <Separator className="bg-gray-700 mt-4 mb-7" />
        <DataTable
          columns={columns}
          data={allProducts}
          searchKey="Product name"
        />
      </div>
    </>
  );
};
export default Products;
