"use client";
import { Separator, Link } from "@heroui/react";
import { PawPrint, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="bg-primary rounded-lg p-1.5">
                <PawPrint className="text-white" size={20} />
              </div>
              <div>
                <span className="font-bold text-lg block leading-tight">PawCare</span>
                <span className="text-xs text-gray-400">Pet Grooming & Healthcare</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Professional pet grooming and healthcare services in Bangkok. Certified staff, transparent pricing, and easy online booking.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
              <Clock size={15} /> <span>Mon – Sat: 09:00 – 18:00</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-gray-300">Services</h3>
            <div className="flex flex-col gap-3">
              <Link href="/services" className="text-sm text-gray-400 hover:text-primary transition-colors">Haircut & Styling</Link>
              <Link href="/services" className="text-sm text-gray-400 hover:text-primary transition-colors">Bath & Grooming</Link>
              <Link href="/services" className="text-sm text-gray-400 hover:text-primary transition-colors">Vaccines & Health</Link>
              <Link href="/booking" className="text-sm text-gray-400 hover:text-primary transition-colors">Book Appointment</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-gray-300">Contact</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2.5"><Phone size={15} className="text-primary flex-shrink-0" /> <span>02-123-4567</span></div>
              <div className="flex items-center gap-2.5"><Mail size={15} className="text-primary flex-shrink-0" /> <span>contact@pawcare.co.th</span></div>
              <div className="flex items-start gap-2.5"><MapPin size={15} className="text-primary flex-shrink-0 mt-0.5" /> <span>Bangkok, Thailand</span></div>
            </div>
          </div>
        </div>

        <Separator className="my-8 border-gray-700" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} PawCare. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="#" className="text-gray-500 hover:text-primary text-xs">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-primary text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
