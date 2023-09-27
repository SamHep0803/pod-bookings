// app/api/auth/login/dubaicollege/route.ts
import { auth, dcAuth } from "@/lib/auth/lucia";
import * as context from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const [url, codeVerifier, state] = await dcAuth.getAuthorizationUrl();
    // store state
    context.cookies().set("dc_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60
    });
    context.cookies().set("dc_oauth_code_verifier", codeVerifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60
    });
    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    });
};
