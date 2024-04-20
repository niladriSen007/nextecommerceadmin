import { connection } from "@/database/connection";
import Order from "@/models/Order";

export const getTotalSales = async () => {
  await connection();

  const sales = await Order.find();

  const totalOrders = sales.length;
  const totalAmount = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

  return { totalOrders, totalAmount };
};

export const getTotalCustomers = async () => {
  await connection();

  const customers = await Order.distinct("customerId");

  return customers.length;
};

export const getSalesPerMonth = async () => {
  await connection();

  const sales = await Order.find();

  const salesPerMonth = sales.reduce((acc, sale) => {
    const month = new Date(sale.createdAt).getMonth();
    acc[month] = (acc[month] || 0) + sale.totalAmount;

    return acc;
  }, {});

    const graphData = Array.from({ length: 12}, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
};
