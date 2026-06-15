"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { Reservation } from "@/lib/types";

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/reservations");
      setReservations(res.data);
    } catch {
      // not logged in or error
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
    const res = await api.put(`/reservations/${id}/cancel`);
    setReservations((prev) => prev.map((r) => (r.id === id ? res.data : r)));
    return res.data;
  };

  return { reservations, loading, fetchReservations, createReservation, cancelReservation };
}
