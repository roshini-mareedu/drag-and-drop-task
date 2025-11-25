import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const DateField = ({ field } : { field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const value = props.displayValue || props.value || "";


  return (
    <div className="flex flex-col gap-1 w-full">

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

      {props.splitMode ? (
        <div className="flex gap-2">
          {Array.from({ length: props.splitBoxes.count }).map((_, idx) => (
            <Input
              key={idx}
              maxLength={1}
              value={value[idx] || ""}
              className="text-center"
              style={{
                width: props.splitBoxes.width,
                height: props.splitBoxes.height,
              }}
              onChange={(e) => {
                const arr = value.split("");
                arr[idx] = e.target.value;
                setValue(arr.join(""));
              }}
            />
          ))}
        </div>
      ) : (
        <Input
          readOnly
          required={props.required}
          placeholder={props.placeholder}
          value={value}
          className="bg-muted/30 "
        />
      )}
    </div>
  );
};

export default DateField;
