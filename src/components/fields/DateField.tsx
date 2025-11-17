// import React, { useState } from "react";

// const DateField = ({ field }) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   // Use displayValue > value > empty
//   const [value, setValue] = useState(props.displayValue || props.value || "");

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

//       {/* If splitMode = true → render date as OTP-style boxes */}
//       {props.splitMode ? (
//         <div className="flex gap-1">
//           {Array.from({ length: props.splitBoxes.count }).map((_, idx) => (
//             <input
//               key={idx}
//               maxLength={1}
//               value={value[idx] || ""}
//               onChange={(e) => {
//                 const arr = value.split("");
//                 arr[idx] = e.target.value;
//                 setValue(arr.join(""));
//               }}
//               style={{
//                 width: props.splitBoxes.width,
//                 height: props.splitBoxes.height,
//               }}
//               className="border border-gray-300 rounded text-center"
//             />
//           ))}
//         </div>
//       ) : (
//         // Normal date field (formatted readonly)
//         <input
//           type="text"
//           placeholder={props.placeholder}
//           required={props.required}
//           value={value}
//           readOnly
//           className="border border-gray-300 rounded px-2 py-1 bg-gray-100 cursor-not-allowed"
//         />
//       )}
//     </div>
//   );
// };

// export default DateField;


import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

const DateField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  // DisplayValue > value > empty
  const [value, setValue] = useState(props.displayValue || props.value || "");

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

      {props.splitMode ? (
        <div className="flex gap-2">
          {Array.from({ length: props.splitBoxes.count }).map((_, idx) => (
            <Input
              key={idx}
              maxLength={1}
              value={value[idx] || ""}
              className="text-center"
              style={{
                width: props.splitBoxes.width,
                height: props.splitBoxes.height,
              }}
              onChange={(e) => {
                const arr = value.split("");
                arr[idx] = e.target.value;
                setValue(arr.join(""));
              }}
            />
          ))}
        </div>
      ) : (
        <Input
          readOnly
          required={props.required}
          placeholder={props.placeholder}
          value={value}
          className="bg-muted/30 cursor-not-allowed"
        />
      )}
    </div>
  );
};

export default DateField;
