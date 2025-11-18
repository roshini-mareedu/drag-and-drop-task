import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const TimeRangeField = ({ field }:{field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value ? props.value.split("|") : ["", ""];
  const [startTime, setStartTime] = useState(initial[0]);
  const [endTime, setEndTime] = useState(initial[1]);

  const is24hr = props.timeFormat === "24";

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

      <div className="flex items-center gap-3">
        <Input
          type={is24hr ? "time" : "text"}
          placeholder={props.placeholder || "Start Time"}
          value={startTime}
          required={props.required}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-1/2"
        />

        <span className="text-gray-500">to</span>

        <Input
          type={is24hr ? "time" : "text"}
          placeholder={props.placeholder || "End Time"}
          value={endTime}
          required={props.required}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-1/2"
        />
      </div>
    </div>
  );
};

export default TimeRangeField;
