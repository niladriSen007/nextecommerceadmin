import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import axios from "axios";

interface DeleteProps {
  id: string;
  item: string;
}



const Delete = ({ id, item = "collections" }: DeleteProps) => {
  // console.log(id)
  const deleteCollection = async () => {
    try {
      const itemType = item === "collection" ? "collections" : "products";
      const response = await axios.delete(`/api/${itemType}/${id}`);
      if (response.data.success) {
        console.log(response.data.message);
        window.location.reload();
      } else {
        console.log("Error deleting collection");
      }
    } catch (error) {
      console.log("Error deleting collection", error);
      throw new Error("Error deleting collection");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-950 hover:bg-slate-950 hover:text-white border">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700 shadow-lg"
            onClick={deleteCollection}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default Delete;
