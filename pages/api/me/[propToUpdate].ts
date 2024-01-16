import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../../lib/authMiddleware";
import { User } from "../../../model/user";
import { updateSpecificUserProp } from "../../../controllers/authControllers";
//Este endpoint se encarga de recibir una prop del user a través del query y lo actualiza en la BdD
async function handler(req:NextApiRequest, res:NextApiResponse, verifiedToken) {
    const { propToUpdate } = req.query;
    const { newPropValue } = req.body;
    const user:User = new User(verifiedToken.userId);
    const updatedUser = await updateSpecificUserProp(user.id, {propKey: propToUpdate, propValue: newPropValue});
    res.json({updatedUser: updatedUser.data});
};

export default authMiddleware(handler)