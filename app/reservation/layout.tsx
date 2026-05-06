import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation",
  description:
    "Request a table reservation at Big Bowl Hot Pot in Calgary for groups of 4 to 20 guests.",
  alternates: {
    canonical: "/reservation"
  }
};

export default function ReservationLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
