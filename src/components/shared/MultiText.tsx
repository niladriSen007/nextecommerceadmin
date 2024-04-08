"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText = ({
  placeholder,
  value,
  onChange,
  onRemove,
}: MultiTextProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onChange(inputValue);
            setInputValue("");
          }
        }}
      />

      <div>
        {value.map((v, index) => (
          <Badge key={index} className="bg-gray-300 text-gray-600 mr-1 mt-1 shadow-lg hover:text-white">
            {v}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={() => onRemove(v)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
export default MultiText;
