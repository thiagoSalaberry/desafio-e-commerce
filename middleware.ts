import { NextResponse } from "next/server";

const regex = /^http:\/\/localhost:3000(?:\/[^\/]*)*$/;
const allowedOrigins = ["http://localhost:3000/login"];
export function middleware(req: Request) {
  const url = req.url;
  if (
    regex.test(url) ||
    url == "https://desafio-e-commerce-five.vercel.app/api/auth/token"
  ) {
    console.log(url);
  } else {
    console.log("esta es la url que supuestamente no pasa", url);
    console.log("No pasa el test");
  }
  return NextResponse.next();
}
