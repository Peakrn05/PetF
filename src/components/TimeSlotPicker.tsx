"use client";
import { useState, useEffect } from "react";
import { Button, Spinner } from "@heroui/react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import api from "@/lib/api";
import { TimeSlot } from "@/lib/types";
import { generateTimeSlots } from "@/lib/data";

interface Props {
  selectedSlot: TimeSlot | null;
  onSelect: (slot: TimeSlot) => void;
}

export default function TimeSlotPicker({ selectedSlot, onSelect }: Props) {
  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  const dateStr = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      try {
        const res = await api.get(`/timeslots?date=${dateStr}`);
        if (res.data?.length) setSlots(res.data);
        else setSlots(generateTimeSlots(dateStr));
      } catch {
        setSlots(generateTimeSlots(dateStr));
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, [dateStr]);

  const prevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    if (d >= tomorrow) setCurrentDate(d);
  };

  const nextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    const max = new Date();
    max.setDate(max.getDate() + 30);
    if (d <= max) setCurrentDate(d);
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const quickDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-surface rounded-xl p-3">
        <Button isIconOnly variant="ghost" onPress={prevDay} size="sm">
          <ChevronLeft size={18} />
        </Button>
        <h3 className="font-semibold text-navy">
          {dayNames[currentDate.getDay()]}, {currentDate.getDate()} {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <Button isIconOnly variant="ghost" onPress={nextDay} size="sm">
          <ChevronRight size={18} />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickDates.map((d) => {
          const ds = d.toISOString().split("T")[0];
          const isActive = ds === dateStr;
          const isSunday = d.getDay() === 0;
          return (
            <button
              key={ds}
              onClick={() => setCurrentDate(new Date(d))}
              className={`min-w-[58px] flex-shrink-0 rounded-xl px-3 py-2.5 text-center transition-all ${
                isActive ? "bg-primary text-white shadow-sm" :
                isSunday ? "bg-gray-50 text-gray-300 cursor-default" :
                "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="text-xs mb-0.5">{dayNames[d.getDay()]}</div>
              <div className="font-bold text-sm">{d.getDate()}</div>
            </button>
          );
        })}
      </div>

      {currentDate.getDay() === 0 ? (
        <div className="text-center py-10 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-700 font-semibold">Closed on Sundays</p>
          <p className="text-sm text-amber-500 mt-1">Please select a weekday</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-10"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {slots.map((slot) => {
            const available = slot.currentBookings < slot.maxBookings;
            const isSelected = selectedSlot?.id === slot.id;
            const spotsLeft = slot.maxBookings - slot.currentBookings;

            return (
              <button
                key={slot.id}
                disabled={!available}
                onClick={() => available && onSelect(slot)}
                className={`rounded-xl border p-3 text-center transition-all ${
                  isSelected ? "border-primary bg-primary/5 shadow-sm" :
                  available ? "border-gray-200 hover:border-primary hover:bg-primary/5" :
                  "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock size={13} className={isSelected ? "text-primary" : "text-gray-400"} />
                  <span className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-navy"}`}>{slot.startTime}</span>
                </div>
                <span className={`text-xs ${
                  available ? (spotsLeft === 1 ? "text-amber-500" : "text-green-500") : "text-red-400"
                }`}>
                  {available ? `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left` : "Full"}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
