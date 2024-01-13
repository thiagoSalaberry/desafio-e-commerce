import { NextApiRequest, NextApiResponse } from "next";
//Este endpoint se encarga de recibir un email desde el body y crear/encontrar un user. Devuelve el email y un código con fecha de expiración.
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const { email } = req.body
    res.json({
        message: `Un código de ingreso fue enviado a ${email}.`,
    })
}