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
  const added = buyer.addToBookmarks(product);
  if (!added) return { message: "El producto ya está guardado." };
  await buyer.push();
  return true;
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
  buyer.removeFromBookmarks(String(productId));
  await buyer.push();
  return {
    message: "El producto fue eliminado de tus guardados correctamente.",
  };
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  if (req.method == "POST") {
    const addProductToBookmarks = await postRequest(req, res, verifiedToken);
    if (!addProductToBookmarks) {
      res.status(409).json({ message: "El producto ya está guardado" });
    } else {
      res.status(200).json(addProductToBookmarks);
    }
  } else if (req.method == "DELETE") {
    const removeProductFromBookmarks = await deleteRequest(
      req,
      res,
      verifiedToken
    );
    res.status(200).json(removeProductFromBookmarks);
  }
}

export default authMiddleware(handler);
