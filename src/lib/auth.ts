/* import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
 
const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: {  
        enabled: true
    },
    trustedOrigins: ["http://localhost:3000", "https://7cd2-173-56-32-144.ngrok-free.app"],
    plugins: [nextCookies()] 
}); */

import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {  
        enabled: true
    },
});