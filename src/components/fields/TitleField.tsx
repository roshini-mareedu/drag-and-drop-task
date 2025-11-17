// import React, { useState } from "react";

// const TitleField = ({ field }) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [value, setValue] = useState(props.value || "");

//   return (
//     <div className="flex flex-col w-full">

//       {/* Label (Dynamic) */}
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
//           {props.required && (
//             <span className="text-red-500 ml-1">*</span>
//           )}
//         </label>
//       )}

//       {/* Text Input (Dynamic) */}
//       <input
//         type="text"
//         placeholder={props.placeholder}
//         required={props.required}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         style={{
//           fontSize: props.fontsize,
//           fontFamily: props.fontFamily,
//           fontWeight: props.fontWeight,
//           fontStyle: props.fontStyle,
//           textAlign: props.textAlign,
//           color: props.color,
//         }}
//         className="border border-gray-300 rounded px-2 py-1"
//       />
//     </div>
//   );
// };

// export default TitleField;


import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const TitleField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;
  const [value, setValue] = useState(props.value || "");

  return (
    <div className="flex flex-col gap-1 w-full">

      {/* Label */}
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

      {/* SHADCN INPUT */}
      <Input
        type="text"
        placeholder={props.placeholder}
        required={props.required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          fontSize: props.fontsize,
          fontFamily: props.fontFamily,
          fontWeight: props.fontWeight,
          fontStyle: props.fontStyle,
          textAlign: props.textAlign,
          color: props.color,
        }}
      />
    </div>
  );
};

export default TitleField;
