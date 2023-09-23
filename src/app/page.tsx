import { Button } from "@/components/ui/button";
import { getPageSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getPageSession();
    if (session) return redirect("/protected");

    return (
        <div className="flex h-screen w-full">
            <Button asChild>
                <a href="/api/auth/login/dubaicollege">Login</a>
            </Button>
        </div>
    );
}
