import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const DateRangeField = ({ field }: {field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value ? props.value.split("|") : ["", ""];
  const [startDate, setStartDate] = useState(initial[0]);
  const [endDate, setEndDate] = useState(initial[1]);

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
          value={startDate}
          required={props.required}
          placeholder={props.placeholder || "Start Date"}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-muted/30 cursor-text"
        />

        <span className="text-gray-500">to</span>

        <Input
          value={endDate}
          required={props.required}
          placeholder={props.placeholder || "End Date"}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-muted/30 cursor-text"
        />

      </div>
    </div>
  );
};

export default DateRangeField;
