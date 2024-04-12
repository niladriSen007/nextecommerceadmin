import { columns } from "@/components/collections/CollectionColumns"
import { DataTable } from "@/components/ui/data-table"

const loading = () => {
  return (
    <DataTable columns={columns} searchKey="collection" data={[]}  />
  )
}
export default loading