"use client";
import { Card, Chip, Button } from "@heroui/react";
import { Clock, Dog, Cat } from "lucide-react";
import { Service } from "@/lib/types";
import { useRouter } from "next/navigation";

interface Props {
  service: Service;
  onSelect?: (service: Service) => void;
  selected?: boolean;
}

export default function ServiceCard({ service, onSelect, selected }: Props) {
  const router = useRouter();
  const petIcon = service.petType === "DOG" ? <Dog size={14} /> : <Cat size={14} />;

  return (
    <Card className={`transition-shadow hover:shadow-lg ${selected ? "ring-2 ring-purple-500" : ""}`}>
      <Card.Content className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Chip size="sm" color={service.category === "GROOMING" ? "accent" : "success"}>
            {service.category === "GROOMING" ? "Grooming" : "Vaccine"}
          </Chip>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
            {petIcon} {service.petType}
          </span>
        </div>

        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{service.description}</p>

        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Clock size={14} />
          <span>{service.duration} min</span>
        </div>
      </Card.Content>

      <Card.Footer className="flex justify-between items-center px-5 pb-5 pt-0">
        <div className="text-2xl font-bold text-purple-600">
          ฿{service.basePrice.toLocaleString()}
        </div>
        {onSelect ? (
          <Button variant="secondary" size="sm" onPress={() => onSelect(service)}>
            Select
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onPress={() => router.push(`/booking?serviceId=${service.id}`)}>
            Book Now
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
