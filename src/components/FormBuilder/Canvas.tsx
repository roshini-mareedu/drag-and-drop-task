import { useDroppable } from "@dnd-kit/core";
import FieldWrapper from "./FieldWrapper";
import type { CanvasField } from "./FormBuilder";

interface CanvasProps {
  droppedFields: CanvasField[];
  onDelete: (canvasId: string) => void;
  onSelectField: (canvasId: string) => void;
  selectedCanvasId: string | null;
}

const Canvas = ({
  droppedFields,
  onDelete,
  onSelectField,
  selectedCanvasId,
}: CanvasProps) => {
  const { setNodeRef } = useDroppable({ id: "canvas-dropzone" });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[1200px] p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50"
    >
      {droppedFields.length === 0 && (
        <p className="text-gray-400 text-center mt-20">
          Drag fields here to begin
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {droppedFields.map((field) => (
          <FieldWrapper
            key={field.canvasId}
            field={field}
            isSelected={selectedCanvasId === field.canvasId}
            onDelete={() => onDelete(field.canvasId)}
            onSelect={() => onSelectField(field.canvasId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
