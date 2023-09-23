// app/login/github/callback/route.ts
import { auth, dcAuth } from "@/lib/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const storedState = cookies().get("dc_oauth_state")?.value;
    const codeVerifier = cookies().get("dc_oauth_code_verifier")?.value;
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    // validate state
    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400
        });
    }
    if (!codeVerifier) {
        return new Response(null, {
            status: 500
        })
    }
    try {
        const { getExistingUser, azureADUser, createUser } =
            await dcAuth.validateCallback(code, codeVerifier);

        console.log("code:", code)
        console.log("code verifier:", codeVerifier)

        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) return existingUser;
            const user = await createUser({
                attributes: {
                    email: azureADUser.email!,
                    name: azureADUser.name,
                }
            });
            return user;
        };

        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        const authRequest = auth.handleRequest(request.method, {
            cookies,
            headers
        });
        authRequest.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/" // redirect to profile page
            }
        });
    } catch (e) {
        if (e instanceof OAuthRequestError) {
            // invalid code
            console.error(await e.response.json());
            return new Response(null, {
                status: 400
            });
        }
        console.error(e);
        return new Response(null, {
            status: 500
        });
    }
};
