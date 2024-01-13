import { NextApiRequest, NextApiResponse } from "next";
//Este endpoint se encarga de recibir un producto, un offset y un limit y buscarlo en la BdD
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const { q, offset, limit } = req.query
    res.json({
        searchedProduct: q,
        items: [],
        pagination: {
            total: 0,
            offset,
            limit
        }
    })
}