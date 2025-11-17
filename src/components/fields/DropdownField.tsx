// import React, { useState } from "react";

// const DropdownField = ({ field }:any) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [selected, setSelected] = useState(props.value || "");

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

//       {/* Dropdown */}
//       <select
//         value={selected}
//         onChange={(e) => setSelected(e.target.value)}
//         required={props.required}
//         className="border border-gray-300 rounded px-2 py-1"
//       >
//         {/* Placeholder Option */}
//         <option value="">{props.placeholder || "Select"}</option>

//         {/* Dynamic Options */}
//         {props.options?.map((option : any, index : any) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>

//     </div>
//   );
// };

// export default DropdownField;


import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

const DropdownField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [selected, setSelected] = useState(props.value || "");

  return (
    <div className="flex flex-col gap-1 w-full">

      {/* Label */}
      {labelProps?.showFieldLabel && (
        <Label
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
        </Label>
      )}

      {/* SHADCN SELECT */}
      <Select value={selected} onValueChange={setSelected} required={props.required}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder || "Select"} />
        </SelectTrigger>

        <SelectContent>
          {props.options?.map((option: any, index: number) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownField;
