import { NextRequest, NextResponse } from "next/server";
import { customerConfirmationEmail, sendReservationEmail } from "@/app/lib/reservation-email";
import { readReservationToken } from "@/app/lib/reservation-token";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlResponse(title: string, content: string, status = 200, confirmed = false) {
  return new NextResponse(
    `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <style>
          body { margin: 0; font-family: Arial, sans-serif; background: #fffdfa; color: #161616; }
          main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
          section { max-width: 560px; padding: 34px; background: #fff; border: 1px solid #eadfce; border-radius: 14px; box-shadow: 0 24px 64px rgba(22, 20, 16, 0.12); }
          h1 { margin: 0 0 12px; font-size: 28px; }
          p { margin: 0 0 18px; line-height: 1.6; }
          p:last-child { margin-bottom: 0; }
          .status { display: inline-block; margin-bottom: 18px; padding: 8px 12px; border-radius: 999px; background: ${confirmed ? "#e8f7ef" : "#fff2d8"}; color: ${confirmed ? "#145438" : "#7f5a21"}; font-weight: 700; }
          button { min-height: 46px; padding: 0 22px; border: 0; border-radius: 999px; background: #173f4b; color: #fff; cursor: pointer; font: inherit; font-weight: 700; }
          button:disabled { background: #a9a9a9; cursor: default; }
        </style>
      </head>
      <body>
        <main>
          <section>
            <span class="status">${confirmed ? "Confirmed" : "Action Needed"}</span>
            <h1>${escapeHtml(title)}</h1>
            ${content}
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

function invalidTokenResponse() {
  return htmlResponse(
    "Reservation Not Found",
    "<p>This confirmation link is invalid or incomplete.</p>",
    404
  );
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return invalidTokenResponse();
  }

  const reservation = readReservationToken(token);

  if (!reservation) {
    return invalidTokenResponse();
  }

  return htmlResponse(
    "Confirm Reservation",
    `
      <p>Confirm the reservation for <strong>${escapeHtml(reservation.name)}</strong> and send a confirmation email to <strong>${escapeHtml(reservation.email)}</strong>.</p>
      <form method="post">
        <input type="hidden" name="token" value="${escapeHtml(token)}" />
        <button type="submit">Confirm and Email Guest</button>
      </form>
    `
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get("token");

    if (typeof token !== "string") {
      return invalidTokenResponse();
    }

    const reservation = readReservationToken(token);

    if (!reservation) {
      return invalidTokenResponse();
    }

    await sendReservationEmail(customerConfirmationEmail(reservation));

    return htmlResponse(
      "Reservation Confirmed",
      `<p>The reservation for <strong>${escapeHtml(reservation.name)}</strong> has been confirmed. A confirmation email has been sent to <strong>${escapeHtml(reservation.email)}</strong>.</p><p>You can close this page now.</p>`,
      200,
      true
    );
  } catch (error) {
    console.error(error);

    return htmlResponse(
      "Confirmation Failed",
      "<p>The confirmation email could not be sent. Please contact the guest directly.</p>",
      500
    );
  }
}
