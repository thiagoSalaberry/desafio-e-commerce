import {NextApiRequest, NextApiResponse} from "next";
import Cors from "cors";
const cors = Cors({
    methods: ["GET", "POST", "PATCH"]
});
function runMiddleware(req:NextApiRequest, res:NextApiResponse, fn:Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result:any) => {
            if (result instanceof Error) {
                return reject(result);
            };
            return resolve(result);
        })
    })
}
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // await runMiddleware(req, res, cors);
    res.json({
        message: "Este es un endpoint protegido por CORS",
        method: req.method
    });
}