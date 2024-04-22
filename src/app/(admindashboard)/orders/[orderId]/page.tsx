


import { columns } from "@/components/orderedItem/OrderItemColumns"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const OrderDetails = async ({ params }: { params: { orderId: string }}) => {
  const {data} = await axios.get(`http://localhost:3000/api/orders/${params.orderId}`)
  const { orderDetails, customer } = data

  const { street, city, state, postalCode, country } = orderDetails.shippingAddress

  return (
    <div className="flex flex-col p-10 gap-5">
        <div className="flex max-md:flex-col md:items-center md:justify-between">
          <p className="font-bold text-3xl">Order details</p>
         
        </div>
        <Separator className="bg-gray-700 mb-3 " />
      <p className="">
        <span className="font-bold text-lg">Order ID :</span> <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        <span className="font-bold text-lg">Customer name : </span>
        <span className="text-base-medium">{customer?.name}</span>
      </p>
      <p className="text-base-bold">
        <span className="font-bold text-lg"> Shipping address : </span>
       <span className="text-base-medium">{street}, {city}, {state}, {postalCode}, {country}</span>
      </p>
      <p className="text-base-bold">
        <span className="font-bold text-lg">Total Paid :</span>
         <span className="text-base-medium"> ₹ {orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        <span className="font-bold text-lg">Shipping rate ID : </span>
        <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
      <DataTable columns={columns} data={orderDetails?.products} searchKey="product"/>
    </div>
  )
}

export default OrderDetails

export const dynamic = "force-dynamic";