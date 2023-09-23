import { getPageSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AuthenticatedPage() {
    const session = await getPageSession();
    if (!session) return redirect("/login");

    return (
        <div>
            <h1>Authenticated Page</h1>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
        </div>
    );
}
