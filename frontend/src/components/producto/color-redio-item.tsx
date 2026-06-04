import type React from "react";

interface ColorSwatchProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

interface ColorRadioItemProps {
  color: string;
  value: string;
  id: string;
  selected?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

const colorMap: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Red: "#EF4444",
  Blue: "#3B82F6",
  Green: "#22C55E",
  Yellow: "#EAB308",
  Purple: "#A855F7",
  Pink: "#EC4899",
  Grey: "#6B7280",
  Beige: "#F5F5DC",
};

// 🔹 Solo visual / botón simple
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  selected = false,
  onClick,
  className = "",
}) => {
  const hex = colorMap[color] || color;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-6 h-6 rounded-full border-2 transition-all
        ${selected ? "scale-110 border-white ring-2 ring-white" : "border-gray-400"}
        ${className}
      `}
      style={{ backgroundColor: hex }}
      title={color}
    />
  );
};

// 🔹 Simula radio (sin RadioGroup)
export const ColorRadioItem: React.FC<ColorRadioItemProps> = ({
  color,
  value,
  id,
  selected = false,
  onChange,
  className = "",
}) => {
  const hex = colorMap[color] || color;

  return (
    <button
      type="button"
      id={id}
      onClick={() => onChange?.(value)}
      className={`
        w-6 h-6 rounded-full border-2 transition-all
        ${selected ? "scale-110 border-white ring-2 ring-white" : "border-gray-400"}
        ${className}
      `}
      style={{ backgroundColor: hex }}
      title={color}
    />
  );
};