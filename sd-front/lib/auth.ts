"server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma2 } from "./db";
import { PrismaClient } from "./generated/prisma";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

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
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({email, otp}) {
                await resend.emails.send({
                    from: 'SikajyDimy <onboarding@resend.dev>',
                    to: [email], 
                    subject: 'Sikajy Dimy -- Verify your email',
                    html: `<p>Your OTP code is : 
                    <strong>${otp}</strong></p>`,
            });
            }
        })
    ]
});