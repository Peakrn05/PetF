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
    const res = await api.post("/auth/login", { email, password });
    const { user, token } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, loading: false });
  },

  register: async (name, email, phone, password) => {
    const res = await api.post("/auth/register", { name, email, phone, password });
    const { user, token } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
