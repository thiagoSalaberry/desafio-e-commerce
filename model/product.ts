import { firestore } from "../lib/firestore";
export type ProductProps = {
    productId: string;
    title: string;
    description: string;
    unit_price: number;
    stock: boolean;
    category: string;
    images?: string[];
    tags?: string[];
};

const productsCollection = firestore.collection("products");

export class Product {

}