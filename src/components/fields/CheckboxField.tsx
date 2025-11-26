import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface Field {
  fieldId: string;
  fieldType: string;
  properties: any;
}
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
          className="text-sm font-medium"
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign:
              (labelProps.textAlign as "left" | "center" | "right") || "left"
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {/* >>> FIXED ROW <<< */}
      <div className="flex items-center gap-2">

        <Checkbox
          checked={checked}
          onCheckedChange={(val: any) => setChecked(Boolean(val))}
          required={props.required}
        />

        <span className="text-sm">{props.label}</span>

        {props.useCrossmark && checked && (
          <span className="text-xl text-red-500 leading-none">✕</span>
        )}
      </div>

      {/* GROUP LABEL INFO */}
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
