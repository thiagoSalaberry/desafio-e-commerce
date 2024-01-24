import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../../../lib/authMiddleware";
import { User } from "../../../model/user";
import { updateUserData } from "../../../controllers/authControllers";
async function getRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  const newUser: User = new User(verifiedToken.userId);
  await newUser.pull();
  return newUser.data;
}
async function patchRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  const { dataToUpdate } = req.body;
  const updatedUser = await updateUserData(verifiedToken.userId, dataToUpdate);
  return updatedUser.data;
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  verifiedToken
) {
  if (req.method == "GET") {
    const userData = await getRequest(req, res, verifiedToken);
    res.status(200).json({ userData });
  } else if (req.method == "PATCH") {
    const updatedUserData = await patchRequest(req, res, verifiedToken);
    res.status(200).json({ updatedUserData });
  }
}
export default authMiddleware(handler);
