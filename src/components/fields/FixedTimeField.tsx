// import React, { useState, useMemo } from "react";

// const FixedTimeField = ({ field } : any) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [selected, setSelected] = useState(props.value || "");

//   const is12hr = props.timeFormat === "12";

//   const timeSlots = useMemo(() => {
//     const slots = [];

//     const step = Number(props.timeStep) || 30; // minutes
//     let [sh, sm] = props.timeRange.start.split(":").map(Number);
//     const [eh, em] = props.timeRange.end.split(":").map(Number);

//     let current = sh * 60 + sm;
//     const end = eh * 60 + em;

//     while (current <= end) {
//       const hours = Math.floor(current / 60);
//       const minutes = current % 60;

//       const slot24 = `${String(hours).padStart(2, "0")}:${String(
//         minutes
//       ).padStart(2, "0")}`;

//       // Convert to 12hr format
//       let slotDisplay = slot24;
//       if (is12hr) {
//         const h = hours % 12 || 12;
//         const ampm = hours < 12 ? "AM" : "PM";
//         slotDisplay = `${h}:${String(minutes).padStart(2, "0")} ${ampm}`;
//       }

//       slots.push({ value: slot24, display: slotDisplay });

//       current += step;
//     }

//     return slots;
//   }, [props.timeStep, props.timeRange.start, props.timeRange.end, props.timeFormat]);

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
//             textAlign: labelProps.textAlign
//           }}
//         >
//           {labelProps.fieldLabel}
//           {props.required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       {/* Time Dropdown */}
//       <select
//         required={props.required}
//         value={selected}
//         onChange={(e) => setSelected(e.target.value)}
//         className="border border-gray-300 rounded px-2 py-1"
//       >
//         <option value="">{props.placeholder || "Select Fixed Time"}</option>

//         {timeSlots.map((slot, idx) => (
//           <option key={idx} value={slot.value}>
//             {slot.display}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default FixedTimeField;


import React, { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const FixedTimeField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [selected, setSelected] = useState(props.value || "");
  const is12hr = props.timeFormat === "12";

  const timeSlots = useMemo(() => {
    const slots = [];

    const step = Number(props.timeStep) || 30;
    let [sh, sm] = props.timeRange.start.split(":").map(Number);
    const [eh, em] = props.timeRange.end.split(":").map(Number);

    let current = sh * 60 + sm;
    const end = eh * 60 + em;

    while (current <= end) {
      const hours = Math.floor(current / 60);
      const minutes = current % 60;

      const slot24 = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;

      let slotDisplay = slot24;
      if (is12hr) {
        const h = hours % 12 || 12;
        const ampm = hours < 12 ? "AM" : "PM";
        slotDisplay = `${h}:${String(minutes).padStart(2, "0")} ${ampm}`;
      }

      slots.push({ value: slot24, display: slotDisplay });
      current += step;
    }

    return slots;
  }, [props.timeStep, props.timeRange.start, props.timeRange.end, props.timeFormat]);

  return (
    <div className="flex flex-col w-full gap-1">

      {/* shadcn label */}
      {labelProps?.showFieldLabel && (
        <label
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
        </label>
      )}

      {/* SHADCN Select */}
      <Select
        required={props.required}
        value={selected}
        onValueChange={setSelected}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder || "Select Fixed Time"} />
        </SelectTrigger>

        <SelectContent>
          {timeSlots.map((slot, idx) => (
            <SelectItem key={idx} value={slot.value}>
              {slot.display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FixedTimeField;
