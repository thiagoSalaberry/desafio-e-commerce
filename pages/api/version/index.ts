import { NextApiRequest, NextApiResponse } from "next";
export default function (req: NextApiRequest, res: NextApiResponse) {
  res.send("Versión: Chequeamos el email");
}
