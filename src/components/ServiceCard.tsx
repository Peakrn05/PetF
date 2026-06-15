"use client";
import { Chip, Button } from "@heroui/react";
import { Clock, Dog, Cat, ArrowRight } from "lucide-react";
import { Service } from "@/lib/types";
import { useRouter } from "next/navigation";

interface Props {
  service: Service;
  onSelect?: (service: Service) => void;
  selected?: boolean;
}

export default function ServiceCard({ service, onSelect, selected }: Props) {
  const router = useRouter();
  const petIcon = service.petType === "DOG" ? <Dog size={13} /> : <Cat size={13} />;

  return (
    <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border ${selected ? "border-primary ring-2 ring-primary/20" : "border-gray-100"} flex flex-col`}>
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <Chip size="sm" color={service.category === "GROOMING" ? "accent" : "success"} className="text-xs">
            {service.category === "GROOMING" ? "Grooming" : "Vaccine"}
          </Chip>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-1">
            {petIcon} {service.petType}
          </span>
        </div>

        <h3 className="font-bold text-navy text-lg mb-2 leading-snug">{service.name}</h3>
        <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">{service.description}</p>

        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <Clock size={14} />
          <span>{service.duration} min</span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-gray-50 flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">{service.basePrice.toLocaleString()} <span className="text-sm font-normal text-gray-400">THB</span></span>
        {onSelect ? (
          <Button className="bg-primary text-white hover:bg-primary-dark" size="sm" onPress={() => onSelect(service)}>
            Select <ArrowRight size={14} />
          </Button>
        ) : (
          <Button className="hidden md:flex gap-2" size="sm" onPress={() => router.push(`/booking?serviceId=${service.id}`)}>
            Book <ArrowRight size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}
