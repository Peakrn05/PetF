"use client";
import { Card, Button, Chip, Separator } from "@heroui/react";
import { Calendar, Clock, Dog, Cat } from "lucide-react";
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

export default function ReservationCard({ reservation, onCancel }: Props) {
  const { pet, service, date, startTime, status, totalPrice } = reservation;
  const canCancel = status === "PENDING" || status === "CONFIRMED";
  const cfg = statusConfig[status] || statusConfig.PENDING;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <Card.Content className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {pet.species === "DOG" ? <Dog size={20} className="text-purple-500" /> : <Cat size={20} className="text-pink-500" />}
            <span className="font-semibold">{pet.name}</span>
          </div>
          <Chip size="sm" color={cfg.color}>{cfg.label}</Chip>
        </div>

        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} /> <span>{startTime}</span>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-purple-600">฿{totalPrice.toLocaleString()}</span>
          {canCancel && (
            <Button size="sm" variant="danger-soft" onPress={() => onCancel(reservation.id)}>
              Cancel
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
