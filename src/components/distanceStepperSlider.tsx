"use client";

import { useEffect, useState } from "react";

const DistanceStepper = ({
  label,
  unit,
  initialValue,
  onChange,
  min,
  max,
  step
}: {
  label?: string;
  unit: string;
  onChange?: (distance: number) => void;
  min: number;
  max: number;
  step: number;
  initialValue?: number;
}) => {
  const [distance, setDistance] = useState((initialValue || min) > 0 ? initialValue || min : undefined);

  useEffect(() => {
    setDistance((initialValue || min) > 0 ? initialValue || min : undefined);
  }, [initialValue]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setDistance(newValue);
    onChange?.(newValue);
  };

  const stepsCount = Math.floor((max - min) / step);

  return (
    <div className="flex flex-col gap-5 justify-center p-4 rounded-lg shadow-md w-full">
      <label>{label || `Set Distance in ${unit}`}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={distance}
        onChange={handleSliderChange}
        className="w-full appearance-none bg-secondary h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-outline [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[1rem] [&::-webkit-slider-thumb]:w-[1rem] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
      />

      {/* Step Indicators */}
      <div className="flex justify-between w-full mt-4 text-sm text-gray-500">
        {Array.from({ length: stepsCount + 1 }, (_, i) => min + i * step).map((stepValue) => (
          <span key={stepValue} className="text-center">
            {stepValue}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DistanceStepper;
