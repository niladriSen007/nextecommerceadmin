import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
  const handleUpload = (result: any) => {
    // console.log(result?.info?.secure_url,"Hiiiii")
    onChange(result?.info?.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                size="sm"
                className="bg-red-1 text-white"
                >
                <Trash
                onClick={() => onRemove(url)}
                
                className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="l5ex8qv4" onUpload={handleUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-green-600 hover:bg-green-700 font-semibold shadow-2xl text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default ImageUpload;