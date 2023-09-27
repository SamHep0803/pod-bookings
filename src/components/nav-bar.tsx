import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { getPageSession } from "@/lib/auth/session";

export const NavBar: React.FC<{}> = async () => {
    const session = await getPageSession();

    return (
        <div className="flex w-full items-center justify-between p-2 px-8 border-b">
            <div className="flex items-center gap-x-4">
                <Link href="/" className="flex items-baseline relative h-12 w-12">
                    <Image src={"/images/DC_Logo.png"} alt="DC Logo" fill />
                </Link>
                <div className="font-semibold text-2xl select-none">Pod Bookings</div>
            </div>
            {session ? (
                <div className="flex items-center gap-x-4">
                    <div className="text-lg select-none">{session.user.name}</div>
                    <Button asChild>
                        <a href="/api/auth/logout">Logout</a>
                    </Button>
                </div>
            ) : (
                <Button asChild>
                    <a href="/api/auth/login">Login</a>
                </Button>
            )}
        </div>
    );
};
