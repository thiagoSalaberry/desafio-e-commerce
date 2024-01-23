import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../controllers/authControllers";
import { runMiddleware } from "../../../lib/corsMiddleware";
//Este endpoint se encarga de recibir un email desde el body y crear/encontrar un user. Devuelve el email y un código con fecha de expiración.
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  console.log("arranca el endpoint");
  const cors = await runMiddleware(req, res);
  if (!cors) throw Error("No pasó el test de cors");
  console.log("supuestamente pasó el cors middleware");
  const { email } = req.body;
  if (!email)
    res
      .status(400)
      .json({ message: "Debes ingresar un email para poder ingresar." });
  await sendCode(email);
  res.json({
    message: `Un código de ingreso fue enviado a ${email}.`,
  });
}
