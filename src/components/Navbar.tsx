"use client";
import { useEffect, useState } from "react";
import { Button, Link, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { PawPrint, Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const { user, logout, loadUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { loadUser(); }, [loadUser]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Book Appointment", href: "/booking" },
    ...(user ? [{ label: "My Bookings", href: "/my-reservations" }] : []),
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
      {/* Top info bar */}
      <div className="bg-primary text-white text-xs py-1.5 px-6 text-center hidden sm:block">
        <span className="flex items-center justify-center gap-2">
          <Phone size={12} /> Call us: 02-123-4567 &nbsp;|&nbsp; Mon–Sat 09:00–18:00 &nbsp;|&nbsp; Bangkok, Thailand
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => router.push("/")} className="flex items-center gap-2.5">
          <div className="bg-primary rounded-lg p-1.5">
            <PawPrint className="text-white" size={22} />
          </div>
          <div className="text-left">
            <span className="font-bold text-lg text-navy block leading-tight">PawCare</span>
            <span className="text-xs text-gray-400 leading-tight hidden sm:block">Pet Grooming & Healthcare</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors pb-0.5 ${
                pathname === item.href
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:block">
              <Dropdown>
                <DropdownTrigger>
                  {/* FIX: Changed from <button> to <div> to avoid nested buttons in HeroUI */}
                  <div className="flex items-center gap-2 rounded-full hover:bg-gray-100 px-3 py-1.5 transition cursor-pointer">
                    <Avatar className="w-7 h-7">
                      <Avatar.Fallback className="text-xs bg-primary text-white">{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
                    </Avatar>
                    <span className="text-sm font-medium text-navy">{user.name.split(" ")[0]}</span>
                  </div>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem id="profile" className="opacity-100 pointer-events-none">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem id="reservations" onAction={() => router.push("/my-reservations")}>
                    My Bookings
                  </DropdownItem>
                  <DropdownItem id="logout" onAction={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm" onPress={() => router.push("/login")}>
                Login
              </Button>
              <Button variant="primary" className="hidden md:flex" onPress={() => router.push("/register")}>
                Register
              </Button>
            </div>
          )}

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block text-sm font-medium py-1 ${pathname === item.href ? "text-primary" : "text-gray-600"}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <button className="text-sm font-medium text-red-500 text-left" onClick={() => { logout(); setMobileOpen(false); }}>
                Log Out
              </button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onPress={() => { router.push("/login"); setMobileOpen(false); }}>Login</Button>
                <Button variant="primary" size="sm" onPress={() => { router.push("/register"); setMobileOpen(false); }}>Register</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
