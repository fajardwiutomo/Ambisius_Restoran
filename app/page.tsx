'use client'


import React, { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { orderItem } from "@/app/store/orders";
import Swal from 'sweetalert2'
import Menu from "./(main)/component/Menu";
import Order from "./(main)/component/Order";
import Dapur from "./(main)/component/Dapur";
import Kasir from "./(main)/component/Kasir";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("menu");
  const [orders, setOrders] = useAtom(orderItem);

  const showMenu = activeTab === "menu";
  const showOrder = activeTab === "order";
  const showDapur = activeTab === "dapur";
  const showKasir = activeTab === "kasir";

  const handleReset = () => {
    localStorage.removeItem("orders")
    setOrders([])
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Successfully reset',
    })
  }

  return (
    <div className="flex items-center mx-auto w-full">
      <div className="flex flex-col w-[800px] mx-auto py-5">
        <p className="text-2xl font-semibold">Sistem Restoran</p>
        <p className="text-sm text-neutral-500">Ambisius Coding Challenge #230916H</p>
        <div className="flex justify-between">

          <div className="flex gap-2 p-1 items-center text-sm rounded-md w-min bg-gray-200 mt-4">
            <div
              className={`px-8 py-1 rounded-sm hover:cursor-pointer ${activeTab === "menu" ? "bg-white" : ""
                }`}
              onClick={() => setActiveTab("menu")}
            >
              Menu
            </div>
            <div
              className={`px-5 py-1 rounded-sm hover:cursor-pointer ${activeTab === "order" ? "bg-white" : ""
                }`}
              onClick={() => setActiveTab("order")}
            >
              Order
            </div>
            <div
              className={`px-5 py-1 rounded-sm  hover:cursor-pointer ${activeTab === "dapur" ? "bg-white" : ""
                }`}
              onClick={() => setActiveTab("dapur")}
            >
              Dapur
            </div>
            <div
              className={`px-5 py-1 rounded-sm hover:cursor-pointer ${activeTab === "kasir" ? "bg-white" : ""
                }`}
              onClick={() => setActiveTab("kasir")}
            >
              Kasir
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-5 py-1  text-sm border rounded-md hover:cursor-pointer disabled:bg-gray-400 flex gap-2 items-center"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <p>Reset</p>
          </button>
        </div>
        {showMenu && <Menu />}
        {showOrder && <Order />}
        {showDapur && <Dapur />}
        {showKasir && <Kasir />}
      </div>
    </div>
  );
}
