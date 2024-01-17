import { NextApiRequest, NextApiResponse } from "next";
import { getLimitAndOffset } from "../../../lib/paginationConfig";
import { searchProducts } from "../../../lib/searchProducts";
//Este endpoint se encarga de recibir un producto, un offset y un limit y buscarlo en la BdD
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const { q } = req.query;
    const foundProducts = await searchProducts(String(q));
    const { offset, limit } = getLimitAndOffset(req, 10, foundProducts.length);
    if(foundProducts.length == 0) res.status(404).json({message:"El producto que estás buscando no existe"});
    res.status(200).json({
        searchedProduct: q ? q : "Todos los productos",
        results: foundProducts.slice(offset, limit + offset),
        pagination: {
            offset,
            limit,
            total: foundProducts.length
        }
    })
}