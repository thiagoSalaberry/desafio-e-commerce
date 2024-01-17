import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../../../lib/authMiddleware";
import { getOrder } from "../../../../controllers/orderController";
//Este endpoint se encarga de recibir un token y devolver todas mis órdenes de compra
async function handler(req:NextApiRequest, res:NextApiResponse, verifiedToken) {
    const myOrders = await getOrder(verifiedToken.userId);
    if(myOrders.length == 0) res.status(404).json({message: "Aún no has realizado ninguna compra."})
    res.status(200).json({myOrders});
};

export default authMiddleware(handler);