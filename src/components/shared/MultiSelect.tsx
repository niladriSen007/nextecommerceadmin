"use client"
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem
} from "@/components/ui/command";
import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";


interface MultiSelectProps {
  placeholder: string;
  value: string[];
  collections: CollectionType[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }


  const selectables = collections?.filter((collection) => !selected.includes(collection)); 

  return (
    <Command className="overflow-visible bg-white ">
      <div className="flex  gap-1 flex-wrap border  rounded-md  border-zinc-300">
      {selected.map((collection) => (
          <Badge key={collection._id} className="flex items-center justify-center ">
            {collection.title}
            <button type="button" className="ml-1 hover:text-red-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          
        />
      </div>
      <div className="relative mt-2">
        {open && (selectables?.length > 0) && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
            {selectables?.map((collection) => (
              <CommandItem
                key={collection?._id}
                onMouseDown={(e : any) => e.preventDefault()}
                onSelect={() => {
                  onChange(collection?._id);
                  setInputValue("");
                }}
                className="hover:bg-gray-500 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};
export default MultiSelect;
