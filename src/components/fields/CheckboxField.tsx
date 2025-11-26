import { useState } from "react";
import { Label } from "../ui/label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, X } from "lucide-react";   // <-- ADD THIS
import { Field } from "../FormBuilder/FieldRenderer";

const CheckboxField = ({ field }: { field: Field }) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const defaultChecked =
    props.value === true || props.value === "true" || props.value === 1;

  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex flex-col gap-2 w-full">

      {labelProps?.showFieldLabel && (
        <Label
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign: labelProps.textAlign || "left",
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="flex items-center gap-2">

        {/* CUSTOM CHECKBOX */}
        <CheckboxPrimitive.Root
          checked={checked}
          onCheckedChange={(val) => setChecked(Boolean(val))}
          className="h-5 w-5 rounded border border-gray-400 flex items-center justify-center bg-white"
        >
          <CheckboxPrimitive.Indicator>
            {checked && (
              props.useCrossmark ? (
                <X size={16} className="text-red-600" />       // RED CROSS
              ) : (
                <Check size={16} className="text-black" />     // BLACK TICK
              )
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <span className="text-sm">{props.label}</span>
      </div>

      {/* GROUP INFO */}
      {props.checkboxGroup?.enabled && (
        <small className="text-xs text-gray-500">
          Group: {props.checkboxGroup.groupName}
          {props.checkboxGroup.required && " (required)"}
        </small>
      )}
    </div>
  );
};

export default CheckboxField;
