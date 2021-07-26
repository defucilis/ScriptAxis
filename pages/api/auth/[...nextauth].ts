import { NextApiHandler } from "next";
import NextAuth, { Session, NextAuthOptions, User } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import Database from "lib/Database";

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
        prisma: Database.Instance(),
    }),
    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: "/signin",
        verifyRequest: "/checkemail",
    },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
