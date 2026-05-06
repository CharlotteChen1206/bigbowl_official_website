import { NextRequest, NextResponse } from "next/server";
import {
  customerConfirmationEmail,
  sendReservationEmail
} from "@/app/lib/reservation-email";
import { confirmReservation, findReservationByToken } from "@/app/lib/reservation-store";

export const runtime = "nodejs";

function htmlResponse(title: string, message: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <style>
          body { margin: 0; font-family: Arial, sans-serif; background: #f8f2e8; color: #161616; }
          main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
          section { max-width: 560px; padding: 34px; background: #fff; border: 1px solid #eadfce; border-radius: 14px; box-shadow: 0 24px 64px rgba(22, 20, 16, 0.12); }
          h1 { margin: 0 0 12px; font-size: 28px; }
          p { margin: 0; line-height: 1.6; }
        </style>
      </head>
      <body>
        <main>
          <section>
            <h1>${title}</h1>
            <p>${message}</p>
          </section>
        </main>
      </body>
    </html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    }
  );
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return htmlResponse("Missing Token", "This confirmation link is missing a token.", 400);
  }

  try {
    const existingReservation = await findReservationByToken(token);

    if (!existingReservation) {
      return htmlResponse("Reservation Not Found", "This confirmation link is invalid.", 404);
    }

    if (existingReservation.status === "confirmed") {
      return htmlResponse(
        "Already Confirmed",
        `The reservation for ${existingReservation.name} has already been confirmed.`
      );
    }

    const reservation = await confirmReservation(token);

    if (!reservation) {
      return htmlResponse("Reservation Not Found", "This confirmation link is invalid.", 404);
    }

    await sendReservationEmail(customerConfirmationEmail(reservation));

    return htmlResponse(
      "Reservation Confirmed",
      `The reservation for ${reservation.name} has been confirmed. A confirmation email has been sent to ${reservation.email}.`
    );
  } catch (error) {
    console.error(error);

    return htmlResponse(
      "Confirmation Failed",
      "The reservation was found, but the confirmation email could not be sent. Please contact the guest directly.",
      500
    );
  }
}
