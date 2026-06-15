"use client";
import { Separator, Link } from "@heroui/react";
import { Dog, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-1.5">
                <Dog className="text-white" size={20} />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                PawCare
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Professional pet grooming and healthcare services. We treat your pets like family.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/services" className="text-sm text-gray-600 hover:text-purple-600">Our Services</Link>
              <Link href="/booking" className="text-sm text-gray-600 hover:text-purple-600">Book Appointment</Link>
              <Link href="/my-reservations" className="text-sm text-gray-600 hover:text-purple-600">My Reservations</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-2"><Phone size={16} /> <span>02-XXX-XXXX</span></div>
              <div className="flex items-center gap-2"><Mail size={16} /> <span>contact@pawcare.co.th</span></div>
              <div className="flex items-center gap-2"><MapPin size={16} /> <span>Bangkok, Thailand</span></div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <p className="text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} PawCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
