// import React, { useState } from "react";

// const FileField = ({ field }) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [files, setFiles] = useState(props.documentNames || []);

//   const handleFileChange = (e) => {
//     const selected = Array.from(e.target.files).map((file) => file.name);
//     setFiles(selected);
//   };

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

//       {/* File Input */}
//       <input
//         type="file"
//         multiple
//         required={props.required}
//         onChange={handleFileChange}
//         className="border border-gray-300 rounded px-2 py-1"
//       />

//       {/* File List Preview */}
//       {files.length > 0 && (
//         <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
//           {files.map((name, idx) => (
//             <li key={idx}>{name}</li>
//           ))}
//         </ul>
//       )}

//     </div>
//   );
// };

// export default FileField;


import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const FileField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [files, setFiles] = useState(props.documentNames || []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).map((file) => file.name);
    setFiles(selected);
  };

  return (
    <div className="flex flex-col w-full gap-2">

      {/* Dynamic Label */}
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

      {/* File Input */}
      <Input
        type="file"
        multiple
        required={props.required}
        onChange={handleFileChange}
        className="cursor-pointer"
      />

      {/* File List Preview */}
      {files.length > 0 && (
        <Card className="mt-2 bg-muted/50 rounded-lg">
          <CardContent className="p-3">
            <ul className="text-sm list-disc ml-4">
              {files.map((name, idx) => (
                <li key={idx} className="text-gray-700">
                  {name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FileField;
