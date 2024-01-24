import { NextApiRequest, NextApiResponse } from "next";
import { checkEmailAndCode } from "../../../controllers/authControllers";
import { runMiddleware } from "../../../lib/corsMiddleware";
//Este endpoint se encarga de recibir un email y un code desde el body
//De ser correctos, devuelve un token e invalida el código
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, code } = req.body;
  console.log(
    "Estos son el email y el código que le llegan al endpoint",
    email,
    code
  );
  await runMiddleware(req, res);
  if (!email || !code)
    res.status(400).json({
      message: "Debes ingresar un email y un código para poder ingresar.",
    });
  const token = await checkEmailAndCode(email, code);
  if (!token)
    res.status(403).json({ message: "Los datos ingresados son incorrectos." });
  res.status(200).json(token);
}
