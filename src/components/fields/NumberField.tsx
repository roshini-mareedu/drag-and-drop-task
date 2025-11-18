import { useState } from "react";
import { Input } from "@/components/ui/input"

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const NumberField = ({ field } : {field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [value, setValue] = useState(props.value || "");

  const displayValue = props.maskFieldValue
    ? "*".repeat(value.length)
    : value;

  return (
    <div className="flex flex-col w-full">

      {labelProps?.showFieldLabel && (
        <label
          className="mb-1"
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign: labelProps.textAlign,
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {props.splitMode ? (
        <div className="flex gap-1">
          {Array.from({ length: props.splitBoxes.count }).map((_, idx) => (
            <input
              key={idx}
              maxLength={1}
              value={displayValue[idx] || ""}
              onChange={(e) => {
                const arr = value.split("");
                const newVal = e.target.value.replace(/[^0-9]/g, ""); 
                arr[idx] = newVal;
                setValue(arr.join(""));
              }}
              style={{
                width: props.splitBoxes.width,
                height: props.splitBoxes.height,
                textAlign: "center",
              }}
              className="border border-gray-300 rounded"
            />
          ))}
        </div>
      ) : (
        <Input
          type={props.maskFieldValue ? "password" : "text"}
          placeholder={props.placeholder}
          required={props.required}
          value={displayValue}
          onChange={(e) => {
            const numeric = e.target.value.replace(/[^0-9]/g, ""); 
            setValue(numeric);
          }}
          style={{
            textAlign: props.textAlign,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            fontStyle: props.fontStyle,
            fontSize: props.fontsize,
            color: props.color,
          }}
          className="border border-gray-300 rounded px-2 py-1"
        />
      )}
    </div>
  );
};

export default NumberField;
