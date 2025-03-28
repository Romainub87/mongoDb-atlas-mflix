import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
        } & DefaultSession["user"],
        token: JWT;
    }
}

interface User extends DefaultUser {
    id: string;
    name: string;
    password: string;
}

interface JWT {
    id: string;
    name: string | null;
}
