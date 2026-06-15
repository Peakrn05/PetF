"use client";
import { TextField, Input, Label } from "@heroui/react";
import { Search } from "lucide-react";
import { ServiceCategory, PetType } from "@/lib/types";

interface Props {
  category: ServiceCategory;
  setCategory: (c: ServiceCategory) => void;
  petType: PetType;
  setPetType: (p: PetType) => void;
  search: string;
  setSearch: (s: string) => void;
}

const catOptions: { key: ServiceCategory; label: string }[] = [
  { key: "ALL", label: "All Services" },
  { key: "GROOMING", label: "Grooming" },
  { key: "VACCINE", label: "Vaccines" },
];

const petOptions: { key: PetType; label: string }[] = [
  { key: "ALL", label: "All Pets" },
  { key: "DOG", label: "🐕 Dogs" },
  { key: "CAT", label: "🐈 Cats" },
];

export default function ServiceFilter({ category, setCategory, petType, setPetType, search, setSearch }: Props) {
  return (
    <div className="space-y-4">
      <TextField value={search} onChange={setSearch} className="w-full">
        <Label className="sr-only">Search</Label>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search services..." className="pl-10" />
        </div>
      </TextField>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {catOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setCategory(opt.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                category === opt.key
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {petOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setPetType(opt.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                petType === opt.key
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
