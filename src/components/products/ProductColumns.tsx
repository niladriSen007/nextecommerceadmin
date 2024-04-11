"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import Delete from "../shared/Delete";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Product name",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];