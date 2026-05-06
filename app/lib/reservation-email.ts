import type { ReservationRecord } from "@/app/lib/reservation-store";

const restaurantEmail = "bigbowlhotpot@gmail.com";

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

function getSenderEmail() {
  return process.env.RESERVATION_FROM_EMAIL ?? "Big Bowl Hot Pot <reservations@bigbowlhotpot.com>";
}

function getRestaurantNotificationEmails() {
  const configuredEmails = process.env.RESERVATION_NOTIFICATION_EMAILS;

  if (!configuredEmails) {
    return [restaurantEmail];
  }

  return configuredEmails
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendReservationEmail({ to, subject, html, replyTo }: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: getSenderEmail(),
      to,
      subject,
      html,
      replyTo
    })
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Email send failed: ${response.status} ${responseText}`);
  }
}

function formatReservationDate(date: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(parsedDate);
}

function formatReservationTime(time: string) {
  const [hourValue, minuteValue] = time.split(":").map(Number);

  if (!Number.isFinite(hourValue) || !Number.isFinite(minuteValue)) {
    return time;
  }

  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(new Date(2026, 0, 1, hourValue, minuteValue));
}

function pluralizeGuests(party: string) {
  return party === "1" ? "1 guest" : `${party} guests`;
}

function reservationRows(reservation: ReservationRecord) {
  const rows = [
    ["Date", reservation.date],
    ["Time", reservation.time],
    ["Party", reservation.party],
    ["Name", reservation.name],
    ["Email", reservation.email],
    ["Phone", reservation.phone],
    ["Special Requests", reservation.requests || "None"]
  ];

  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">${label}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");
}

function emailShell(content: string) {
  return `
    <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.5;">
      <div style="max-width:640px;margin:0 auto;padding:28px;background:#fffaf2;border:1px solid #eadfce;">
        ${content}
      </div>
    </div>
  `;
}

export function restaurantNotificationEmail(reservation: ReservationRecord) {
  const formattedDate = formatReservationDate(reservation.date);
  const formattedTime = formatReservationTime(reservation.time);

  return {
    to: getRestaurantNotificationEmails(),
    subject: `New booking request: ${reservation.name} for ${pluralizeGuests(reservation.party)}`,
    replyTo: reservation.email,
    html: emailShell(`
      <h1 style="margin:0 0 16px;font-size:24px;">New Booking Request</h1>
      <p style="margin:0 0 18px;">A new reservation request has been submitted through the website.</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:22px;background:#fff;">
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(reservation.name)}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">Date</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(formattedDate)}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">Time</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(formattedTime)}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">Party</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(pluralizeGuests(reservation.party))}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(reservation.email)}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(reservation.phone)}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">Special Requests</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(reservation.requests || "None")}</td></tr>
      </table>
      <p style="margin:0 0 18px;">Please reply to the guest or contact them directly to confirm this reservation.</p>
    `)
  };
}

export function customerPendingEmail(reservation: ReservationRecord) {
  const formattedDate = formatReservationDate(reservation.date);
  const formattedTime = formatReservationTime(reservation.time);

  return {
    to: reservation.email,
    subject: "We received your Big Bowl Hot Pot booking request",
    replyTo: restaurantEmail,
    html: emailShell(`
      <h1 style="margin:0 0 16px;font-size:24px;">Booking Request Received</h1>
      <p style="margin:0 0 16px;">Hello ${escapeHtml(reservation.name)},</p>
      <p style="margin:0 0 16px;">We've received your booking request for <strong>${escapeHtml(formattedDate)}</strong> at <strong>${escapeHtml(formattedTime)}</strong> for <strong>${escapeHtml(pluralizeGuests(reservation.party))}</strong>.</p>
      <p style="margin:0 0 16px;">We're reviewing the details and will contact you once your reservation is confirmed. Submitting this request does not guarantee a reservation yet.</p>
      <p style="margin:0 0 18px;">If you do not receive another email from us by the day of your requested booking, please check your junk folder or call us at <strong>403-999-5937</strong>.</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;background:#fff;">${reservationRows(reservation)}</table>
      <p style="margin:0;">Thank you,<br />Big Bowl Hot Pot</p>
    `)
  };
}

export function customerConfirmationEmail(reservation: ReservationRecord) {
  const formattedDate = formatReservationDate(reservation.date);
  const formattedTime = formatReservationTime(reservation.time);

  return {
    to: reservation.email,
    subject: "Your Big Bowl Hot Pot reservation is confirmed",
    replyTo: restaurantEmail,
    html: emailShell(`
      <h1 style="margin:0 0 16px;font-size:24px;">Reservation Confirmed</h1>
      <p style="margin:0 0 16px;">Hello ${escapeHtml(reservation.name)},</p>
      <p style="margin:0 0 16px;">Your reservation for <strong>${escapeHtml(formattedDate)}</strong> at <strong>${escapeHtml(formattedTime)}</strong> for <strong>${escapeHtml(pluralizeGuests(reservation.party))}</strong> has been confirmed.</p>
      <p style="margin:0 0 18px;">We look forward to welcoming you to Big Bowl Hot Pot. Reservations are held for <strong>15 minutes</strong>; after that, the reservation may be cancelled.</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;background:#fff;">${reservationRows(reservation)}</table>
      <p style="margin:0;">If you need to change or cancel your reservation, please call us at <strong>403-999-5937</strong>.</p>
    `)
  };
}
