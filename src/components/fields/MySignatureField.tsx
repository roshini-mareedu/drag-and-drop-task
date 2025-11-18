import { Label } from "@/components/ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const MySignatureField = ({ field }: {field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  return (
    <div className="flex flex-col w-full gap-2">

      {labelProps?.showFieldLabel && (
        <Label
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign: labelProps.textAlign
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div
        className="border border-dashed border-gray-400 rounded-md h-24 flex items-center justify-center text-gray-500 bg-gray-50"
      >
        {props.value || props.placeholder || "Signature"}
      </div>

      {props.printSign && props.value && (
        <p className="text-xs text-gray-600 mt-1">Signed: {props.value}</p>
      )}
    </div>
  );
};

export default MySignatureField;
