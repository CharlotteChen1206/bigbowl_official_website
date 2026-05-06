import { promises as fs } from "fs";
import path from "path";

export type ReservationStatus = "pending" | "confirmed";

export type ReservationRecord = {
  id: string;
  token: string;
  status: ReservationStatus;
  date: string;
  time: string;
  party: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
  createdAt: string;
  confirmedAt?: string;
};

const dataDirectory = path.join(process.cwd(), ".data");
const reservationFile = path.join(dataDirectory, "reservations.json");

async function readReservations() {
  try {
    const file = await fs.readFile(reservationFile, "utf8");

    return JSON.parse(file) as ReservationRecord[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeReservations(reservations: ReservationRecord[]) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(reservationFile, JSON.stringify(reservations, null, 2), "utf8");
}

export async function saveReservation(reservation: ReservationRecord) {
  const reservations = await readReservations();

  reservations.unshift(reservation);
  await writeReservations(reservations);
}

export async function findReservationByToken(token: string) {
  const reservations = await readReservations();

  return reservations.find((reservation) => reservation.token === token) ?? null;
}

export async function getReservations() {
  return readReservations();
}

export async function confirmReservation(token: string) {
  const reservations = await readReservations();
  const reservationIndex = reservations.findIndex((reservation) => reservation.token === token);

  if (reservationIndex === -1) {
    return null;
  }

  const reservation = reservations[reservationIndex];

  if (reservation.status !== "confirmed") {
    reservation.status = "confirmed";
    reservation.confirmedAt = new Date().toISOString();
    reservations[reservationIndex] = reservation;
    await writeReservations(reservations);
  }

  return reservation;
}
