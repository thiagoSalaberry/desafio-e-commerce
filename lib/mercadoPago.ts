import {MercadoPagoConfig, MerchantOrder} from "mercadopago";
import type { MerchantOrderGetData } from "mercadopago/dist/clients/merchantOrder/get/types";
const mercadoPagoClient = new MercadoPagoConfig({accessToken: process.env.MP_SELLER_PRODUCTION_TOKEN});
const merchantOrder = new MerchantOrder(mercadoPagoClient);
export async function getMerchantOrderId(orderData:MerchantOrderGetData) {
    try {
        const order = await merchantOrder.get(orderData);
        return order;
    } catch(e) {
        console.log("La merchant_order no existe", e)
        return null;
    }
}