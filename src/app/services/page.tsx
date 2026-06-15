"use client";
import { Spinner } from "@heroui/react";
import { Search } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import ServiceFilter from "@/components/ServiceFilter";
import { useServices } from "@/hooks/useServices";

export default function ServicesPage() {
  const { services, loading, category, setCategory, petType, setPetType, search, setSearch } = useServices();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Our Services</h1>
        <p className="text-gray-500">Professional pet care at affordable Thai prices</p>
      </div>

      <ServiceFilter
        category={category} setCategory={setCategory}
        petType={petType} setPetType={setPetType}
        search={search} setSearch={setSearch}
      />

      {loading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : services.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium mb-1">No services found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
