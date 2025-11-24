// import  { useState } from "react";
// import { Input } from "@/components/ui/input";

// interface Field{
//   fieldId: string;
//   fieldType: string;
//   properties: any;
// }
// const TextField = ({ field }:{field:Field}) => {
//   const props = field.properties;
//   const labelProps = props.fieldLabelProperties;

//   const [value, setValue] = useState(props.value || "");


//   return (
//     <div className="flex flex-col gap-1 w-full">

//       {labelProps?.showFieldLabel && (
//         <label
//           className="text-sm font-medium"
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

//       {/* Split Mode (like OTP boxes) */}
//       {props.splitMode ? (
//         <div className="flex gap-2">
//           {Array.from({ length: props.splitBoxes.count }).map((_, idx) => (
//             <Input
//               key={idx}
//               maxLength={1}
//               value={value[idx] || ""}
//               onChange={(e) => {
//                 const arr = value.split("");
//                 arr[idx] = e.target.value;
//                 setValue(arr.join(""));
//               }}
//               className="text-center"
//               style={{
//                 width: props.splitBoxes.width,
//                 height: props.splitBoxes.height,
//                 fontFamily: props.fontFamily,
//                 fontSize: props.fontsize,
//               }}
//             />
//           ))}
//         </div>
//       ) : (
//         <Input
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
//         />
//       )}
//     </div>
//   );
// };

// export default TextField;



import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface Field {
  fieldId: string;
  fieldType: string;
  properties: any;
  isSelected?: boolean;
}

const TextField = ({ field }: { field: Field }) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties || {
    showFieldLabel: true,
    fieldLabel: props.label || "Text Field",
    color: "#000000",
    fontsize: "12px",
    fontFamily: "Arial",
    textAlign: "left",
  };

  // Controlled value synced with props
  const [value, setValue] = useState(props.value || "");

  // Sync local state with external prop changes (e.g., from settings panel)
  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  // Masking state: when maskFieldValue=true, start with visible text (showPassword=true) and EyeOff icon
  const [showPassword, setShowPassword] = useState(true);

  // Always render label, but control visibility with opacity
  const labelVisibilityClass = labelProps.showFieldLabel 
    ? "opacity-100" 
    : "opacity-0 group-hover:opacity-100";

  const labelClass = `text-sm font-medium transition-opacity duration-200 absolute -top-1 left-0 bg-white px-1 z-10 ${labelVisibilityClass}`;

  // Tooltip for entered value or placeholder
  const inputTooltip = value || props.placeholder || "Enter text";

  // Determine input type: inverted logic for user request
  // When maskFieldValue=true: start visible (text), click to mask (password)
  const inputType = props.maskFieldValue 
    ? (showPassword ? "text" : "password")  // Visible -> dots on click
    : "text";

  // Split mode config with defaults
  const splitBoxes = props.splitBoxes || { count: 5, width: 40, height: 40, spacing: 8 };
  const isSplitMode = props.splitMode === true;

  // For split mode, limit value length to count and pad empty
  const splitValue = (value || '').padEnd(splitBoxes.count, '').slice(0, splitBoxes.count);
  const handleSplitChange = (idx: number, char: string) => {
    const newChars = splitValue.split('');
    newChars[idx] = char.slice(0, 1); // Single char only
    const newValue = newChars.join('').replace(/\s+$/, ''); // Trim trailing empties if needed
    setValue(newValue);
    // TODO: Propagate to parent if needed, e.g., field.onFieldChange?.(newValue)
  };

  if (isSplitMode) {
    // In split mode: ONLY plain boxes (contentEditable divs), no borders, no label, no input, no other elements
    return (
      <div 
        className="flex" 
        style={{ gap: `${splitBoxes.spacing}px` }} 
        title={inputTooltip}
      >
        {Array.from({ length: splitBoxes.count }).map((_, idx) => {
          const char = splitValue[idx] || "";
          return (
            <div
              key={idx}
              contentEditable={!Boolean(char)} // Only editable if empty
              suppressContentEditableWarning={true}
              className="text-center select-none cursor-pointer hover:bg-gray-100 rounded transition-colors"
              style={{
                width: `${splitBoxes.width}px`,
                height: `${splitBoxes.height}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #d1d5db", // Light border for box definition
                backgroundColor: char ? "white" : "#f9fafb",
                fontFamily: props.fontFamily || "Arial",
                fontSize: props.fontsize || "12px",
                color: props.color || "#000000",
                textAlign: props.textAlign || "left",
                fontWeight: props.fontWeight || "normal",
                fontStyle: props.fontStyle || "normal",
                outline: "none",
                lineHeight: 1,
              }}
              onInput={(e) => {
                const target = e.target as HTMLDivElement;
                let newChar = target.textContent?.slice(0, 1) || "";
                if (newChar) {
                  target.textContent = newChar;
                  handleSplitChange(idx, newChar);
                  // Focus next box if filled
                  const nextBox = target.parentElement?.children[idx + 1] as HTMLDivElement;
                  if (nextBox && !nextBox.textContent) nextBox.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !char) {
                  // Focus previous if empty
                  const prevBox = (e.target as HTMLDivElement).parentElement?.children[idx - 1] as HTMLDivElement;
                  if (prevBox) prevBox.focus();
                }
              }}
              onClick={(e) => (e.target as HTMLDivElement).focus()}
            >
              {char || ""}
            </div>
          );
        })}
      </div>
    );
  }

  // Regular mode: label + input
  return (
    <div className="flex flex-col gap-1 w-full relative group">
      <Label
        className={labelClass}
        style={{
          color: labelProps.color,
          fontSize: labelProps.fontsize,
          fontFamily: labelProps.fontFamily,
          textAlign: labelProps.textAlign,
        }}
        title={labelProps.fieldLabel}
      >
        {labelProps.fieldLabel}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {/* Regular input with optional masking toggle (inverted initial state) */}
      <div className="relative">
        <Input
          type={inputType}
          placeholder={props.placeholder || "Enter text..."}
          required={props.required}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="w-full pr-10"
          style={{
            color: props.color,
            textAlign: props.textAlign,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            fontStyle: props.fontStyle,
            fontSize: props.fontsize,
          }}
          title={inputTooltip}
        />
        {props.maskFieldValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 p-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {/* Inverted icons: Start with EyeOff (visible), click to Eye (masked) */}
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TextField;