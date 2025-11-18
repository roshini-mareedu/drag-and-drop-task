import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DraggableItem from "./DraggableItem";
import Canvas from "./Canvas";
import type { Field } from "./FieldRenderer"; // or from "./types"
import FieldSettingsPanel from "./FieldSettingsPanel";

export interface CanvasField extends Field {
  canvasId: string;
}

interface FormBuilderProps {
  fields: Field[]; // palette fields from your JSON
}

const FormBuilder = ({ fields }: FormBuilderProps) => {
  const [canvasFields, setCanvasFields] = useState<CanvasField[]>([]);
  const [selectedCanvasId, setSelectedCanvasId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id === "canvas-dropzone") {
      const field = (event.active.data.current as { field: Field }).field;

      const newField: CanvasField = {
        ...field,
        canvasId: crypto.randomUUID(),
      };

      setCanvasFields((prev) => [...prev, newField]);
      setSelectedCanvasId(newField.canvasId); // auto-select newly dropped
    }
  };

  const handleDelete = (canvasId: string) => {
    setCanvasFields((prev) => prev.filter((f) => f.canvasId !== canvasId));
    setSelectedCanvasId((prev) => (prev === canvasId ? null : prev));
  };

  const handleSelectField = (canvasId: string) => {
    setSelectedCanvasId(canvasId);
  };

  const handleUpdateField = (updated: CanvasField) => {
    setCanvasFields((prev) =>
      prev.map((f) => (f.canvasId === updated.canvasId ? updated : f))
    );
  };

  const selectedField =
    selectedCanvasId &&
    canvasFields.find((f) => f.canvasId === selectedCanvasId) ||
    null;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-6">

        {/* LEFT: Field palette */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg mb-3">Fields</h2>
          <div className="grid grid-cols-2 gap-3">
            {fields.map((field) => (
              <DraggableItem key={field.fieldId} field={field} />
            ))}
          </div>
        </div>

        {/* MIDDLE: Canvas */}
        <div className="flex-1">
          <Canvas
            droppedFields={canvasFields}
            onDelete={handleDelete}
            onSelectField={handleSelectField}
            selectedCanvasId={selectedCanvasId}
          />
        </div>

        {/* RIGHT: Settings */}
        <div className="w-1/4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <FieldSettingsPanel
            selectedField={selectedField}
            allFields={canvasFields}
            onUpdateField={handleUpdateField}
            onSelectFieldById={handleSelectField}
          />
        </div>
      </div>
    </DndContext>
  );
};

export default FormBuilder;
