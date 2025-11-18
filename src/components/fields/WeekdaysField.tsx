import  { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "../ui/label";


interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const WeekdaysField = ({ field }: {field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value
    ? props.value.split(",").map((v: string) => v.trim())
    : [];

  const [selectedDays, setSelectedDays] = useState(initial);

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev : any) =>
      prev.includes(day) ? prev.filter((d :any) => d !== day) : [...prev, day]
    );
  };

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

      <div className="flex flex-wrap gap-2">
        {WEEKDAYS.map((day) => {
          const isActive = selectedDays.includes(day);

          return (
            <Toggle
              key={day}
              pressed={isActive}
              onPressedChange={() => toggleDay(day)}
              className="px-3 py-1 text-sm"
            >
              {day}
            </Toggle>
          );
        })}
      </div>

      {selectedDays.length === 0 && (
        <span className="text-xs text-gray-500 mt-1">
          {props.placeholder || "Select Weekday"}
        </span>
      )}
    </div>
  );
};

export default WeekdaysField;
