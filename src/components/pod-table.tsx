import { Booking, Prisma, User } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { prisma } from "@/lib/db/prisma";
import { Suspense } from "react";

type BookingWithUser = Booking & { user: User };

export const PodTable: React.FC<{
    bookings: BookingWithUser[];
}> = async ({ bookings }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Pod</TableHead>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking) => {
                    return (
                        <TableRow key={booking.id}>
                            <TableCell>
                                {booking.date.toLocaleDateString("en-GB", { weekday: "long" })}
                            </TableCell>
                            <TableCell>Period {booking.period}</TableCell>
                            <TableCell>Pod {booking.pod}</TableCell>
                            <TableCell>{booking.user.name}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
