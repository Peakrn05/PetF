"use client";
import { useState, useEffect } from "react";
import { Card, Button, TextField, Input, Label, Select, SelectTrigger, SelectValue, SelectPopover, ListBox, ListBoxItem, Separator } from "@heroui/react";
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
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                selectedPet?.id === pet.id
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              {pet.species === "DOG" ? <Dog size={24} className="text-purple-500" /> : <Cat size={24} className="text-pink-500" />}
              <div>
                <p className="font-semibold">{pet.name}</p>
                <p className="text-sm text-gray-500">{pet.species} &bull; {pet.size} &bull; {pet.breed || "Mixed"}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-purple-300 p-4 text-purple-600 hover:bg-purple-50 transition"
        >
          <Plus size={18} /> Add New Pet
        </button>
      ) : (
        <Card>
          <Card.Content className="p-4 space-y-4">
            <h4 className="font-semibold">Add New Pet</h4>

            <TextField value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))}>
              <Label>Pet Name</Label>
              <Input placeholder="e.g., Max, Luna" />
            </TextField>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Species</label>
                <select
                  value={form.species}
                  onChange={(e) => setForm((p) => ({ ...p, species: e.target.value as "DOG" | "CAT" }))}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                >
                  <option value="DOG">Dog</option>
                  <option value="CAT">Cat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <select
                  value={form.size}
                  onChange={(e) => setForm((p) => ({ ...p, size: e.target.value as "SMALL" | "MEDIUM" | "LARGE" }))}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                >
                  <option value="SMALL">Small (under 10kg)</option>
                  <option value="MEDIUM">Medium (10-25kg)</option>
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
              <Button variant="secondary" isDisabled={loading} onPress={handleAdd}>
                {loading ? "Adding..." : "Add Pet"}
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}
