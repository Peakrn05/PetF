"use client";
import { Chip } from "@heroui/react";
import { Check } from "lucide-react";

interface Props {
  currentStep: number;
  steps: string[];
}

export default function BookingSteps({ currentStep, steps }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {steps.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;

        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              done
                ? "bg-green-100 text-green-700"
                : active
                ? "bg-purple-100 text-purple-700 ring-2 ring-purple-300"
                : "bg-gray-100 text-gray-500"
            }`}>
              {done ? <Check size={14} /> : <span>{i + 1}</span>}
              <span>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${done ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
