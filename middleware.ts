import { NextResponse } from "next/server";

const regex = /^http:\/\/localhost:3000(?:\/[^\/]*)*$/;
const allowedOrigins = ["http://localhost:3000/login"];
export function middleware(req: Request) {
  const url = req.url;
  if (regex.test(url)) {
    console.log(url);
  } else {
    console.log("No pasa el test");
  }
  return NextResponse.next();
}
