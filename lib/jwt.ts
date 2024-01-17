import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(obj:object):string {
    const token:string = jwt.sign(obj, JWT_SECRET);
    return token;
};

export function verifyToken(token:string) {
    try{
        const verified = jwt.verify(token, JWT_SECRET);
        return verified;
    } catch(e) {
        return null;
    }
}