import { createHmac, timingSafeEqual } from "crypto";
import type { ReservationRecord } from "@/app/lib/reservation-store";

function getTokenSecret() {
  const secret =
    process.env.RESERVATION_TOKEN_SECRET ??
    process.env.RESERVATION_ADMIN_KEY ??
    process.env.RESEND_API_KEY;

  if (!secret) {
    throw new Error("RESERVATION_TOKEN_SECRET is not configured.");
  }

  return secret;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return createHmac("sha256", getTokenSecret()).update(payload).digest("base64url");
}

export function createReservationToken(reservation: ReservationRecord) {
  const payload = encodeBase64Url(JSON.stringify(reservation));
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

export function readReservationToken(token: string) {
  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payload);
  const signatureBuffer = Buffer.from(signature, "base64url");
  const expectedBuffer = Buffer.from(expectedSignature, "base64url");

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  return JSON.parse(decodeBase64Url(payload)) as ReservationRecord;
}
