import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../../../lib/authMiddleware";
import { getOrder } from "../../../../controllers/orderController";
import { Order } from "../../../../model/order";
//Este endpoint se encarga de recibir un token y devolver todas mis órdenes de compra
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  const { orderId } = req.query;
  // const order = await getOrder(verifiedToken.userId, String(orderId));
  const order = await Order.getOrderById(String(orderId));
  await order.pull();
  res.json({ order });
}

export default authMiddleware(handler);
