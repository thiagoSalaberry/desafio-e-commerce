import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../model/product";
import { authMiddleware } from "../../../lib/authMiddleware";
//Este endpoint se encarga de recibir un id de un producto y buscarlo en la BdD
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;
  const product = await Product.getProductById(String(productId));
  if (!product)
    return res
      .status(404)
      .json({ message: "El producto que estás buscando no existe" });
  res.json(product);
}

export default authMiddleware(handler);
