import React from "react";
import type { CanvasField } from "./FormBuilder";

interface FieldSettingsPanelProps {
  selectedField: CanvasField | null;
  allFields: CanvasField[]; // for dropdown of all fields on canvas
  onUpdateField: (updated: CanvasField) => void;
  onSelectFieldById: (canvasId: string) => void;
}

const FieldSettingsPanel: React.FC<FieldSettingsPanelProps> = ({
  selectedField,
  allFields,
  onUpdateField,
  onSelectFieldById,
}) => {
  // 🔹 When no field is selected
  if (!selectedField) {
    return (
      <div className="p-4 h-full flex flex-col gap-4">
        <h2 className="font-bold text-lg">Field Settings</h2>

        {/* Dropdown: select a field from all canvas fields */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Select field
          </label>
          <select
            className="w-full border rounded px-2 py-1 text-sm"
            onChange={(e) => {
              if (!e.target.value) return;
              onSelectFieldById(e.target.value);
            }}
            defaultValue=""
          >
            <option value="">-- Choose a field --</option>
            {allFields.map((f) => (
              <option key={f.canvasId} value={f.canvasId}>
                {f.properties?.label || f.fieldName || f.fieldType}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  const props = selectedField.properties || {};
  const labelProps = props.fieldLabelProperties || {};

  const updateProp = (key: string, value: any) => {
    const updated: CanvasField = {
      ...selectedField,
      properties: {
        ...props,
        [key]: value,
      },
    };
    onUpdateField(updated);
  };

  const updateLabelProp = (key: string, value: any) => {
    const updated: CanvasField = {
      ...selectedField,
      properties: {
        ...props,
        fieldLabelProperties: {
          ...labelProps,
          [key]: value,
        },
      },
    };
    onUpdateField(updated);
  };

  const primitiveProps = Object.entries(props).filter(
    ([key, value]) =>
      key !== "fieldLabelProperties" && typeof value !== "object"
  );

  const primitiveLabelProps = Object.entries(labelProps).filter(
    ([, value]) => typeof value !== "object"
  );

  return (
    <div className="p-4 h-full flex flex-col gap-4 text-sm">
      {/* Top select for quick switching between fields */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Select field
        </label>
        <select
          className="w-full border rounded px-2 py-1 text-sm"
          value={selectedField.canvasId}
          onChange={(e) => onSelectFieldById(e.target.value)}
        >
          {allFields.map((f) => (
            <option key={f.canvasId} value={f.canvasId}>
              {f.properties?.label || f.fieldName || f.fieldType}
            </option>
          ))}
        </select>
      </div>

      <h2 className="font-bold text-base mt-2">
        {props.label || selectedField.fieldType}
      </h2>

      {/* BASIC PROPERTIES (from JSON) */}
      <div className="space-y-2">
        <h3 className="font-semibold text-xs uppercase text-gray-500">
          Field Properties
        </h3>

        {primitiveProps.map(([key, value]) => {
          if (typeof value === "boolean") {
            return (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updateProp(key, e.target.checked)}
                />
                <span className="text-xs font-medium">{key}</span>
              </label>
            );
          }

          return (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                {key}
              </label>
              <input
                className="border rounded px-2 py-1 text-xs"
                value={value ?? ""}
                onChange={(e) => updateProp(key, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      {/* LABEL PROPERTIES */}
      {Object.keys(labelProps).length > 0 && (
        <div className="space-y-2 pt-2 border-t">
          <h3 className="font-semibold text-xs uppercase text-gray-500">
            Field Label Properties
          </h3>

          {primitiveLabelProps.map(([key, value]) => {
            if (typeof value === "boolean") {
              return (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateLabelProp(key, e.target.checked)}
                  />
                  <span className="text-xs font-medium">{key}</span>
                </label>
              );
            }

            return (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  {key}
                </label>
                <input
                  className="border rounded px-2 py-1 text-xs"
                  value={value ?? ""}
                  onChange={(e) => updateLabelProp(key, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FieldSettingsPanel;
