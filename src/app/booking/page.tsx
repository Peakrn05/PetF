"use client";
import { useState, useEffect, useMemo, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Separator, TextField, TextArea, Label, Spinner } from "@heroui/react";
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react";
import BookingSteps from "@/components/BookingSteps";
import ServiceFilter from "@/components/ServiceFilter";
import PetSelector from "@/components/PetSelector";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import { useAuth } from "@/hooks/useAuth";
import { services as allServices } from "@/lib/data";
import api from "@/lib/api";
import { Service, Pet, TimeSlot, ServiceCategory, PetType } from "@/lib/types";

const STEPS = ["Service", "Pet", "Date & Time", "Confirm"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Spinner /></div>}>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loadUser } = useAuth();
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState<ServiceCategory>("ALL");
  const [petType, setPetType] = useState<PetType>("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => { loadUser(); }, [loadUser]);

  useEffect(() => {
    const sid = searchParams.get("serviceId");
    if (sid) {
      const found = allServices.find((s) => s.id === sid);
      if (found) { setSelectedService(found); setStep(1); }
    }
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    return allServices.filter((s) => {
      if (category !== "ALL" && s.category !== category) return false;
      if (petType !== "ALL" && s.petType !== petType) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, petType, search]);

  const goToStep = (newStep: number) => {
    setStep(newStep);
    setError("");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!user) { router.push("/login?redirect=/booking"); return; }
    if (!selectedService || !selectedPet || !selectedSlot) return;
    setError("");
    setSubmitting(true);
    try {
      await api.post("/reservations", {
        petId: selectedPet.id,
        serviceId: selectedService.id,
        timeSlotId: selectedSlot.id,
        notes,
      });
      setDone(true);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      setError("Booking failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-navy mb-3">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-1 text-lg">{selectedService?.name} for {selectedPet?.name}</p>
        <p className="text-gray-400 mb-10">{selectedSlot ? formatDate(selectedSlot.date) : ""} at {selectedSlot?.startTime}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button className="bg-primary text-white hover:bg-primary-dark" onPress={() => router.push("/my-reservations")}>View My Bookings</Button>
          <Button variant="outline" onPress={() => { setDone(false); goToStep(0); setSelectedService(null); setSelectedPet(null); setSelectedSlot(null); }}>Book Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <div ref={topRef} />
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy mb-6">Book an Appointment</h1>
          <BookingSteps currentStep={step} steps={STEPS} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-5">Select a Service</h2>
              <ServiceFilter category={category} setCategory={setCategory} petType={petType} setPetType={setPetType} search={search} setSearch={setSearch} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {filteredServices.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`text-left rounded-xl border p-5 transition-all ${
                      selectedService?.id === s.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                        : "border-gray-100 bg-gray-50 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-navy mb-1">{s.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{s.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{s.duration} min - {s.petType}</p>
                      </div>
                      <span className="font-bold text-primary whitespace-nowrap">{s.basePrice.toLocaleString()} <span className="text-xs font-normal text-gray-400">THB</span></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-5">Select Your Pet</h2>
              {!user && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-sm text-blue-700">Log in to save pets across sessions. You can still continue as a guest.</p>
                </div>
              )}
              <PetSelector selectedPet={selectedPet} onSelect={setSelectedPet} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-5">Select Date &amp; Time</h2>
              <TimeSlotPicker selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-5">Review &amp; Confirm</h2>
              <div className="bg-surface rounded-xl p-5 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Service</p>
                  <p className="font-semibold text-navy">{selectedService?.name}</p>
                  <p className="text-sm text-gray-500">{selectedService?.duration} min</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pet</p>
                  <p className="font-semibold text-navy">{selectedPet?.name}</p>
                  <p className="text-sm text-gray-500">{selectedPet?.species} - {selectedPet?.size}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Date</p>
                  <p className="font-semibold text-navy">{selectedSlot ? formatDate(selectedSlot.date) : ""}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Time</p>
                  <p className="font-semibold text-navy">{selectedSlot?.startTime} – {selectedSlot?.endTime}</p>
                </div>
              </div>

              <TextField value={notes} onChange={setNotes} className="mb-5">
                <Label>Special Notes (optional)</Label>
                <TextArea placeholder="Any allergies, special requests, or instructions?" />
              </TextField>

              <Separator className="mb-5" />

              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-3xl font-bold text-primary">{selectedService?.basePrice.toLocaleString()} <span className="text-base font-normal text-gray-400">THB</span></span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onPress={() => goToStep(Math.max(0, step - 1))} isDisabled={step === 0}>
            <ArrowLeft size={16} /> Back
          </Button>

          {step < 3 ? (
            <Button
              className="bg-primary text-white hover:bg-primary-dark"
              onPress={() => goToStep(step + 1)}
              isDisabled={
                (step === 0 && !selectedService) ||
                (step === 1 && !selectedPet) ||
                (step === 2 && !selectedSlot)
              }
            >
              Continue <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              isDisabled={submitting}
              onPress={handleSubmit}
            >
              {submitting ? "Confirming..." : "Confirm Booking"} <Check size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
