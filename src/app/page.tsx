import { PodTable } from "@/components/pod-table";
import { Button } from "@/components/ui/button";
import { getPageSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { Suspense } from "react";

export default async function Home() {
    const session = await getPageSession();

    const bookings = await prisma.booking.findMany({
        orderBy: [{ date: "asc" }, { period: "asc" }],
        include: {
            user: true,
        },
    });

    return (
        <div className="flex flex-col gap-y-4">
            <div className="text-4xl font-semibold">
                Week Beginning:{" "}
                <span className="font-normal" suppressHydrationWarning={true}>
                    {getMonday(new Date()).toDateString()}
                </span>
            </div>
            <Suspense>
                <PodTable bookings={bookings} />
            </Suspense>
        </div>
    );
}

function getMonday(d: Date) {
    var day = d.getUTCDay(),
        diff = d.getUTCDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setUTCDate(diff));
}
