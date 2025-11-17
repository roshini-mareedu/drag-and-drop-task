// import React, { useState } from "react";

// const RadioField = ({ field } : any) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [selected, setSelected] = useState(props.value || "");

//   return (
//     <div className="flex flex-col">

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

//       {/* Radio Options */}
//       <div className="flex gap-4">
//         {props.options?.map((option, index) => (
//           <label key={index} className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name={field.fieldId}
//               value={option}
//               checked={selected === option}
//               onChange={(e) => setSelected(e.target.value)}
//               required={props.required}
//               className="h-4 w-4"
//             />
//             <span>{option}</span>
//           </label>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default RadioField;


import React, { useState } from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

const RadioField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [selected, setSelected] = useState(props.value || "");

  return (
    <div className="flex flex-col gap-1">

      {/* Field Label */}
      {labelProps?.showFieldLabel && (
        <label
          className="text-sm font-medium"
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            textAlign: labelProps.textAlign,
            fontFamily: labelProps.fontFamily,
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="flex gap-4"
      >
        {props.options?.map((option: string, index: number) => (
          <label
            key={index}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <RadioGroupItem
              value={option}
              id={`${field.fieldId}-${index}`}
              required={props.required}
            />
            <span>{option}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioField;
