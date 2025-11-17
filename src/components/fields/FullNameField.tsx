// import React, { useState } from "react";

// const FullNameField = ({ field }) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [value, setValue] = useState(props.value || "");

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

//       {/* Dynamic Input */}
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

// export default FullNameField;


import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FullNameField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;
  const [value, setValue] = useState(props.value || "");

  return (
    <div className="flex flex-col w-full gap-1">

      {/* Label (ShadCN) */}
      {labelProps?.showFieldLabel && (
        <Label
          className="font-medium"
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

      {/* Input (ShadCN) */}
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

export default FullNameField;
