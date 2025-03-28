import { NextAuthOptions , User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { Document , WithId } from "mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials: Record<"username" | "password", string> | undefined): Promise<User | null> => {
                if (!credentials) {
                    throw new TypeError('Credentials must be strings');
                }

                const client = await clientPromise;
                await client.connect();
                const db = client.db('cluster0');
                const usersCollection = db.collection('users');

                const user = await usersCollection.findOne({ username: credentials.username }) as WithId<Document> & User;

                if (!user) {
                    throw new Error('User not found');
                }

                if (!await bcrypt.compare(credentials.password, user.password)) {
                    throw new Error('Password not match');
                }

                return {
                    id: user._id.toString(),
                    name: user.username,
                    email: user.email,
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET as string,
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
            }
            return session;
        }
    }
};