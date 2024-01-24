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
  const origin = req.headers.get("origin");
  if (
    /*regex.test(url)*/ url.includes(
      "https://desafio-e-commerce-five.vercel.app/api"
    ) &&
    regex.test(origin)
  ) {
    console.log(url);
    console.log(origin);
    return NextResponse.next();
  } else {
    console.log("esta es la url que supuestamente no pasa", url);
    console.log("No pasa el test");
    console.log(origin);
    throw new Error("No pasa el middleware");
  }
}
