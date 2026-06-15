"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Button, Separator, TextField, TextArea, Label, Spinner } from "@heroui/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import BookingSteps from "@/components/BookingSteps";
import ServiceFilter from "@/components/ServiceFilter";
import PetSelector from "@/components/PetSelector";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import { useAuth } from "@/hooks/useAuth";
import { services as allServices } from "@/lib/data";
import api from "@/lib/api";
import { Service, Pet, TimeSlot, ServiceCategory, PetType } from "@/lib/types";

const STEPS = ["Service", "Pet", "Date & Time", "Confirm"];

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
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

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

  const handleSubmit = async () => {
    if (!user) { router.push("/login?redirect=/booking"); return; }
    if (!selectedService || !selectedPet || !selectedSlot) return;
    setSubmitting(true);
    try {
      await api.post("/reservations", {
        petId: selectedPet.id,
        serviceId: selectedService.id,
        timeSlotId: selectedSlot.id,
        notes,
      });
      setDone(true);
    } catch {
      alert("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-2">{selectedService?.name} for {selectedPet?.name}</p>
        <p className="text-gray-500 mb-8">{selectedSlot?.date} at {selectedSlot?.startTime}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onPress={() => router.push("/my-reservations")}>View My Reservations</Button>
          <Button variant="outline" onPress={() => { setDone(false); setStep(0); setSelectedService(null); setSelectedPet(null); setSelectedSlot(null); }}>Book Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
      <BookingSteps currentStep={step} steps={STEPS} />

      <div className="mt-8">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
            <ServiceFilter category={category} setCategory={setCategory} petType={petType} setPetType={setPetType} search={search} setSearch={setSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {filteredServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`text-left rounded-xl border-2 p-4 transition-all ${
                    selectedService?.id === s.id ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-sm text-gray-500">{s.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{s.duration} min &bull; {s.petType}</p>
                    </div>
                    <span className="font-bold text-purple-600 whitespace-nowrap ml-3">฿{s.basePrice.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Your Pet</h2>
            {!user && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-700">
                  <strong>Tip:</strong> Log in to save your pets and view booking history.
                  You can still add pet details without an account.
                </p>
              </div>
            )}
            <PetSelector selectedPet={selectedPet} onSelect={setSelectedPet} />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pick Date &amp; Time</h2>
            <TimeSlotPicker selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review &amp; Confirm</h2>
            <Card>
              <Card.Content className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Service</p>
                    <p className="font-semibold">{selectedService?.name}</p>
                    <p className="text-sm text-gray-500">{selectedService?.duration} min</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pet</p>
                    <p className="font-semibold">{selectedPet?.name}</p>
                    <p className="text-sm text-gray-500">{selectedPet?.species} &bull; {selectedPet?.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-semibold">{selectedSlot?.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-semibold">{selectedSlot?.startTime} - {selectedSlot?.endTime}</p>
                  </div>
                </div>
                <Separator />
                <TextField value={notes} onChange={setNotes}>
                  <Label>Notes (optional)</Label>
                  <TextArea placeholder="Any special requests or allergies?" />
                </TextField>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total</span>
                  <span className="text-3xl font-bold text-purple-600">฿{selectedService?.basePrice.toLocaleString()}</span>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onPress={() => setStep((s) => Math.max(0, s - 1))} isDisabled={step === 0}>
          <ArrowLeft size={18} /> Back
        </Button>

        {step < 3 ? (
          <Button
            variant="secondary"
            onPress={() => setStep((s) => s + 1)}
            isDisabled={
              (step === 0 && !selectedService) ||
              (step === 1 && !selectedPet) ||
              (step === 2 && !selectedSlot)
            }
          >
            Next <ArrowRight size={18} />
          </Button>
        ) : (
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            isDisabled={submitting}
            onPress={handleSubmit}
          >
            {submitting ? "Booking..." : "Confirm Booking"} <Check size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
