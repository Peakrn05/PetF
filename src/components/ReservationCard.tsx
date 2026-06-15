"use client";
import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import { Calendar, Clock, Dog, Cat, AlertTriangle } from "lucide-react";
import { Reservation } from "@/lib/types";

interface Props {
  reservation: Reservation;
  onCancel: (id: string) => void;
}

const statusConfig: Record<string, { color: "warning" | "success" | "accent" | "danger"; label: string }> = {
  PENDING: { color: "warning", label: "Pending" },
  CONFIRMED: { color: "success", label: "Confirmed" },
  COMPLETED: { color: "accent", label: "Completed" },
  CANCELLED: { color: "danger", label: "Cancelled" },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export default function ReservationCard({ reservation, onCancel }: Props) {
  const { pet, service, date, startTime, status, totalPrice } = reservation;
  const canCancel = status === "PENDING" || status === "CONFIRMED";
  const cfg = statusConfig[status] || statusConfig.PENDING;
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            {pet.species === "DOG" ? <Dog size={20} className="text-primary" /> : <Cat size={20} className="text-primary" />}
          </div>
          <div>
            <p className="font-bold text-navy">{pet.name}</p>
            <p className="text-xs text-gray-400">{pet.species} - {pet.size}</p>
          </div>
        </div>
        <Chip size="sm" color={cfg.color}>{cfg.label}</Chip>
      </div>

      <h3 className="font-semibold text-navy text-lg mb-3">{service.name}</h3>

      <div className="flex flex-wrap gap-5 text-sm text-gray-500 mb-5">
        <div className="flex items-center gap-1.5">
          <Calendar size={15} className="text-primary" /> <span>{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={15} className="text-primary" /> <span>{startTime}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span></span>
        {canCancel && !confirming && (
          <Button size="sm" variant="danger-soft" onPress={() => setConfirming(true)}>
            Cancel Booking
          </Button>
        )}
      </div>

      {confirming && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-sm font-semibold text-red-700">Cancel this booking?</span>
          </div>
          <p className="text-xs text-red-500 mb-3">This action cannot be undone.</p>
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="ghost" onPress={() => setConfirming(false)}>Keep It</Button>
            <Button size="sm" variant="danger-soft" onPress={() => { onCancel(reservation.id); setConfirming(false); }}>Yes, Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
