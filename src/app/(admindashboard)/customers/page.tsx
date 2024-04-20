import { columns } from "@/components/customers/CustomerColumns";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { connection } from "@/database/connection";
import Customer from "@/models/Customer";

const Customers = async () => {
  await connection();

  const customers = await Customer.find().sort({ createdAt: -1 });

  return (
    <div className=" py-5">
      <div className="py-6 px-10">
        <div className="flex max-md:flex-col md:items-center md:justify-between">
          <p className="font-bold text-3xl">Customers</p>
         
        </div>
        <Separator className="bg-gray-700 mt-4 mb-7" />
       { customers && <DataTable
          columns={columns}
          data={customers}
          searchKey="name"
        />}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
