import { NextApiRequest, NextApiResponse } from "next";
//Este endpoint se encarga de recibir un token y devolver todas mis órdenes de compra
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const token = req.headers.authorization.split(" ")[1];
    res.json({token, myOrders: []});
}