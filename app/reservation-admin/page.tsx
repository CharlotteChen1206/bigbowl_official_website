import { getReservations } from "@/app/lib/reservation-store";

type ReservationAdminPageProps = {
  searchParams: Promise<{
    key?: string;
  }>;
};

function formatDateTime(date: string, time: string) {
  return `${date} ${time}`;
}

export default async function ReservationAdminPage({ searchParams }: ReservationAdminPageProps) {
  const { key } = await searchParams;
  const adminKey = process.env.RESERVATION_ADMIN_KEY;

  if (!adminKey || key !== adminKey) {
    return (
      <main className="reservation-admin-page">
        <section className="reservation-admin-auth">
          <h1>Reservation Admin</h1>
          <p>This page requires a valid admin key.</p>
        </section>
      </main>
    );
  }

  const reservations = await getReservations();
  const confirmedReservations = reservations.filter(
    (reservation) => reservation.status === "confirmed"
  );
  const pendingReservations = reservations.filter((reservation) => reservation.status === "pending");

  return (
    <main className="reservation-admin-page">
      <section className="reservation-admin-header">
        <p>Hidden Admin Page</p>
        <h1>Reservations</h1>
        <div className="reservation-admin-stats">
          <span>{pendingReservations.length} pending</span>
          <span>{confirmedReservations.length} confirmed</span>
        </div>
      </section>

      <section className="reservation-admin-section">
        <h2>Confirmed Reservations</h2>
        <div className="reservation-admin-table-shell">
          <table className="reservation-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date / Time</th>
                <th>Party</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Requests</th>
                <th>Confirmed</th>
              </tr>
            </thead>
            <tbody>
              {confirmedReservations.length ? (
                confirmedReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.name}</td>
                    <td>{formatDateTime(reservation.date, reservation.time)}</td>
                    <td>{reservation.party}</td>
                    <td>{reservation.email}</td>
                    <td>{reservation.phone}</td>
                    <td>{reservation.requests || "None"}</td>
                    <td>{reservation.confirmedAt ? new Date(reservation.confirmedAt).toLocaleString() : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No confirmed reservations yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="reservation-admin-section">
        <h2>Pending Reservations</h2>
        <div className="reservation-admin-table-shell">
          <table className="reservation-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date / Time</th>
                <th>Party</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Requests</th>
                <th>Confirm Link</th>
              </tr>
            </thead>
            <tbody>
              {pendingReservations.length ? (
                pendingReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.name}</td>
                    <td>{formatDateTime(reservation.date, reservation.time)}</td>
                    <td>{reservation.party}</td>
                    <td>{reservation.email}</td>
                    <td>{reservation.phone}</td>
                    <td>{reservation.requests || "None"}</td>
                    <td>
                      <a href={`/api/reservations/confirm?token=${reservation.token}`}>Confirm</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No pending reservations.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
