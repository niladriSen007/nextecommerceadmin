"use client";
import NewCollectionForm from "@/components/collections/NewCollectionForm";
import axios from "axios";
import { set } from "mongoose";
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
      const response = await axios.get(`/api/collections/${collectionId}`);
      // console.log(response.data);
      setIsLoaded(false);
      setCollectionDetails(response.data.collection);
    } catch (error) {
      console.log("Error fetching collection", error);
    }
  };
  useEffect(() => {
    getCollectionDetails();
  }, []);
  return <div>
    {isLoaded ? <p>Loading...</p> : <>
    <NewCollectionForm initialData={collectionDetails} />
    </>}
  </div>;
}
