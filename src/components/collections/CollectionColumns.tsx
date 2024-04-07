"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../shared/Delete";
import Link from "next/link";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Collection Name",
    cell: ({ row }) => <Link href={`/collections/${row.original._id}`}>{row.original.title}</Link>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({row}) => <Delete id={row.original._id} item="collection" />
    
  },
];
