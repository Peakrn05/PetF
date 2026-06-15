export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: "USER" | "ADMIN";
}

export interface Pet {
  id: string;
  name: string;
  species: "DOG" | "CAT";
  breed: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
  weight?: number;
  age?: number;
  userId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: "GROOMING" | "VACCINE";
  basePrice: number;
  duration: number;
  petType: "DOG" | "CAT" | "BOTH";
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  maxBookings: number;
  currentBookings: number;
}

export interface Reservation {
  id: string;
  userId: string;
  petId: string;
  serviceId: string;
  timeSlotId: string;
  date: string;
  startTime: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  totalPrice: number;
  notes: string;
  createdAt: string;
  pet: Pet;
  service: Service;
  timeSlot: TimeSlot;
}

export type ServiceCategory = "ALL" | "GROOMING" | "VACCINE";
export type PetType = "ALL" | "DOG" | "CAT";
