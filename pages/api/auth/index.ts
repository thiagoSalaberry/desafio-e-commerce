import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../controllers/authControllers";
import { runMiddleware } from "../../../lib/corsMiddleware";
// import NextCors from "nextjs-cors";
// async function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
//   await NextCors(req, res, {
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//     origin: "*",
//     optionsSuccessStatus: 200,
//   });
// }
//Este endpoint se encarga de recibir un email desde el body y crear/encontrar un user. Devuelve el email y un código con fecha de expiración.
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  //   console.log("arranca el endpoint");
  const { email } = req.body;
  await runMiddleware(req, res);
  if (!email) {
    res
      .status(400)
      .json({ message: "Debes ingresar un email para poder ingresar." });
  }
  await sendCode(email);
  res.json({
    message: `Un código de ingreso fue enviado a ${email}.`,
  });
}
