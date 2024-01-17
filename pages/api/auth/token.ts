import { NextApiRequest, NextApiResponse } from "next";
import { checkEmailAndCode } from "../../../controllers/authControllers";
import methods from "micro-method-router";
import corsMiddleware from "../../../lib/corsMiddleware";
//Este endpoint se encarga de recibir un email y un code desde el body
//De ser correctos, devuelve un token e invalida el código
/*export default*/ async function token(req:NextApiRequest, res:NextApiResponse) {
    const { email, code } = req.body;
    if (!email || !code) res.status(400).json({message: "Debes ingresar un email y un código para poder ingresar."});
    const token = await checkEmailAndCode(email, code);
    if (!token) res.status(403).json({message: "Los datos ingresados son incorrectos."});
    res.status(200).json(token);
};

const handler = methods({
    post: token
});

const corsHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    return await corsMiddleware(req, res, handler)
};

export default corsHandler;