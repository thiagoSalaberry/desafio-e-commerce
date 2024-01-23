import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
// const cors = Cors({
//     origin: "*",
//     methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204
//   });
// function runMiddleware(req:NextApiRequest, res:NextApiResponse, fn:Function) {
//     console.log(fn)
//     return new Promise((resolve, reject) => {
//         fn(req, res, (result:any) => {
//             console.log("este es el result",{result})
//             if (result instanceof Error) {
//                 console.log("NO pasó el test de cors")
//                 return reject(result);
//             };
//             console.log("Pasó el test de cors")
//             return resolve(result);
//         })
//     })
// }
import { runMiddleware } from "../../../lib/corsMiddleware";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);
  res.json({
    message: "Este es un endpoint protegido por CORS",
    method: req.method,
    body: req.body,
  });
}
