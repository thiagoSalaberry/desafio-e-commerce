import { NextApiRequest, NextApiResponse } from "next";
//Este endpoint se encarga de recibir un id de un producto y buscarlo en la BdD
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const productId = req.query
    res.json(productId)
}