"use client";

import { columns } from "@/components/orders/OrderColumns";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

import { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/orders`);
      setOrders(data?.orders);
      
      setLoading(false);
    } catch (err) {
      console.log("Error fetching orders - UI", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <div className="py-6 px-10">
        <div className="flex max-md:flex-col md:items-center md:justify-between">
          <p className="font-bold text-3xl">Orders</p>
         
        </div>
        <Separator className="bg-gray-700 mt-4 mb-7" />
       { orders && <DataTable
          columns={columns}
          data={orders}
          searchKey="title"
        />}
      </div>
  );
};

export const dynamic = "force-dynamic";

export default Orders;
