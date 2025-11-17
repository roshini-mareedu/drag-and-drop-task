// import React, { useState } from "react";

// const DateRangeField = ({ field } : any) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   // value: stored as "start|end" or empty
//   const initial = props.value ? props.value.split("|") : ["", ""];
//   const [startDate, setStartDate] = useState(initial[0]);
//   const [endDate, setEndDate] = useState(initial[1]);

//   return (
//     <div className="flex flex-col w-full">

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

//       <div className="flex gap-2 items-center">

//         <input
//           type="text"
//           placeholder={props.placeholder || "Start Date"}
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           required={props.required}
//           className="border border-gray-300 rounded px-2 py-1 bg-gray-100 cursor-text w-1/2"
//         />

//         <span className="text-gray-600">to</span>

//         <input
//           type="text"
//           placeholder={props.placeholder || "End Date"}
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           required={props.required}
//           className="border border-gray-300 rounded px-2 py-1 bg-gray-100 cursor-text w-1/2"
//         />

//       </div>

//     </div>
//   );
// };

// export default DateRangeField;


import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

const DateRangeField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value ? props.value.split("|") : ["", ""];
  const [startDate, setStartDate] = useState(initial[0]);
  const [endDate, setEndDate] = useState(initial[1]);

  return (
    <div className="flex flex-col gap-1 w-full">

      {/* Dynamic Label */}
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
        
        {/* START DATE */}
        <Input
          value={startDate}
          required={props.required}
          placeholder={props.placeholder || "Start Date"}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-muted/30 cursor-text"
        />

        <span className="text-gray-500">to</span>

        {/* END DATE */}
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
