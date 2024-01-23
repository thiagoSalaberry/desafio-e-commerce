import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS", "HEAD"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

export function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        console.log("NO pasó el test de cors");
        return reject(result);
      }
      console.log("Pasó el test de cors", result);
      return resolve(result);
    });
  });
}
