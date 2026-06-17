"use client";
import { useState, useEffect } from "react";
import { Button, TextField, Input, Label, Separator } from "@heroui/react";
import { Plus, Dog, Cat } from "lucide-react";
import api from "@/lib/api";
import { Pet } from "@/lib/types";

interface Props {
  selectedPet: Pet | null;
  onSelect: (pet: Pet) => void;
}

export default function PetSelector({ selectedPet, onSelect }: Props) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", species: "DOG" as "DOG" | "CAT", breed: "", size: "MEDIUM" as "SMALL" | "MEDIUM" | "LARGE" });

  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await api.get("/pets");
        setPets(res.data);
      } catch { /* not logged in */ }
    }
    fetchPets();
  }, []);

  const handleAdd = async () => {
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/pets", form);
      const newPet = res.data;
      setPets((prev) => [...prev, newPet]);
      onSelect(newPet);
      setShowForm(false);
      setForm({ name: "", species: "DOG", breed: "", size: "MEDIUM" });
    } catch {
      const localPet: Pet = { id: `local-${Date.now()}`, ...form, userId: "" };
      onSelect(localPet);
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {pets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => onSelect(pet)}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                selectedPet?.id === pet.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                  : "border-gray-100 bg-gray-50 hover:border-primary/40"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${selectedPet?.id === pet.id ? "bg-primary/10" : "bg-white"}`}>
                {pet.species === "DOG" ? <Dog size={22} className="text-primary" /> : <Cat size={22} className="text-primary" />}
              </div>
              <div>
                <p className="font-semibold text-navy">{pet.name}</p>
                <p className="text-sm text-gray-400">{pet.species} - {pet.size} - {pet.breed || "Mixed"}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 p-4 text-gray-500 hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={18} /> Add New Pet
        </button>
      ) : (
        <div className="bg-surface rounded-xl border border-gray-100 p-5 space-y-4">
          <h4 className="font-semibold text-navy">Add New Pet</h4>

          <TextField value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))}>
            <Label>Pet Name</Label>
            <Input placeholder="e.g., Max, Luna" />
          </TextField>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Species</label>
              <select
                value={form.species}
                onChange={(e) => setForm((p) => ({ ...p, species: e.target.value as "DOG" | "CAT" }))}
                className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm text-navy focus:outline-none focus:border-primary"
              >
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Size</label>
              <select
                value={form.size}
                onChange={(e) => setForm((p) => ({ ...p, size: e.target.value as "SMALL" | "MEDIUM" | "LARGE" }))}
                className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm text-navy focus:outline-none focus:border-primary"
              >
                <option value="SMALL">Small (under 10kg)</option>
                <option value="MEDIUM">Medium (10–25kg)</option>
                <option value="LARGE">Large (over 25kg)</option>
              </select>
            </div>
          </div>

          <TextField value={form.breed} onChange={(v) => setForm((p) => ({ ...p, breed: v }))}>
            <Label>Breed (optional)</Label>
            <Input placeholder="e.g., Golden Retriever, Persian" />
          </TextField>

          <Separator />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onPress={() => setShowForm(false)}>Cancel</Button>
            <Button variant="primary" isDisabled={loading} onPress={handleAdd}>
              {loading ? "Adding..." : "Add Pet"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
