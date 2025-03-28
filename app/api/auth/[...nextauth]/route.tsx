import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const POST = NextAuth(authOptions);
export const PUT = NextAuth(authOptions);
export const DELETE = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
