// import React, { useState } from "react";

// const MultilineField = ({ field }) => {
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
//             textAlign: labelProps.textAlign,
//           }}
//         >
//           {labelProps.fieldLabel}
//           {props.required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       {/* Multiline Textarea */}
//       <textarea
//         placeholder={props.placeholder}
//         required={props.required}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         style={{
//           color: props.color,
//           fontSize: props.fontsize,
//           fontFamily: props.fontFamily,
//           fontWeight: props.fontWeight,
//           fontStyle: props.fontStyle,
//         }}
//         className="border border-gray-300 rounded px-2 py-1 h-28"
//       />
//     </div>
//   );
// };

// export default MultilineField;


import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const MultilineField = ({ field }: any) => {
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

      {/* SHADCN TEXTAREA */}
      <Textarea
        placeholder={props.placeholder}
        required={props.required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        className="resize-none"
        style={{
          color: props.color,
          fontSize: props.fontsize,
          fontFamily: props.fontFamily,
          fontWeight: props.fontWeight,
          fontStyle: props.fontStyle,
        }}
      />
    </div>
  );
};

export default MultilineField;
