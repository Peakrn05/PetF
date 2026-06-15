"use client";
import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";
import { services as localServices } from "@/lib/data";
import { Service, ServiceCategory, PetType } from "@/lib/types";

export function useServices() {
  const [services, setServices] = useState<Service[]>(localServices);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ServiceCategory>("ALL");
  const [petType, setPetType] = useState<PetType>("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const res = await api.get("/services");
        if (res.data?.length) setServices(res.data);
      } catch {
        // fallback to local data
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (category !== "ALL" && s.category !== category) return false;
      if (petType !== "ALL" && s.petType !== petType) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [services, category, petType, search]);

  return { services: filtered, allServices: services, loading, category, setCategory, petType, setPetType, search, setSearch };
}
