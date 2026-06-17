"use client";
import { create } from "zustand";
import api from "@/lib/api";
import { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
}

// True only when a real backend actually answered (e.g. 401). A bare network
// failure (no backend) has no `response`, which is what triggers demo mode.
function hasServerResponse(err: unknown): boolean {
  return !!(err as { response?: unknown })?.response;
}

function persistSession(set: (s: Partial<AuthState>) => void, user: User, token: string) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  set({ user, token, loading: false });
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,

  loadUser: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      set({ token, user: JSON.parse(userStr), loading: false });
    } else {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { user, token } = res.data;
      persistSession(set, user, token);
    } catch (err) {
      if (hasServerResponse(err)) throw err; // real backend rejected → surface error
      // No backend (demo mode): simulate a session
      const user: User = { id: "demo-user", email, name: email.split("@")[0] || "Guest", phone: "", role: "USER" };
      persistSession(set, user, "demo-token");
    }
  },

  register: async (name, email, phone, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, phone, password });
      const { user, token } = res.data;
      persistSession(set, user, token);
    } catch (err) {
      if (hasServerResponse(err)) throw err; // real backend rejected → surface error
      // No backend (demo mode): simulate a session
      const user: User = { id: "demo-user", email, name: name || "Guest", phone, role: "USER" };
      persistSession(set, user, "demo-token");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
