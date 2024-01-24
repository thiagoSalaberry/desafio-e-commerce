import { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrderId } from "../../../lib/mercadoPago";
import { Order } from "../../../model/order";
import { sendPaymentEmail } from "../../../lib/brevo";
import { User } from "../../../model/user";
import { runMiddleware } from "../../../lib/corsMiddleware";
//Este endpoint se encarga de recibir un id de un producto y generar una nueva compra y una nueva orden de pago en la BdD
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  await runMiddleware(req, res);
  if (topic !== "merchant_order") res.status(400).send("Bad request");
  const merchantOrder = await getMerchantOrderId({
    merchantOrderId: String(id),
  });
  if (!merchantOrder)
    return res
      .status(404)
      .json({ message: "La orden que estás solicitando no existe" });
  const response = {
    external_reference: merchantOrder.external_reference,
    paid_amount: merchantOrder.paid_amount,
    items: merchantOrder.items,
    status: merchantOrder.status,
  };
  if (response.status !== "closed")
    res.status(400).send("El producto aún no ha sido pagado");
  const order: Order = await Order.getOrderById(response.external_reference);
  order.data.status = "paid";
  await order.push();
  const user: User = new User(order.data.userId);
  await user.pull();
  await sendPaymentEmail(user.data.email, merchantOrder.items[0].title);
  res
    .status(200)
    .json({ message: "La compra se realizó con éxito", orderData: order.data });
}
