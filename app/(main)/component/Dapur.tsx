

'use client'

import { orderItem } from '@/app/store/orders';
import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';

interface OrderItem {
    id: string;
    tableId: string;
    menuId: string;
    name: string;
    quantity: number;
}

interface MenuItem {
    id: number;
    name: string;
}

export default function Dapur() {
    const [orders, setOrders] = useAtom(orderItem);
    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]') as OrderItem[];
        setOrders(storedOrders);

        const storedMenu = JSON.parse(localStorage.getItem('menuList') || '[]') as MenuItem[];
        setMenu(storedMenu);
    }, []);



    const getName = (id: number) => {
        const menuName: any = menu?.find((item) => item.id === id);
        if (menu) {
            return menuName?.name;
        } else{
            return '';
        }
    }

    const getOrderByTable = (tableId: string) => {
        const order = orders?.filter((order) => order.tableId === tableId);

        if (order) {
            const data = order?.map((item) => {
                return (
                    <p className="text-sm text-neutral-500 capitalize">{item.quantity}x {getName(Number(item?.menuId))}</p>
                )
            })
            return data
        }
    }

    return (
        <div className="py-5 px-5 bg-gray-50 mt-5 rounded-md space-y-2">
            <div className="flex justify-between -space-x-2">
                <div className=" flex-1">
                    <p className="text-xl font-semibold">Meja 1</p>
                    {
                        getOrderByTable('Meja 1')
                    }
                </div>
                <div className=" flex-1">
                    <p className="text-xl font-semibold">Meja 2</p>
                    {
                        getOrderByTable('Meja 2')
                    }
                </div>

                <div className="flex-1">
                    <p className="text-xl font-semibold">Meja 3</p>
                    {
                        getOrderByTable('Meja 3')
                    }
                </div>

            </div>
        </div>
    );
}
