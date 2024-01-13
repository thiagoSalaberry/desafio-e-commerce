import { NextApiRequest, NextApiResponse } from "next";
//Este endpoint se encarga de recibir un token y un orderId y devolver la orden de compra
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const token = req.headers.authorization.split(" ")[1];
    const { orderId } = req.query;
    res.json({token, [`order_${orderId}`]: {}});
}