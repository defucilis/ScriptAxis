import { NextApiHandler } from "next";
import NextAuth, { Session, NextAuthOptions, User } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    const globalAny: any = global;
    if (!globalAny.prisma) {
        globalAny.prisma = new PrismaClient();
    }
    prisma = globalAny.prisma;
}

const options: NextAuthOptions = {
    providers: [
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],

    callbacks: {
        session: async (session: Session, user: User) => {
            return { ...session, dbUser: user };
        },
    },

    adapter: Adapters.Prisma.Adapter({
        prisma,
    }),
    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: "/signin",
        verifyRequest: "/checkemail",
    },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
