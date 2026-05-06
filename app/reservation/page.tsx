"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { PageHero } from "@/app/components/PageHero";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

function formatCanadianPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ReservationPage() {
  const [phone, setPhone] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const reservationTimes = Array.from({ length: 18 }, (_, index) => {
    const totalMinutes = 12 * 60 + index * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  });
  const partySizes = Array.from({ length: 17 }, (_, index) => index + 4);

  const handleReservationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Reservation could not be submitted.");
      }

      form.reset();
      setPhone("");
      setSubmitStatus("success");
      setSubmitMessage(
        "Your reservation request has been sent. Please check your email for the request summary."
      );
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "We could not submit your reservation right now. Please call us directly."
      );
    }
  };

  return (
    <main>
      <SiteHeader currentPath="/reservation" />
      <PageHero eyebrow="Book a table" title="RESERVATION" />

      <section className="contact-page-section reservation-page-section page-section">
        <div className="contact-info-layout">
          <form className="reservation-form-panel" onSubmit={handleReservationSubmit}>
            <fieldset className="reservation-fieldset">
              <legend>Book a table</legend>
              <label>
                <span>Date</span>
                <input type="date" name="date" required />
              </label>
              <label>
                <span>Time</span>
                <select name="time" defaultValue="" required>
                  <option value="" disabled>
                    Select a time
                  </option>
                  {reservationTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
              <label className="reservation-party-field">
                <span>Party</span>
                <select name="party" defaultValue="4" required>
                  {partySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>

            <fieldset className="reservation-fieldset">
              <legend>Contact Details</legend>
              <label>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => setPhone(formatCanadianPhone(event.target.value))}
                  pattern="^(\\+1[\\s.-]?)?(\\([2-9][0-9]{2}\\)|[2-9][0-9]{2})[\\s.-]?[2-9][0-9]{2}[\\s.-]?[0-9]{4}$"
                  title="Use a Canadian phone number, such as (403) 999-5937."
                  required
                />
              </label>
              <label>
                <span>Special Requests</span>
                <textarea name="requests" rows={4} />
              </label>
              <button
                className="solid-button reservation-submit-button"
                type="submit"
                disabled={submitStatus === "submitting"}
              >
                {submitStatus === "submitting" ? "Sending..." : "Submit Reservation"}
              </button>
              {submitMessage ? (
                <p className={`reservation-form-message ${submitStatus}`}>{submitMessage}</p>
              ) : null}
            </fieldset>
          </form>

          <div className="contact-image-panel reservation-image-panel">
            <img src="/contact/dining-area-bg.png" alt="" />
            <aside className="reservation-notes" aria-label="Reservation details">
              <div className="reservation-note">
                <span className="reservation-note-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 11a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm10 0a3 3 0 1 1 3-3 3 3 0 0 1-3 3ZM7 13c-3.1 0-5 1.5-5 3.7V18h10v-1.3C12 14.5 10.1 13 7 13Zm10 0c-3.1 0-5 1.5-5 3.7V18h10v-1.3C22 14.5 20.1 13 17 13Z" />
                  </svg>
                </span>
                <p>
                  Groups of <strong>more than 12 guests</strong> may be seated at two nearby
                  tables.
                </p>
              </div>
              <div className="reservation-note">
                <span className="reservation-note-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 1 0 10 10A10.02 10.02 0 0 0 12 2Zm4 11h-4.5a1 1 0 0 1-1-1V6h2v5H16Z" />
                  </svg>
                </span>
                <p>
                  Reservations will be held for <strong>15 minutes.</strong> After that, the
                  reservation may be cancelled.
                </p>
              </div>
              <div className="reservation-note">
                <span className="reservation-note-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6.6 10.8a15.8 15.8 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 13 13 0 0 0 4.1.7 1.3 1.3 0 0 1 1.3 1.3v3.5a1.3 1.3 0 0 1-1.3 1.3A18.7 18.7 0 0 1 2.3 3.3 1.3 1.3 0 0 1 3.6 2h3.5a1.3 1.3 0 0 1 1.3 1.3 13 13 0 0 0 .7 4.1 1.2 1.2 0 0 1-.3 1.2Z" />
                  </svg>
                </span>
                <p>
                  For <strong>same-day reservations</strong>, please call us directly.
                </p>
              </div>
              <div className="reservation-note">
                <span className="reservation-note-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8 8-5.2V7l-8 5.1L4 7v.8Z" />
                  </svg>
                </span>
                <p>
                  Submitting the form does <strong>not guarantee</strong> a reservation. We will
                  email you once your reservation is confirmed. Please check your spam folder if you
                  do not receive any updates.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
