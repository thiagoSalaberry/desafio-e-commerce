import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../controllers/authControllers";
import { runMiddleware } from "../../../lib/corsMiddleware";
import { NextResponse } from "next/server";
//Este endpoint se encarga de recibir un email desde el body y crear/encontrar un user. Devuelve el email y un código con fecha de expiración.
export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse,
  request: Request
) {
  const { email } = req.body;
  console.log("Este es el email que le llega al endpoint", email);
  const origin = request.headers.get("origin");
  // await runMiddleware(req, res);
  if (!email) {
    res
      .status(400)
      .json({ message: "Debes ingresar un email para poder ingresar." });
  }
  await sendCode(email);
  res.json({
    message: `Un código de ingreso fue enviado a ${email}.`,
  });
  return new NextResponse(null, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "*",
    },
  });
}
