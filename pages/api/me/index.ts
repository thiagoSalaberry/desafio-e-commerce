import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
export default methods ({
    async get(req:NextApiRequest, res:NextApiResponse) {
        const token = req.headers.authorization.split(" ")[1];
        res.json({token, user: {}});
    },
    async patch(req:NextApiRequest, res:NextApiResponse) {
        const token = req.headers.authorization.split(" ")[1];
        const { userData } = req.body;
        res.json({token, updatedUser: userData});
    }
})