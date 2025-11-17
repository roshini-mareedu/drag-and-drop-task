// import React from "react";

// const TimeField = ({ field } : any) => {
//   const { label, placeholder, required, value, timeFormat } = field.properties;

//   return (
//     <div className="flex flex-col">
//       {label && (
//         <label className="text-sm font-medium mb-1">
//           {label}
//           {required && <span className="text-red-500">*</span>}
//         </label>
//       )}

//       <input
//         type="time"
//         step={timeFormat === "24" ? 60 : undefined}
//         placeholder={placeholder || "Select Time"}
//         defaultValue={value}
//         required={required}
//         className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default TimeField;


import { Input } from "@/components/ui/input";

const TimeField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  return (
    <div className="flex flex-col gap-1 w-full">

      {/* Dynamic Label */}
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
          {labelProps.fieldLabel || props.label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* SHADCN TIME INPUT */}
      <Input
        type="time"
        step={props.timeFormat === "24" ? 60 : undefined}
        placeholder={props.placeholder || "Select Time"}
        defaultValue={props.value}
        required={props.required}
      />
    </div>
  );
};

export default TimeField;
