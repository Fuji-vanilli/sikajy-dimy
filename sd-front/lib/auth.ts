import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma2 } from "./db";
import { PrismaClient } from "./generated/prisma";
import { env } from "./env";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma2, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }
    }
});