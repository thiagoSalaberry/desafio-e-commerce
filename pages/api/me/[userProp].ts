import { NextApiRequest, NextApiResponse } from "next";
//Este endpoint se encarga de recibir una prop del user a través del query y lo actualiza en la BdD
export default async function(req:NextApiRequest, res:NextApiResponse) {
    const token = req.headers.authorization.split(" ")[1];
    const propToUpdate= req.query;
    const { newPropValue } = req.body;
    res.json({token, propToUpdate, newPropValue})
}