import { Auth } from "../model/auth";
import { User } from "../model/user";
import { addMinutes } from "date-fns";
import { sendCodeEmail } from "../lib/brevo";
import { generateToken } from "../lib/jwt";
export async function findOrCreateAuth(email: string) {
  const auth: Auth = await Auth.findAuthByEmail(email);
  if (auth) {
    return auth;
  } else {
    const newUser: User = await User.createNewUser({
      email,
      orders: [],
      cart: [],
      bookmarks: [],
    });
    const newAuth: Auth = await Auth.createNewAuth({
      userId: newUser.id,
      email,
      code: "",
      expiresAt: null,
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth: Auth = await findOrCreateAuth(email);
  const code: number = Math.ceil(Math.random() * 100000);
  const now: Date = new Date();
  const twentyMinutesFromNow: Date = addMinutes(now, 20);
  const newAuth: Auth = new Auth(auth.id);
  await newAuth.pull();
  newAuth.data.code = code;
  newAuth.data.expiresAt = twentyMinutesFromNow;
  await newAuth.push();
  await sendCodeEmail(email, code);
  return newAuth;
}

export async function checkEmailAndCode(email: string, code: number) {
  const auth = await Auth.checkEmailAndCode(email, code);
  if (!auth) {
    return null;
  } else {
    const token = generateToken({ userId: auth.userId });
    return { token };
  }
}

export async function updateUserData(userId: string, newUserData: object) {
  const user: User = new User(userId);
  await user.pull();
  user.data = {
    ...user.data,
    ...newUserData,
  };
  await user.push();
  return user;
}

export async function updateSpecificUserProp(
  userId: string,
  newUserProp: { propKey; propValue }
) {
  console.log("Esto viene del controller", newUserProp);
  const user: User = new User(userId);
  await user.pull();
  user.data = {
    ...user.data,
    [newUserProp.propKey]: newUserProp.propValue,
  };
  await user.push();
  return user;
}
