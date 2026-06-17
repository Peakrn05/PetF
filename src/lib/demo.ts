"use client";
import { Reservation, Service, Pet, TimeSlot } from "./types";
import { services } from "./data";

/*
 * Demo persistence layer. The app ships as a portfolio demo with no live
 * backend, so bookings are kept in localStorage. If a real backend ever
 * responds, the hooks use it first and never reach this file.
 */
const KEY = "demo_reservations";

function relDate(daysFromNow: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

function seed(): Reservation[] {
  const pet: Pet = { id: "demo-pet-1", name: "Max", species: "DOG", breed: "Golden Retriever", size: "LARGE", userId: "demo-user" };
  const mk = (service: Service, date: string, startTime: string, status: Reservation["status"]): Reservation => ({
    id: `demo-seed-${service.id}-${date}`,
    userId: "demo-user",
    petId: pet.id,
    serviceId: service.id,
    timeSlotId: `${date}-seed`,
    date,
    startTime,
    status,
    totalPrice: service.basePrice,
    notes: "",
    createdAt: new Date().toISOString(),
    pet,
    service,
    timeSlot: { id: `${date}-seed`, date, startTime, endTime: `${String(parseInt(startTime) + 1).padStart(2, "0")}:00`, maxBookings: 3, currentBookings: 1 },
  });
  return [
    mk(services[9], relDate(3), "10:00", "CONFIRMED"),
    mk(services[16], relDate(7), "14:00", "PENDING"),
  ];
}

export function loadDemoReservations(): Reservation[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch { /* fall through to seed */ }
  }
  const seeded = seed();
  localStorage.setItem(KEY, JSON.stringify(seeded));
  return seeded;
}

export function addDemoReservation(r: Reservation): Reservation[] {
  const list = [r, ...loadDemoReservations()];
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}

export function cancelDemoReservation(id: string): Reservation[] {
  const list = loadDemoReservations().map((r) => (r.id === id ? { ...r, status: "CANCELLED" as const } : r));
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}

export function buildReservation(service: Service, pet: Pet, slot: TimeSlot, notes: string): Reservation {
  return {
    id: `demo-${Date.now()}`,
    userId: pet.userId || "demo-user",
    petId: pet.id,
    serviceId: service.id,
    timeSlotId: slot.id,
    date: slot.date,
    startTime: slot.startTime,
    status: "CONFIRMED",
    totalPrice: service.basePrice,
    notes: notes || "",
    createdAt: new Date().toISOString(),
    pet,
    service,
    timeSlot: slot,
  };
}
