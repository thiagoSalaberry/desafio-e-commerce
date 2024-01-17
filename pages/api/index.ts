import { NextApiRequest, NextApiResponse } from "next";
export default async function(req:NextApiRequest, res:NextApiResponse) {
    res.json({
        message: "Bienvenido a la API del desafío e-commerce:backend. A continuación tendrás una lista de los endpoints que puedes solicitar.",
        endpoints: [
            {[`POST/auth`]: "Crear / encontrar usuario mediante un email"},
            {[`POST/auth/token`]: "Generar token de ingreso mediante un email y un código"},
            {[`GET/me`]: "Autenticarse mediante un token"},
            {[`PATCH/me`]: "Actualizar datos personales"},
            {[`PATCH/me/:userProp`]: "Actualizar un dato en particular"},
            {[`GET/search?q=query&offset=0&limit=10`]: "Buscar productos"},
            {[`GET/products/:productId`]: "Buscar un producto en particular por ID"},
            {[`POST/order?productId=0`]: "Crear una orden de compra en la base de datos sobre un producto específico"},
            {[`GET/me/orders`]: "Obtener todas mis órdenes de compra"},
            {[`GET/me/:orderId`]: "Obtener una de mis órdenes de compra por ID"},
            {[`POST/ipn/mercadopago?id=:id&topic=merchant_order`]: "Notificar que la compra fue pagada con éxito"},
        ]
    })
}