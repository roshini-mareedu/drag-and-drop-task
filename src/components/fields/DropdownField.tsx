import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const DropdownField = ({ field }: {field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [selected, setSelected] = useState(props.value || "");

  return (
    <div className="flex flex-col gap-1 w-full">

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
