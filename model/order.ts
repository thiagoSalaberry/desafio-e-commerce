import { firestore } from "../lib/firestore";

const orderCollection = firestore.collection("orders");

export type OrderProps = {
  userId: string;
  status: "pending" | "paid" | "shipped" | "canceled";
  shipping_info: {
    street_name: string;
    street_number: number;
    zip_code: number;
  };
  productData: object | object[];
};

export class Order {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id: string) {
    this.id = id;
    this.ref = orderCollection.doc(id);
  }
  async pull() {
    const doc = await this.ref.get();
    this.data = doc.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewOrder(data: OrderProps) {
    const newOrderSnap = await orderCollection.add(data);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = data;
    return newOrder;
  }
  static async getOrderById(orderId: string) {
    const orderDoc = await orderCollection.doc(orderId).get();
    const newOrder = new Order(orderDoc.id);
    newOrder.data = orderDoc.data();
    return newOrder as Order;
  }
}
