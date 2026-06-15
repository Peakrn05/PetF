"use client";
import { Check } from "lucide-react";

interface Props {
  currentStep: number;
  steps: string[];
}

export default function BookingSteps({ currentStep, steps }: Props) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                done ? "bg-green-500 text-white" : active ? "bg-primary text-white ring-4 ring-primary/20" : "bg-gray-100 text-gray-400"
              }`}>
                {done ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-xs mt-1.5 font-medium hidden sm:block ${active ? "text-primary" : done ? "text-green-600" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 ${done ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
