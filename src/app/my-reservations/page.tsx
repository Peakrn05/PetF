"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner, Button } from "@heroui/react";
import { CalendarPlus } from "lucide-react";
import ReservationCard from "@/components/ReservationCard";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";

export default function MyReservationsPage() {
  const router = useRouter();
  const { user, loading: authLoading, loadUser } = useAuth();
  const { reservations, loading, cancelReservation } = useReservations();

  useEffect(() => { loadUser(); }, [loadUser]);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login?redirect=/my-reservations");
  }, [authLoading, user, router]);

  if (authLoading || loading) {
    return <div className="flex justify-center py-20"><Spinner /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Reservations</h1>
          <p className="text-gray-500">Track and manage your bookings</p>
        </div>
        <Button variant="secondary" onPress={() => router.push("/booking")}>
          <CalendarPlus size={18} /> New Booking
        </Button>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">📅</p>
          <p className="text-xl font-semibold mb-2">No reservations yet</p>
          <p className="text-gray-500 mb-6">Book your first appointment for your furry friend!</p>
          <Button variant="secondary" onPress={() => router.push("/booking")}>Book Now</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {reservations.map((r) => (
            <ReservationCard key={r.id} reservation={r} onCancel={cancelReservation} />
          ))}
        </div>
      )}
    </div>
  );
}
