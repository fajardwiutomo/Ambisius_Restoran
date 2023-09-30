'use client'
import { extractNumber } from '@/app/helper/getValue';
import React, { useState, useEffect } from 'react';

interface MenuItem {
    id: number;
    name: string;
}

export default function Kasir() {
    const [arrayTable, setArrayTable] = useState<number[]>([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [orders, setOrders] = useState([]);
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [struk, setStruk] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(storedOrders);

        const uniqueNumbersSet = new Set<number>();

        storedOrders
            .filter((item: any) => item.tableId)
            .forEach((item: any) => {
                const number = Number(item.tableId.split(' ')[1]);
                uniqueNumbersSet.add(number);
            });

        const numbersArray = Array.from(uniqueNumbersSet);
        setArrayTable(numbersArray);
    }, []);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(storedOrders);

        const storedMenu = JSON.parse(localStorage.getItem('menuList') || '[]') as MenuItem[];
        setMenu(storedMenu);
    }, [selectedTable]);

    const handleTableSelect = (tableNumber: any) => {
        setSelectedTable(tableNumber);
    }

    const getName = (id: number) => {
        const menuName: any = menu.find((item) => item.id === id);
        if (menu) {
            return menuName.name;
        }
    }

    const handlePrintStruk = () => {
        if (!selectedTable) {
            return [];
        }

        const filteredOrders = orders.filter((order: any) => order.tableId === `Meja ${selectedTable}`);
        setStruk(filteredOrders)

    }

    const handleKosongkanMeja = () => {
        localStorage.removeItem(selectedTable);
        localStorage.removeItem('orders');
        setSelectedTable('');
        setOrders([]);
        setStruk([])
    }

    useEffect(() => {
        if (selectedTable === "") {
            setStruk([])
        }
    }, [selectedTable])





    return (
        <div className="py-5 px-5 bg-gray-50 mt-5 rounded-md space-y-2">
            <p>Meja</p>
            <div className='flex justify-between'>
                <div className="mr-5 flex gap-2">
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedTable}
                        onChange={(e) => handleTableSelect(e.target.value)}
                    >
                        <option value="">Nomor Meja</option>
                        {
                            arrayTable.map((tableNumber: any) => {
                                return (
                                    <option key={tableNumber} value={tableNumber}>{tableNumber}</option>
                                )
                            })
                        }
                    </select>

                    <button
                        disabled={selectedTable === ''}
                        className="px-5 py-2 bg-black text-sm hover: cursor-pointer text-white rounded-md disabled:bg-gray-300"
                        onClick={handlePrintStruk}
                    >
                        Print Struk
                    </button>

                </div>
                {selectedTable && (
                    <button
                        className="px-5 py-2 bg-red-400 text-sm text-white rounded-md"
                        onClick={handleKosongkanMeja}
                    >
                        Kosongkan Meja
                    </button>
                )}
            </div>

            {struk.length > 0 && (
                <>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Jumlah
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Menu
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Harga
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {struk.map((order: any, index: number) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order.quantity}
                                        </th>
                                        <td className="px-6 py-4 capitalize">
                                            {getName(Number(order.menuId))}
                                        </td>
                                        <td className="px-6 py-4">
                                            Gratis
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-5">
                        <p className="text-sm ">Terima kasih sudah makan di <span className="font-semibold">Restoran</span></p>
                    </div>
                </>

            )}

        </div>
    )
}
