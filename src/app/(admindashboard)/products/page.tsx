"use client";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

const Products = () => {

    const router = useRouter()
  return (
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
    {/* <DataTable columns={columns} data={collections} searchKey="title" /> */}
  </div>
  )
}
export default Products