import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface Field {
  fieldId: string;
  fieldType: string;
  properties: any;
}
const CheckboxField = ({ field } : { field: Field }) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const defaultChecked =
    props.value === true ||
    props.value === "true" ||
    props.value === 1;

  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex flex-col gap-1">

      {labelProps?.showFieldLabel && (
        <Label
          className="text-sm font-medium"
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign: labelProps.textAlign,
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <Label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={checked}
          onCheckedChange={(val : any) => setChecked(Boolean(val))}
          className="border-gray-400"
          required={props.required}
        />

        <span className="text-sm">{props.label}</span>

        {props.useCrossmark && checked && (
          <span className="text-lg text-red-600 pointer-events-none">X</span>
        )}
      </Label>

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
