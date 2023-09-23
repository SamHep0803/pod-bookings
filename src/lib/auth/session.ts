import { cache } from "react";
import { auth } from "./lucia";
import * as context from "next/headers";

export const getPageSession = cache(() => {
    const authRequest = auth.handleRequest("GET", context);
    return authRequest.validate();
});
