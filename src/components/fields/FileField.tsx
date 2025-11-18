import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const FileField = ({ field }: {field: Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const [files, setFiles] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).map((file) => file.name);
    setFiles(selected);
  };

  return (
    <div className="flex flex-col w-full gap-2">

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

      <Input
        type="file"
        multiple
        required={props.required}
        onChange={handleFileChange}
        className="cursor-pointer"
      />

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
