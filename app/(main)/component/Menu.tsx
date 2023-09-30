'use client';

import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';

interface MenuItem {
    id: number;
    name: string;
}

export default function Menu() {
    const [menuName, setMenuName] = useState<string>('');
    const [menuList, setMenuList] = useState<MenuItem[]>([]);


    useEffect(() => {
        const storedMenu = JSON.parse(localStorage.getItem('menuList') || '[]') as MenuItem[];
        setMenuList(storedMenu);
    }, []);


    const addMenuItem = () => {
        if (menuName.trim() === '') return;
        const newMenuItem: MenuItem = {
            id: Date.now(),
            name: menuName,
        };

        const updatedMenuList = [...menuList, newMenuItem];
        localStorage.setItem('menuList', JSON.stringify(updatedMenuList));

        setMenuList(updatedMenuList);
        setMenuName('');
    };


    const deleteMenuItem = (id: number) => {
        const updatedMenuList = menuList.filter((menuItem) => menuItem.id !== id);
        localStorage.setItem('menuList', JSON.stringify(updatedMenuList));
        setMenuList(updatedMenuList);
    };


    return (
        <div className="py-5 px-5 bg-gray-200 mt-5 rounded-md space-y-2">
            <p>Menu Makanan</p>
            <div className="w-full flex gap-4 items-center">
                <input
                    className="w-full px-2 py-2 rounded-md text-sm"
                    placeholder="Tambahkan disini..."
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                />
                <button
                    disabled={!menuName}
                    className="px-5 py-2 bg-gray-800 text-sm text-white rounded-md hover:cursor-pointer disabled:bg-gray-400"
                    onClick={addMenuItem}
                >
                    Tambah
                </button>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Menu
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hapus
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuList.map((menuItem) => (
                            <tr
                                key={menuItem.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {menuItem.id}
                                </th>
                                <td className="px-6 py-4 capitalize">{menuItem.name}</td>
                                <td
                                    onClick={() => deleteMenuItem(menuItem.id)}
                                    className="px-6 py-4 hover:cursor-pointer flex flex-end text-red-500"><TrashIcon className="w-5 h-5" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-sm text-neutral-600 flex justify-center">
                Daftar menu restoran Anda
            </p>
        </div>
    );
}
