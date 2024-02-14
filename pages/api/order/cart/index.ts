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
  const { shipping_info } = req.body;
  const buyer: User = new User(verifiedToken.userId);
  await buyer.pull();
  const newOrder = await createOrderRecord({
    userId: buyer.id,
    productData: buyer.data.cart,
    shipping_info,
    status: "pending",
  });
  const items = buyer.data.cart.map((prod) => {
    return {
      id: String(prod.productId),
      title: String(prod.title),
      description: String(prod.description),
      picture_url: "http://www.myapp.com/myimage.jpg",
      category_id: String(prod.category),
      quantity: Number(prod.quantity),
      currency_id: "ARS",
      unit_price: Number(prod.unit_price),
    };
  });
  const preferenceBody = createPreferenceBody({
    items: items,
    address: shipping_info,
    external_reference: newOrder.id,
  });
  if (newOrder) {
    const newMerchantOrder = await createMerchantOrder(preferenceBody);
    if (newMerchantOrder) {
      res
        .status(201)
        .json({
          link: newMerchantOrder.init_point,
          orderId: newMerchantOrder.external_reference,
        });
    }
  }
}

export default authMiddleware(handler);
