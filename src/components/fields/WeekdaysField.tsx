// import React, { useState } from "react";

// const WeekdaysField = ({ field }) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   // stored as: "Mon,Wed,Fri"
//   const initial = props.value
//     ? props.value.split(",").map((v) => v.trim())
//     : [];

//   const [selectedDays, setSelectedDays] = useState(initial);

//   const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const toggleDay = (day) => {
//     let updated = [];

//     if (selectedDays.includes(day)) {
//       updated = selectedDays.filter((d) => d !== day);
//     } else {
//       updated = [...selectedDays, day];
//     }

//     setSelectedDays(updated);
//   };

//   return (
//     <div className="flex flex-col w-full">

//       {/* Dynamic Label */}
//       {labelProps?.showFieldLabel && (
//         <label
//           className="mb-1"
//           style={{
//             color: labelProps.color,
//             fontSize: labelProps.fontsize,
//             fontFamily: labelProps.fontFamily,
//             textAlign: labelProps.textAlign,
//           }}
//         >
//           {labelProps.fieldLabel}
//           {props.required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       {/* Weekday Buttons */}
//       <div className="flex flex-wrap gap-2">
//         {WEEKDAYS.map((day) => {
//           const isActive = selectedDays.includes(day);

//           return (
//             <button
//               key={day}
//               type="button"
//               onClick={() => toggleDay(day)}
//               className={`px-3 py-1 rounded border ${
//                 isActive
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-400"
//               }`}
//             >
//               {day}
//             </button>
//           );
//         })}
//       </div>

//       {/* Show placeholder if nothing selected */}
//       {selectedDays.length === 0 && (
//         <span className="text-xs text-gray-500 mt-1">
//           {props.placeholder || "Select Weekday"}
//         </span>
//       )}

//     </div>
//   );
// };

// export default WeekdaysField;


import  { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "../ui/label";

const WeekdaysField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value
    ? props.value.split(",").map((v: string) => v.trim())
    : [];

  const [selectedDays, setSelectedDays] = useState(initial);

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
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

      {/* Weekday Toggle Buttons */}
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
