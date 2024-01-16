import { Auth } from "../model/auth";
import { User } from "../model/user";
import { addMinutes } from "date-fns";
import { sendEmail } from "../lib/brevo";
import { generateToken } from "../lib/jwt";
export async function findOrCreateAuth(email:string) {
    const cleanEmail = email.trim().toLowerCase();
    const auth:Auth = await Auth.findAuthByEmail(cleanEmail);
    if(auth) {
        return auth;
    } else {
        const newUser:User = await User.createNewUser({email: cleanEmail});
        const newAuth:Auth = await Auth.createNewAuth({
            userId: newUser.id,
            email: cleanEmail,
            code: "",
            expiresAt: null
        });
        return newAuth;
    };
};

export async function sendCode(email:string) {
    const cleanEmail:string = email.trim().toLowerCase();
    const auth:Auth = await findOrCreateAuth(cleanEmail);
    const code:number = Math.ceil(Math.random() * 100000);
    const now:Date = new Date();
    const twentyMinutesFromNow:Date = addMinutes(now, 20);
    const newAuth:Auth = new Auth(auth.id);
    await newAuth.pull()
    newAuth.data.code = code;
    newAuth.data.expiresAt = twentyMinutesFromNow;
    await newAuth.push();
    await sendEmail(cleanEmail, code);
    return newAuth;
};

export async function checkEmailAndCode(email:string, code:number) {
    const cleanEmail = email.trim().toLowerCase();
    const auth = await Auth.checkEmailAndCode(cleanEmail, code);
    if(!auth) {
        return null;
    } else {
        const token = generateToken({userId: auth.userId});
        return {token};
    }
};

export async function updateUserData(userId:string, newUserData:object) {
    const user:User = new User(userId);
    await user.pull();
    user.data = {
        ...user.data,
        ...newUserData
    };
    await user.push();
    return user;
};

export async function updateSpecificUserProp(userId:string, newUserProp:{propKey, propValue}) {
    console.log("Esto viene del controller",newUserProp)
    const user:User = new User(userId);
    await user.pull();
    user.data = {
        ...user.data,
        [newUserProp.propKey]: newUserProp.propValue
    };
    await user.push();
    return user;
}