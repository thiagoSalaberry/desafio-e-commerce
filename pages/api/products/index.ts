import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../model/product";
import { runMiddleware } from "../../../lib/corsMiddleware";
//Este endpoint se encarga de recibir un id de un producto y buscarlo en la BdD
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const featuredProducts = await Product.getFeaturedProducts();
  if (!featuredProducts)
    return res
      .status(404)
      .json({ message: "El producto que estás buscando no existe" });
  res.json({
    featuredProducts,
  });
}
