import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as client } from "@/lib/db/prisma";
import { azureAD } from "@lucia-auth/oauth/providers"

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: prisma(client),

  getUserAttributes: (data) => {
    return {
      email: data.email,
      name: data.name,
    }
  }
});

export const dcAuth = azureAD(auth, {
  clientId: process.env.AZURE_CLIENT_ID!,
  clientSecret: process.env.AZURE_CLIENT_SECRET!,
  tenant: process.env.AZURE_TENANT_ID!,
  redirectUri: process.env.AZURE_REDIRECT_URI!,
  scope: ["email", "openid", "profile", "offline_access"]
});

export type Auth = typeof auth;
