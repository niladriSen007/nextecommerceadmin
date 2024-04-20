import SalesChart from "@/components/salesChart/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSalesPerMonth, getTotalCustomers, getTotalSales } from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

const Dashboard = async () => {
  const { totalAmount, totalOrders } = await getTotalSales();
  const totalCustomers = await getTotalCustomers();

  const graphData = await getSalesPerMonth();

  return (
    <>
      <div className="px-8 py-14">
        <p className="font-bold text-xl">Dashboard</p>
        <Separator className="bg-grey-1 my-5" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <Card className="bg-gradient-to-b from-green-400 to-green-600 shadow-2xl text-white font-bold">
            <CardHeader className="flex flex-row justify-between items-center ">
              <CardTitle>Total Revenue</CardTitle>
              <CircleDollarSign className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="text-body-bold">$ {totalAmount}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-blue-400 to-blue-600 shadow-2xl text-white font-bold">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Total Orders</CardTitle>
              <ShoppingBag className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="text-body-bold">{totalOrders}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-purple-400 to-purple-600 shadow-2xl text-white font-bold">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Total Customer</CardTitle>
              <UserRound className="max-sm:hidden" />
            </CardHeader>
            <CardContent>
              <p className="text-body-bold">{totalCustomers}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Sales Chart ($)</CardTitle>
          </CardHeader>
          <CardContent>   <SalesChart data={graphData} /></CardContent>
        </Card>
      </div>
    </>
  );
};
export default Dashboard;
