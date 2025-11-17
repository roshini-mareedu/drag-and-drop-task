import { Label } from "../ui/label";

const SignatureField = ({ field }: any) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  return (
    <div className="flex flex-col gap-2 w-full">

      
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

      <div
        className="rounded-md border border-dashed flex items-center justify-center"
        style={{ height: "90px" }}
      >
        {props.placeholder || "Signature"}
      </div>

      {props.printSign && props.value && (
        <p className="text-xs text-muted-foreground">
          Signed: {props.value}
        </p>
      )}
    </div>
  );
};

export default SignatureField;
