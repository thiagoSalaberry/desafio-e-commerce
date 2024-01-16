import { ProductProps } from "./product";
export type OrderProps = {
  id: string;
  userId: string;
  status: "pending" | "paid" | "shipped" | "canceled";
  shipping_info: {
    street_name: string;
    street_number: number;
    zip_code: number;
  };
  product: ProductProps;
};
