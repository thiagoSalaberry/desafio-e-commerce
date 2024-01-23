import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./jwt";
import parseToken from "parse-bearer-token";
import { runMiddleware } from "./corsMiddleware";
export function authMiddleware(
  callback: (req: NextApiRequest, res: NextApiResponse, passedToken) => {}
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseToken(req);
    if (!token) {
      res.status(401).send("No estás autorizado");
    }
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
      callback(req, res, verifiedToken);
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  };
}
