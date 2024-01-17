import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../controllers/authControllers";
//Este endpoint se encarga de recibir un email desde el body y crear/encontrar un user. Devuelve el email y un código con fecha de expiración.
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const { email } = req.body;
    if (!email) res.status(400).json({message: "Debes ingresar un email para poder ingresar."});
    await sendCode(email);
    res.json({
        message: `Un código de ingreso fue enviado a ${email}.`,
    })
}
