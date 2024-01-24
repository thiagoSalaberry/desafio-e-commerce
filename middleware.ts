import { NextResponse } from "next/server";

const regex = /^http:\/\/localhost:3000(?:\/[^\/]*)*$/;
const allowedOrigins = [
  "http://localhost:3000/login",
  "http://localhost:3001/login",
  "https://desafio-e-commerce-five.vercel.app/api/auth/token",
  "https://www.google.com",
];
export function middleware(req: Request) {
  const url = req.url;
  if (regex.test(url)) {
    console.log(url);
  } else {
    console.log("esta es la url que supuestamente no pasa", url);
    console.log("No pasa el test");
  }
  return NextResponse.next();
}
