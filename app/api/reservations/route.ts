import { NextRequest, NextResponse } from "next/server";
import {
  customerPendingEmail,
  restaurantNotificationEmail,
  sendReservationEmail
} from "@/app/lib/reservation-email";
import { ReservationRecord } from "@/app/lib/reservation-store";
import { createReservationToken } from "@/app/lib/reservation-token";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern =
  /^(\+1[\s.-]?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.-]?[2-9][0-9]{2}[\s.-]?[0-9]{4}$/;

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const reservation: ReservationRecord = {
      id: crypto.randomUUID(),
      token: crypto.randomUUID(),
      status: "pending",
      date: cleanString(body.date),
      time: cleanString(body.time),
      party: cleanString(body.party),
      name: cleanString(body.name),
      email: cleanString(body.email),
      phone: cleanString(body.phone),
      requests: cleanString(body.requests),
      createdAt: new Date().toISOString()
    };

    const partySize = Number(reservation.party);
    const requiredFields = [
      reservation.date,
      reservation.time,
      reservation.party,
      reservation.name,
      reservation.email,
      reservation.phone
    ];

    if (requiredFields.some((field) => !field)) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!emailPattern.test(reservation.email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!phonePattern.test(reservation.phone)) {
      return NextResponse.json(
        { error: "Please enter a valid Canadian phone number." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(partySize) || partySize < 4 || partySize > 20) {
      return NextResponse.json({ error: "Party size must be between 4 and 20." }, { status: 400 });
    }

    reservation.token = createReservationToken(reservation);

    const restaurantEmail = restaurantNotificationEmail(reservation);
    const pendingEmail = customerPendingEmail(reservation);

    await Promise.all([
      sendReservationEmail(restaurantEmail),
      sendReservationEmail(pendingEmail)
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "We could not submit your reservation right now. Please call us directly."
      },
      { status: 500 }
    );
  }
}
