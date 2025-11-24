import { useState } from "react";
import { X } from "lucide-react";
import FieldRenderer, { Field } from "./FieldRenderer";
import type { CanvasField } from "./FormBuilder";

interface FieldWrapperProps {
  field: CanvasField;
  onDelete: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

const FieldWrapper = ({
  field,
  onDelete,
  onSelect,
  isSelected,
}: FieldWrapperProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`
        relative p-3 rounded-lg bg-white shadow-sm border transition
        ${hover ? "shadow-md" : ""}
        ${isSelected ? "border-blue-500" : "border-gray-300"}
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
    >
      {(hover || isSelected) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete();
          }}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
        >
          <X size={14} />
        </button>
      )}

      <FieldRenderer field={field as unknown as Field} />
    </div>
  );
};

export default FieldWrapper;
