"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { Reservation } from "@/lib/types";
import { loadDemoReservations, cancelDemoReservation } from "@/lib/demo";

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/reservations");
      setReservations(res.data);
    } catch {
      // No backend (demo mode): show locally stored bookings
      setReservations(loadDemoReservations());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const createReservation = async (data: {
    petId: string;
    serviceId: string;
    timeSlotId: string;
    notes?: string;
  }) => {
    const res = await api.post("/reservations", data);
    setReservations((prev) => [res.data, ...prev]);
    return res.data;
  };

  const cancelReservation = async (id: string) => {
    try {
      const res = await api.put(`/reservations/${id}/cancel`);
      setReservations((prev) => prev.map((r) => (r.id === id ? res.data : r)));
    } catch {
      // No backend (demo mode): cancel locally
      setReservations(cancelDemoReservation(id));
    }
  };

  return { reservations, loading, fetchReservations, createReservation, cancelReservation };
}
