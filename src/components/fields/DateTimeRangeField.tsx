import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const DateTimeRangeField = ({ field }: {field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value ? props.value.split("|") : ["", ""];
  const [startValue, setStartValue] = useState(initial[0]);
  const [endValue, setEndValue] = useState(initial[1]);

  const hasTimeFormat = props.timeFormat && props.timeFormat.trim() !== "";
  const is24hr = props.timeFormat === "24";

  return (
    <div className="flex flex-col gap-1 w-full">

      {labelProps?.showFieldLabel && (
        <Label
          className="text-sm font-medium"
          style={{
            color: labelProps.color,
            fontFamily: labelProps.fontFamily,
            fontSize: labelProps.fontsize,
            textAlign: labelProps.textAlign,
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Input
            placeholder={props.placeholder || "Start Date"}
            value={startValue}
            required={props.required}
            onChange={(e) => setStartValue(e.target.value)}
            className="w-1/2"
          />
          <Input
            type={hasTimeFormat ? (is24hr ? "time" : "text") : "text"}
            placeholder="Start Time"
            required={props.required}
            onChange={(e) => {
              const date = startValue.split(" ")[0] || "";
              setStartValue(date + " " + e.target.value);
            }}
            className="w-1/2"
          />
        </div>
        <div className="flex gap-3">
          <Input
            placeholder={props.placeholder || "End Date"}
            value={endValue}
            required={props.required}
            onChange={(e) => setEndValue(e.target.value)}
            className="w-1/2"
          />
          <Input
            type={hasTimeFormat ? (is24hr ? "time" : "text") : "text"}
            placeholder="End Time"
            required={props.required}
            onChange={(e) => {
              const date = endValue.split(" ")[0] || "";
              setEndValue(date + " " + e.target.value);
            }}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimeRangeField;
