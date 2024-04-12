"use client";
import NewProductForm from "@/components/products/NewProductForm";
import axios from "axios";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const pathName = usePathname();
  const productId = pathName.split("/")[2];

  const [productDetails, setProductDetails] = useState<ProductType | null>();
  const [isLoaded, setIsLoaded] = useState(false);

  const getProductDetails = async () => {
    /* setIsLoaded(true); */
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.product);
      /*  setIsLoaded(false); */
      setProductDetails(data?.product);
    } catch (error) {
      console.log("Error fetching product", error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <>{productDetails && <NewProductForm initialData={productDetails} />}</>
  );
}
