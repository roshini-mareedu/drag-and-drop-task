// import React, { useState } from "react";

// const DateTimeRangeField = ({ field }:any) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   // Stored as: "date time | date time"
//   const initial = props.value ? props.value.split("|") : ["", ""];
//   const [startValue, setStartValue] = useState(initial[0]);
//   const [endValue, setEndValue] = useState(initial[1]);

//   // timeFormat: "" means user enters text freely
//   const hasTimeFormat = props.timeFormat && props.timeFormat.trim() !== "";
//   const is24hr = props.timeFormat === "24";

//   return (
//     <div className="flex flex-col w-full">

//       {/* Label */}
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

//       {/* Date-Time Range Container */}
//       <div className="flex flex-col gap-2">

//         {/* Start Date-Time */}
//         <div className="flex gap-2">

//           {/* Start Date */}
//           <input
//             type="text"
//             placeholder={props.placeholder || "Start Date"}
//             value={startValue}
//             onChange={(e) => setStartValue(e.target.value)}
//             required={props.required}
//             className="border border-gray-300 rounded px-2 py-1 w-1/2"
//           />

//           {/* Start Time */}
//           <input
//             type={hasTimeFormat ? (is24hr ? "time" : "text") : "text"}
//             placeholder="Start Time"
//             required={props.required}
//             onChange={(e) => {
//               const date = startValue.split(" ")[0] || "";
//               setStartValue(date + " " + e.target.value);
//             }}
//             className="border border-gray-300 rounded px-2 py-1 w-1/2"
//           />
//         </div>

//         {/* End Date-Time */}
//         <div className="flex gap-2">

//           {/* End Date */}
//           <input
//             type="text"
//             placeholder={props.placeholder || "End Date"}
//             value={endValue}
//             onChange={(e) => setEndValue(e.target.value)}
//             required={props.required}
//             className="border border-gray-300 rounded px-2 py-1 w-1/2"
//           />

//           {/* End Time */}
//           <input
//             type={hasTimeFormat ? (is24hr ? "time" : "text") : "text"}
//             placeholder="End Time"
//             required={props.required}
//             onChange={(e) => {
//               const date = endValue.split(" ")[0] || "";
//               setEndValue(date + " " + e.target.value);
//             }}
//             className="border border-gray-300 rounded px-2 py-1 w-1/2"
//           />
//         </div>

//       </div>

//     </div>
//   );
// };

// export default DateTimeRangeField;


import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const DateTimeRangeField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value ? props.value.split("|") : ["", ""];
  const [startValue, setStartValue] = useState(initial[0]);
  const [endValue, setEndValue] = useState(initial[1]);

  const hasTimeFormat = props.timeFormat && props.timeFormat.trim() !== "";
  const is24hr = props.timeFormat === "24";

  return (
    <div className="flex flex-col gap-1 w-full">

      {/* Label */}
      {labelProps?.showFieldLabel && (
        <label
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
        </label>
      )}

      {/* WRAPPER */}
      <div className="flex flex-col gap-3">

        {/* START */}
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

        {/* END */}
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
