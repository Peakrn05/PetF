"use client";
import { useEffect, useState } from "react";
import { Button, Link, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { Dog, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout, loadUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { loadUser(); }, [loadUser]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Book Now", href: "/booking" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => router.push("/")} className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-1.5">
            <Dog className="text-white" size={22} />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            PawCare
          </span>
        </button>

        <nav className="hidden sm:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ? "text-purple-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Dropdown>
              <DropdownTrigger>
                <button className="flex items-center gap-2 rounded-full hover:bg-gray-100 p-1 transition">
                  <Avatar className="w-8 h-8">
                    <Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
                  </Avatar>
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem id="profile" className="opacity-100 pointer-events-none">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </DropdownItem>
                <DropdownItem id="reservations" onAction={() => router.push("/my-reservations")}>
                  My Reservations
                </DropdownItem>
                <DropdownItem id="logout" onAction={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onPress={() => router.push("/login")}>
                Login
              </Button>
              <Button variant="secondary" size="sm" onPress={() => router.push("/register")}>
                Sign Up
              </Button>
            </div>
          )}

          <button
            className="sm:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block text-sm font-medium ${pathname === item.href ? "text-purple-600" : "text-gray-600"}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {user && (
            <a
              href="/my-reservations"
              className="block text-sm font-medium text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              My Reservations
            </a>
          )}
        </div>
      )}
    </header>
  );
}
