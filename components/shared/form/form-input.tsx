"use client";

import React from "react";

import { Input } from "@/components/ui";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  onClearButtonClick?: VoidFunction;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  onClearButtonClick,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const errorText = errors[name]?.message as string;
  const inputValue = watch(name);

  const handleClearClick = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        <button
          onClick={onClearButtonClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
        >
          {inputValue && <X onClick={handleClearClick} className="h-5 w-5" />}
        </button>
      </div>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
