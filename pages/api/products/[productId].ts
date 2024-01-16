import { NextApiRequest, NextApiResponse } from "next";
import { searchProductById } from "../../../lib/searchProducts";
//Este endpoint se encarga de recibir un id de un producto y buscarlo en la BdD
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const { productId } = req.query;
    const product = await searchProductById(String(productId));
    res.json(product);
}