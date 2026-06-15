import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawCare - Pet Grooming & Vaccine Reservation",
  description: "Book grooming, haircuts, baths, and vaccines for your dogs and cats. Professional pet care in Thailand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-140px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
