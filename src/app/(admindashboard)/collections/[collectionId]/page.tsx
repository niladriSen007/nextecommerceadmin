"use client";
import NewCollectionForm from "@/components/collections/NewCollectionForm";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CollectionPage() {
  const pathName = usePathname();
  const collectionId = pathName.split("/")[2];

  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>();
  const [isLoaded, setIsLoaded] = useState(false);

  const getCollectionDetails = async () => {
    setIsLoaded(true);
    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
      const data = await response.json();
      setCollectionDetails(data?.collection);
      setIsLoaded(false);
    } catch (error) {
      console.log("Error fetching collection", error);
    }
  };
  useEffect(() => {
    getCollectionDetails();
  }, []);
  return <>
    {collectionDetails && <NewCollectionForm initialData={collectionDetails} />}
  </>;
}
