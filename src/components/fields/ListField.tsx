// import React, { useState } from "react";

// const ListField = ({ field }) => {
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

//       {/* List dropdown */}
//       <select
//         value={selected}
//         onChange={(e) => setSelected(e.target.value)}
//         required={props.required}
//         className="border border-gray-300 rounded px-2 py-1"
//       >
//         {/* Placeholder */}
//         <option value="">{props.placeholder || "Select an item"}</option>

//         {/* Dynamic items */}
//         {props.items?.map((item, index) => (
//           <option key={index} value={item.value}>
//             {item.name}
//           </option>
//         ))}
//       </select>

//     </div>
//   );
// };

// export default ListField;


import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

const ListField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [value, setValue] = useState(props.value || "");

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

      {/* SHADCN SELECT */}
      <Select
        value={value}
        onValueChange={setValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder || "Select an item"} />
        </SelectTrigger>

        <SelectContent>
          {/* Items from JSON */}
          {props.items?.map((item: any, index: number) => (
            <SelectItem key={index} value={String(item.value)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ListField;
