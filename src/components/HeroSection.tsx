"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Sparkles, Heart, Shield } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500" />
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-20 left-10 text-8xl">🐕</div>
        <div className="absolute top-40 right-20 text-7xl">🐈</div>
        <div className="absolute bottom-20 left-1/3 text-6xl">🐾</div>
        <div className="absolute top-10 right-1/3 text-5xl">✂️</div>
        <div className="absolute bottom-40 right-10 text-6xl">💉</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-amber-300" />
            <span className="text-sm font-medium">Professional Pet Care in Thailand</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Pet Deserves
            <br />
            <span className="text-amber-300">The Best Care</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Premium grooming, haircuts, baths, and vaccinations for dogs and cats.
            Book online in minutes — we handle the rest with love.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-400 text-gray-900 font-bold hover:bg-amber-300"
              onPress={() => router.push("/booking")}
            >
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onPress={() => router.push("/services")}
            >
              View Services &amp; Prices
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: <Sparkles className="text-amber-300" />, title: "Expert Grooming", desc: "Certified groomers with years of experience" },
            { icon: <Heart className="text-pink-300" />, title: "Gentle & Loving", desc: "Stress-free environment for your furry friends" },
            { icon: <Shield className="text-green-300" />, title: "Licensed Vaccines", desc: "Certified vaccines with proper documentation" },
          ].map((item) => (
            <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
