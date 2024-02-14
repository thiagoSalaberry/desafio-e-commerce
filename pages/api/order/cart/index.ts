import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../../../lib/authMiddleware";
import { User } from "../../../../model/user";
import { Product } from "../../../../model/product";
import {
  createMerchantOrder,
  createOrderRecord,
} from "../../../../controllers/orderController";
import { createPreferenceBody } from "../../../../lib/preferenceBody";
//Este endpoint se encarga de recibir los ids de los productos y generar una nueva compra y una nueva orden de pago en la BdD
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  const { items } = req.query;
  const { shipping_info } = req.body;
  const promises = String(items)
    .split(",")
    .map(async (p) => {
      return await Product.getProductById(p);
    });
  const products = await Promise.all(promises);
  const buyer: User = new User(verifiedToken.userId);
  await buyer.pull();
  //   const product = await Product.getProductById(String(productIds));
  //   const newOrder = await createOrderRecord({
  //     userId: buyer.id,
  //     productData: product,
  //     shipping_info,
  //     status: "pending",
  //   });
  //   const preferenceBody = createPreferenceBody({
  //     items: [{ ...newOrder.data.productData, id: productIds, quantity: 1 }],
  //     address: shipping_info,
  //     external_reference: newOrder.id,
  //   });
  //   if (newOrder) {
  //     const newMerchantOrder = await createMerchantOrder(preferenceBody);
  //     if (newMerchantOrder) {
  //       //
  //       res.status(201).json({ link: newMerchantOrder.init_point });
  //     }
  //   }
  res.json({ products, cart: buyer.data.cart });
}

export default authMiddleware(handler);
