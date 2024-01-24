import { NextApiRequest, NextApiResponse } from "next";
import { checkEmailAndCode } from "../../../controllers/authControllers";
import methods from "micro-method-router";
import { runMiddleware } from "../../../lib/corsMiddleware";
import Cors from "cors";
import { NextResponse } from "next/server";
const cors = Cors({
  methods: ["GET", "POST", "PATCH"],
});
//Este endpoint se encarga de recibir un email y un code desde el body
//De ser correctos, devuelve un token e invalida el código
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const { email, code } = req.body;
  if (!email || !code)
    res.status(400).json({
      message: "Debes ingresar un email y un código para poder ingresar.",
    });
  const token = await checkEmailAndCode(email, code);
  if (!token)
    res.status(403).json({ message: "Los datos ingresados son incorrectos." });
  res.status(200).json(token);
  return new NextResponse(null, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
