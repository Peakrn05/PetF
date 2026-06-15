"use client";
import { Card, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { Scissors, Droplets, Syringe, ArrowRight } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const categories = [
    { icon: <Scissors size={32} className="text-purple-500" />, title: "Haircuts & Styling", desc: "Professional haircuts for dogs and cats. From basic trims to show-ready styles.", price: "From ฿500", color: "bg-purple-50" },
    { icon: <Droplets size={32} className="text-blue-500" />, title: "Bath & Grooming", desc: "Premium shampoo, blow dry, brush out, nail trim, and ear cleaning.", price: "From ฿300", color: "bg-blue-50" },
    { icon: <Syringe size={32} className="text-green-500" />, title: "Vaccines & Health", desc: "DHPP, Rabies, FVRCP, deworming, and tick & flea treatments.", price: "From ฿200", color: "bg-green-50" },
  ];

  return (
    <div>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Our Services</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Everything your pet needs — from a fresh bath to essential vaccines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((cat) => (
            <Card key={cat.title} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <Card.Content className="p-6 text-center">
                <div className={`inline-flex p-4 rounded-2xl ${cat.color} mb-4`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>
                <p className="text-purple-600 font-bold text-lg">{cat.price}</p>
              </Card.Content>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" size="lg" onPress={() => router.push("/services")}>
            View All Services &amp; Prices <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-white/80 text-lg mb-8">
            Choose a service, pick a time, and we will take care of the rest.
            Online booking takes less than 2 minutes.
          </p>
          <Button size="lg" className="bg-amber-400 text-gray-900 font-bold" onPress={() => router.push("/booking")}>
            Book an Appointment Now
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Choose PawCare?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "5+", label: "Years Experience" },
            { num: "10k+", label: "Happy Pets" },
            { num: "23", label: "Services Available" },
            { num: "4.9★", label: "Customer Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{stat.num}</div>
              <div className="text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
