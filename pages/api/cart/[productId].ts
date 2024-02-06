import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../../lib/authMiddleware";
import { User } from "../../../model/user";
import { Product } from "../../../model/product";
import { runMiddleware } from "../../../lib/corsMiddleware";
//Este endpoint se encarga de agregar productos al carrito
async function postRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  const { productId } = req.query;
  // await runMiddleware(req, res);
  const buyer: User = new User(verifiedToken.userId);
  await buyer.pull();
  const product = await Product.getProductById(String(productId));
  buyer.addToCart(product);
  await buyer.push();
  return { message: "El producto fue agregado a tu carrito correctamente." };
}
async function deleteRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  const { productId } = req.query;
  // await runMiddleware(req, res);
  const buyer: User = new User(verifiedToken.userId);
  await buyer.pull();
  buyer.removeFromCart(String(productId));
  await buyer.push();
  return { message: "El producto fue eliminado de tu carrito correctamente." };
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  if (req.method == "POST") {
    const addProductToCart = await postRequest(req, res, verifiedToken);
    res.status(200).json(addProductToCart);
  } else if (req.method == "DELETE") {
    const removeProductFromCart = await deleteRequest(req, res, verifiedToken);
    res.status(200).json(removeProductFromCart);
  }
}

export default authMiddleware(handler);
