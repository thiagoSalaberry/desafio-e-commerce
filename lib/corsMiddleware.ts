import { NextApiRequest, NextApiResponse } from "next";
// import NextCors from "nextjs-cors";
import Cors from "cors";

const cors = Cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS", "HEAD"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
export function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
  console.log({ cors });
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        console.log("NO pasó el test de cors", result);
        return reject(result);
      }
      console.log("Pasó el test de cors", result);
      return resolve(result);
    });
  });
}

// export async function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
//   await NextCors(req, res, {
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//     origin: "*",
//     optionsSuccessStatus: 200,
//   });
// }
