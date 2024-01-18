import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../controllers/authControllers";
import { runMiddleware } from "../../../lib/corsMiddleware";
import Cors from "cors"
import methods from "micro-method-router";
const cors = Cors({
  methods: ["GET", "POST", "PATCH"]
});
//Este endpoint se encarga de recibir un email desde el body y crear/encontrar un user. Devuelve el email y un código con fecha de expiración.
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await runMiddleware(req, res, cors)
    const { email } = req.body;
    if (!email) res.status(400).json({message: "Debes ingresar un email para poder ingresar."});
    await sendCode(email);
    res.json({
        message: `Un código de ingreso fue enviado a ${email}.`,
    })
}

// const handler = methods({
//     post: auth,
//   });
  
//   const corsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//     return await corsMiddleware(req, res, handler);
//   };
  
//   export default corsHandler;