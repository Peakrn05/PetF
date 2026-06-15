"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { Scissors, Droplets, Syringe, ArrowRight, ShieldCheck, Clock, Award, Users } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const categories = [
    {
      icon: <Scissors size={28} className="text-primary" />,
      title: "Haircuts & Styling",
      desc: "Professional haircuts for dogs and cats. From basic trims to breed-specific styles.",
      price: "From 500 THB",
    },
    {
      icon: <Droplets size={28} className="text-primary" />,
      title: "Bath & Grooming",
      desc: "Premium shampoo, blow dry, brush out, nail trim, and ear cleaning.",
      price: "From 300 THB",
    },
    {
      icon: <Syringe size={28} className="text-primary" />,
      title: "Vaccines & Health",
      desc: "DHPP, Rabies, FVRCP, deworming, and tick & flea treatments.",
      price: "From 200 THB",
    },
  ];

  const trustItems = [
    { icon: <ShieldCheck size={24} className="text-primary" />, title: "Licensed Professionals", desc: "Certified groomers and veterinary-trained staff" },
    { icon: <Clock size={24} className="text-primary" />, title: "Mon–Sat Service", desc: "Open 6 days a week, 09:00–18:00" },
    { icon: <Award size={24} className="text-primary" />, title: "5+ Years Experience", desc: "Trusted by thousands of pet owners in Bangkok" },
    { icon: <Users size={24} className="text-primary" />, title: "10,000+ Happy Pets", desc: "Proven track record of quality and care" },
  ];

  return (
    <div className="bg-white">
      <HeroSection />

      {/* Stats bar */}
      <div className="bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "10k+", label: "Pets Served" },
            { num: "5+", label: "Years Experience" },
            { num: "23", label: "Services" },
            { num: "4.9 / 5", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.num}</div>
              <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-3xl font-bold text-navy mb-3">Our Services</h2>
          <p className="text-gray-500 max-w-lg">Everything your pet needs — grooming, styling, baths, and essential healthcare</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="bg-primary-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg text-navy mb-2">{cat.title}</h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{cat.desc}</p>
              <p className="text-primary font-bold">{cat.price}</p>
            </div>
          ))}
        </div>

        <Button className="bg-primary text-white hover:bg-primary-dark" size="lg" onPress={() => router.push("/services")}>
          View All Services <ArrowRight size={18} />
        </Button>
      </section>

      {/* Trust section */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Why PawCare</p>
            <h2 className="text-3xl font-bold text-navy">Trusted Pet Care You Can Count On</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Book an Appointment?</h2>
          <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
            Choose a service, pick a time slot, and we will take care of the rest.
            Online booking takes less than 2 minutes.
          </p>
          <Button size="lg" className="bg-white text-primary font-bold hover:bg-gray-100" onPress={() => router.push("/booking")}>
            Book an Appointment Now <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </div>
  );
}
