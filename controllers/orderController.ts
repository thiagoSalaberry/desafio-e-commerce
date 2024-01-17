import { Order, OrderProps } from "../model/order";
import { User } from "../model/user";

export async function createOrderRecord(orderData:OrderProps) {
    const newOrder = await Order.createNewOrder(orderData);
    const user:User = new User(orderData.userId);
    await user.pull();
    user.addOrder({orderId: newOrder.id, productData: newOrder.data.productData, shipping_info: newOrder.data.shipping_info, status: newOrder.data.status})
    await user.push()
    return newOrder;
};

export async function createMerchantOrder(body:object) {
    const fetch_MP_API = await fetch(`https://api.mercadopago.com/checkout/preferences`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.MP_SELLER_PRODUCTION_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const response = await fetch_MP_API.json();
    return response;
};

export async function getOrder(userId:string, orderId?:string) {
    const user:User = new User(userId);
    await user.pull();
    if(orderId) {
        const order = user.data.orders.find(order => order.orderId);
        return order ? order : null;
    };
    const userOrders = user.data.orders;
    return userOrders ? userOrders : null;
};