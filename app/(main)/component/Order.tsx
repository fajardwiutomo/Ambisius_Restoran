'use client'

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

interface MenuItem {
  id: string;
  name: string;
}

interface OrderItem {
  id: string;
  tableId: string;
  menuId: string;
  quantity: number;
}

export default function Order() {
  const [activeTable, setActiveTable] = useState<string>('');
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [menuOptions, setMenuOptions] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    const storedMenu = JSON.parse(localStorage.getItem('menuList') || '[]') as MenuItem[];
    setMenuOptions(storedMenu);
  }, []);

  const handleTableClick = (tableId: string) => {
    setActiveTable(tableId);
  };

  const handleTambahClick = () => {
    if (!activeTable || !selectedMenu || !quantity) {
    //   alert('Please select table, menu, and quantity');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select table, menu, and quantity',
      })
      return;
    }

    const orderItem: OrderItem = {
      id: Date.now().toString(),
      tableId: activeTable,
      menuId: selectedMenu,
      quantity: Number(quantity),
    };


    const orders = JSON.parse(localStorage.getItem('orders') || '[]') as OrderItem[];
    orders.push(orderItem);
    localStorage.setItem('orders', JSON.stringify(orders));


    setActiveTable('');
    setSelectedMenu('');
    setQuantity('');
  };

  return (
    <div className="py-5 px-5 bg-gray-50 mt-5 rounded-md space-y-2">
      <div className="flex border rounded-md">
        <div
          className={`flex-1 justify-center p-2 text-center items-center border py-5 ${activeTable === 'Meja 1' ? 'bg-black text-white' : ''}`}
          onClick={() => handleTableClick('Meja 1')}
        >
          Meja 1
        </div>
        <div
          className={`flex-1 justify-center p-2 text-center border py-5 ${activeTable === 'Meja 2' ? 'bg-black text-white' : ''}`}
          onClick={() => handleTableClick('Meja 2')}
        >
          Meja 2
        </div>
        <div
          className={`flex-1 justify-center p-2 text-center border py-5 ${activeTable === 'Meja 3' ? 'bg-black text-white' : ''}`}
          onClick={() => handleTableClick('Meja 3')}
        >
          Meja 3
        </div>
      </div>
      <div className='flex justify-between'>
        <div className="flex-1 mr-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">Menu</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
          >
            <option value="">Pilih Menu</option>
            {menuOptions.map((menuItem) => (
              <option key={menuItem.id} value={menuItem.id}>
                {menuItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className='w-[200px]'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">Kuantitas</label>
          <select
            id="quantities"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || '')}
          >
            <option value="">Kuantitas</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <button
        className="px-5 py-2 bg-blue-500 text-sm text-white rounded-md mt-4"
        onClick={handleTambahClick}
      >
        Tambah
      </button>
    </div>
  );
}
