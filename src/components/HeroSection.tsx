"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { CalendarDays, Search, Phone, Star } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary opacity-10 blur-3xl rounded-full translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Star size={14} fill="currentColor" /> Thailand Premier Pet Care Service
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Care
            <br />
            <span className="text-primary-light">for Your Pet</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mb-10">
            Expert grooming, haircuts, baths, and vaccinations for dogs and cats.
            Certified professionals. Transparent pricing. Easy online booking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              onPress={() => router.push("/booking")}
            >
              <CalendarDays size={18} /> Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onPress={() => router.push("/services")}
            >
              <Search size={18} /> Browse Services
            </Button>
          </div>

          {/* Quick action row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <CalendarDays size={22} className="text-primary-light" />, label: "Book Online", sub: "Easy scheduling" },
              { icon: <Search size={22} className="text-primary-light" />, label: "Find Services", sub: "23 services available" },
              { icon: <Phone size={22} className="text-primary-light" />, label: "Call Us", sub: "02-123-4567" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-center hover:bg-white/10 transition cursor-pointer">
                <div className="flex justify-center mb-2">{item.icon}</div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
