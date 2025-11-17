// import React, { useState } from "react";

// const TextField = ({ field }) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [value, setValue] = useState(props.value || "");

//   // If masking enabled → mask with *
//   const displayValue = props.maskFieldValue
//     ? "*".repeat(value.length)
//     : value;

//   return (
//     <div className="flex flex-col w-full">

//       {/* Dynamic label */}
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

//       {/* If splitMode = true, draw boxes like an OTP input */}
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
//                 const newVal = arr.join("");
//                 setValue(newVal);
//               }}
//               style={{
//                 width: props.splitBoxes.width,
//                 height: props.splitBoxes.height,
//                 textAlign: "center",
//               }}
//               className="border border-gray-300 rounded"
//             />
//           ))}
//         </div>
//       ) : (
//         // Normal input
//         <input
//           type={props.maskFieldValue ? "password" : "text"}
//           placeholder={props.placeholder}
//           required={props.required}
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           style={{
//             color: props.color,
//             textAlign: props.textAlign,
//             fontFamily: props.fontFamily,
//             fontWeight: props.fontWeight,
//             fontStyle: props.fontStyle,
//             fontSize: props.fontsize,
//           }}
//           className="border border-gray-300 rounded px-2 py-1"
//         />
//       )}
//     </div>
//   );
// };

// export default TextField;


import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const TextField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [value, setValue] = useState(props.value || "");

  // Mask if needed
  const displayValue = props.maskFieldValue
    ? "*".repeat(value.length)
    : value;

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
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Split Mode (like OTP boxes) */}
      {props.splitMode ? (
        <div className="flex gap-2">
          {Array.from({ length: props.splitBoxes.count }).map((_, idx) => (
            <Input
              key={idx}
              maxLength={1}
              value={value[idx] || ""}
              onChange={(e) => {
                const arr = value.split("");
                arr[idx] = e.target.value;
                setValue(arr.join(""));
              }}
              className="text-center"
              style={{
                width: props.splitBoxes.width,
                height: props.splitBoxes.height,
                fontFamily: props.fontFamily,
                fontSize: props.fontsize,
              }}
            />
          ))}
        </div>
      ) : (
        // Normal Text Field
        <Input
          type={props.maskFieldValue ? "password" : "text"}
          placeholder={props.placeholder}
          required={props.required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            color: props.color,
            textAlign: props.textAlign,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            fontStyle: props.fontStyle,
            fontSize: props.fontsize,
          }}
        />
      )}
    </div>
  );
};

export default TextField;
