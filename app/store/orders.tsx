import { atom } from 'jotai'

interface OrderItem {
    id: string;
    tableId: string;
    menuId: string;
    name: string;
    quantity: number;
}

export const orderItem = atom<OrderItem[]>([])