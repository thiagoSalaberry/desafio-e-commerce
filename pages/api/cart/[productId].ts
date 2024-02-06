import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../../lib/authMiddleware";
import { User } from "../../../model/user";
import { Product } from "../../../model/product";
import {
  createMerchantOrder,
  createOrderRecord,
} from "../../../controllers/orderController";
import { createPreferenceBody } from "../../../lib/preferenceBody";
//Este endpoint se encarga de agregar productos al carrito
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  const { productId } = req.query;
  const buyer: User = new User(verifiedToken.userId);
  await buyer.pull();
  const product = await Product.getProductById(String(productId));
  // res.json({
  //   productId,
  //   buyer: buyer.data,
  //   product,
  // });
  buyer.addToCart(product);
  await buyer.push();
  res
    .status(200)
    .json({ message: "El producto fue agregado a tu carrito correctamente." });
}

export default authMiddleware(handler);
