import { Service } from "./types";

export const services: Service[] = [
  { id: "1", name: "Small Dog Bath", basePrice: 300, duration: 45, category: "GROOMING", petType: "DOG", description: "Full bath with shampoo, blow dry, and brush for small breeds (under 10kg)", isActive: true },
  { id: "2", name: "Medium Dog Bath", basePrice: 450, duration: 60, category: "GROOMING", petType: "DOG", description: "Full bath with shampoo, blow dry, and brush for medium breeds (10-25kg)", isActive: true },
  { id: "3", name: "Large Dog Bath", basePrice: 600, duration: 75, category: "GROOMING", petType: "DOG", description: "Full bath with shampoo, blow dry, and brush for large breeds (over 25kg)", isActive: true },
  { id: "4", name: "Small Dog Haircut", basePrice: 500, duration: 60, category: "GROOMING", petType: "DOG", description: "Professional styling and haircut for small breeds", isActive: true },
  { id: "5", name: "Medium Dog Haircut", basePrice: 700, duration: 75, category: "GROOMING", petType: "DOG", description: "Professional styling and haircut for medium breeds", isActive: true },
  { id: "6", name: "Large Dog Haircut", basePrice: 1000, duration: 90, category: "GROOMING", petType: "DOG", description: "Professional styling and haircut for large breeds", isActive: true },
  { id: "7", name: "Dog Nail Trimming", basePrice: 150, duration: 15, category: "GROOMING", petType: "DOG", description: "Safe nail trimming and filing for dogs", isActive: true },
  { id: "8", name: "Dog Ear Cleaning", basePrice: 100, duration: 15, category: "GROOMING", petType: "DOG", description: "Gentle ear cleaning and inspection", isActive: true },
  { id: "9", name: "Small Dog Full Grooming", basePrice: 800, duration: 120, category: "GROOMING", petType: "DOG", description: "Complete package: bath, haircut, nail trim, ear clean for small breeds", isActive: true },
  { id: "10", name: "Medium Dog Full Grooming", basePrice: 1200, duration: 150, category: "GROOMING", petType: "DOG", description: "Complete package: bath, haircut, nail trim, ear clean for medium breeds", isActive: true },
  { id: "11", name: "Large Dog Full Grooming", basePrice: 1500, duration: 180, category: "GROOMING", petType: "DOG", description: "Complete package: bath, haircut, nail trim, ear clean for large breeds", isActive: true },
  { id: "12", name: "Cat Bath", basePrice: 400, duration: 45, category: "GROOMING", petType: "CAT", description: "Gentle bath with cat-safe shampoo and blow dry", isActive: true },
  { id: "13", name: "Cat Haircut", basePrice: 500, duration: 60, category: "GROOMING", petType: "CAT", description: "Professional styling and haircut for cats", isActive: true },
  { id: "14", name: "Cat Nail Trimming", basePrice: 150, duration: 15, category: "GROOMING", petType: "CAT", description: "Safe and gentle nail trimming for cats", isActive: true },
  { id: "15", name: "Cat Full Grooming", basePrice: 700, duration: 90, category: "GROOMING", petType: "CAT", description: "Complete package: bath, haircut, nail trim for cats", isActive: true },
  { id: "16", name: "Dog DHPP Vaccine", basePrice: 500, duration: 30, category: "VACCINE", petType: "DOG", description: "Distemper, Hepatitis, Parainfluenza, Parvovirus protection", isActive: true },
  { id: "17", name: "Dog Rabies Vaccine", basePrice: 350, duration: 30, category: "VACCINE", petType: "DOG", description: "Essential rabies protection — required by Thai law", isActive: true },
  { id: "18", name: "Dog Deworming", basePrice: 200, duration: 15, category: "VACCINE", petType: "DOG", description: "Comprehensive internal parasite treatment", isActive: true },
  { id: "19", name: "Dog Tick & Flea Treatment", basePrice: 300, duration: 20, category: "VACCINE", petType: "DOG", description: "Topical tick and flea prevention treatment", isActive: true },
  { id: "20", name: "Cat FVRCP Vaccine", basePrice: 500, duration: 30, category: "VACCINE", petType: "CAT", description: "Feline viral rhinotracheitis, calicivirus, panleukopenia protection", isActive: true },
  { id: "21", name: "Cat Rabies Vaccine", basePrice: 350, duration: 30, category: "VACCINE", petType: "CAT", description: "Essential rabies protection — required by Thai law", isActive: true },
  { id: "22", name: "Cat Deworming", basePrice: 200, duration: 15, category: "VACCINE", petType: "CAT", description: "Comprehensive internal parasite treatment", isActive: true },
  { id: "23", name: "Cat Tick & Flea Treatment", basePrice: 300, duration: 20, category: "VACCINE", petType: "CAT", description: "Topical tick and flea prevention treatment", isActive: true },
];

export function generateTimeSlots(dateStr: string) {
  const hours = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
  const maxBookings = 3;
  // Deterministic availability derived from the date + slot index. Stable across
  // re-fetches (no Math.random flicker) while still showing a realistic mix of
  // open / almost-full / full slots.
  const daySeed = dateStr.split("-").reduce((sum, part) => sum + parseInt(part), 0);
  return hours.map((h, i) => ({
    id: `${dateStr}-${i}`,
    date: dateStr,
    startTime: h,
    endTime: `${String(parseInt(h) + 1).padStart(2, "0")}:00`,
    maxBookings,
    currentBookings: (daySeed + i * 2) % (maxBookings + 1),
  }));
}
