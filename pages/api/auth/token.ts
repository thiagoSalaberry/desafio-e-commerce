import { NextApiRequest, NextApiResponse } from "next";
//Este endpoint se encarga de recibir un email y un code desde el body
//De ser correctos, devuelve un token e invalida el código
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const { email, code } = req.body;
    const token = "";
    res.json({token})
}