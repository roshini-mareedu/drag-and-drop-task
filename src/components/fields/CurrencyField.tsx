import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const CurrencyField = ({ field }: { field : Field }) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;
  const [value, setValue] = useState(props.value || "");

  const formatNumber = (num: string) => {
    if (!num) return "";
    const parts = num.split(".");
    const whole = parts[0].replace(/,/g, "");
    const fraction = parts[1];

    let formatted = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fraction !== undefined ? `${formatted}.${fraction}` : formatted;
  };

  const handleChange = (e: any) => {
    let val = e.target.value.replace(/[^0-9.]/g, "");

    const parts = val.split(".");
    if (parts.length > 2) return;

    if (props.useThousandsSeparator) {
      val = formatNumber(val);
    }

    setValue(val);
  };

  return (
    <div className="flex flex-col gap-1 w-full">

      {labelProps?.showFieldLabel && (
        <Label
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
        </Label>
      )}

      <div className="flex items-center border rounded-md bg-white border-gray-300 px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500">

        <span className="text-gray-500 mr-2">{props.currencySymbol || "$"}</span>

        <Input
          type="text"
          value={value}
          required={props.required}
          placeholder={props.placeholder}
          onChange={handleChange}
          className="border-0 shadow-none focus-visible:ring-0 px-0"
          style={{
            color: props.color,
            fontSize: props.fontsize,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            fontStyle: props.fontStyle,
          }}
        />
      </div>
    </div>
  );
};

export default CurrencyField;
