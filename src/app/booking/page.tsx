"use client";
import { useState, useEffect, useMemo, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Separator, TextArea, Label, Spinner } from "@heroui/react";
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
      setError("Booking failed. Please try again.");
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
        <div className="flex gap-3 justify-center mt-6">
          <Button variant="solid" color="primary" radius="xl" onPress={() => router.push("/my-reservations")}>View My Bookings</Button>
        </div>
      </div>
    );
  }

  const isNextDisabled = (step === 0 && !selectedService) || (step === 1 && !selectedPet) || (step === 2 && !selectedSlot);

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
          <div className="mb-6 p-4 bg-red-50 text-red-700 border rounded-xl flex items-center gap-3">
            <AlertCircle size={18} />
            <p className="text-sm">{error}</p>
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
                      selectedService?.id === s.id ? "border-primary bg-primary/5 ring-2" : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <p className="font-semibold text-navy mb-1">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-2">{s.duration} min - {s.petType}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-5">Select Your Pet</h2>
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
                  <p className="text-xs text-gray-400 uppercase mb-1">Service</p>
                  <p className="font-semibold text-navy">{selectedService?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Pet</p>
                  <p className="font-semibold text-navy">{selectedPet?.name}</p>
                  <p className="text-sm text-gray-500">{(selectedPet as any)?.breed || (selectedPet as any)?.type || ""}</p>
                </div>
              </div>

              <Separator className="my-5" />

             <div className="mt-4 flex flex-col gap-2">
  <Label htmlFor="booking-notes" className="text-sm font-medium text-gray-700">Special Notes (optional)</Label>
  {/* แก้ไขเป็น onChange เพื่อใช้งานร่วมกับโมเดล Textarea ดั้งเดิม */}
  <TextArea 
    id="booking-notes" 
    placeholder="allergies, or instructions?" 
    value={notes} 
    onChange={(e) => setNotes(e.target.value)} 
    className="w-full border border-gray-200 rounded-xl p-3" 
    rows={4} 
  />
</div>

            </div>
          )}
        </div>

        {/* ปรับปรุงโครงสร้างปุ่มใหม่ ใช้สีมาตรฐานจากระบบ UI Kit และดึงไอคอน Arrow กลับคืนมา */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="flat" size="lg" radius="xl" isDisabled={step === 0 || submitting} onPress={() => goToStep(step - 1)} startContent={<ArrowLeft size={18} />}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="solid" color="primary" size="lg" radius="xl" isDisabled={isNextDisabled} onPress={() => goToStep(step + 1)} endContent={<ArrowRight size={18} />}>
              Continue
            </Button>
          ) : (
            <Button variant="solid" color="primary" size="lg" radius="xl" isLoading={submitting} onPress={handleSubmit}>
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
