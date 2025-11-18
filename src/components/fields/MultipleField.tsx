import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Label } from "../ui/label";

interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const MultipleField = ({ field }: {field:Field}) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initialValues = props.value
    ? props.value.split(",").map((v : any) => v.trim())
    : [];

  const [values, setValues] = useState<string[]>(initialValues);
  const [open, setOpen] = useState(false);

  const toggleValue = (option: string) => {
    let updated = [...values];

    if (updated.includes(option)) {
      updated = updated.filter((v) => v !== option);
    } else {
      updated.push(option);
    }

    setValues(updated);
  };

  const isBelowMin =
    props.minSelect && values.length < props.minSelect;

  const isAboveMax =
    props.maxSelect && values.length > props.maxSelect;

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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
          >
            {values.length > 0
              ? `${values.length} selected`
              : props.placeholder || "Select options"}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {props.options?.map((option: string, index: number) => {
                const selected = values.includes(option);

                return (
                  <CommandItem
                    key={index}
                    value={option}
                    onSelect={() => toggleValue(option)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {option}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <Badge key={v} variant="secondary" className="flex items-center gap-1">
            {v}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => toggleValue(v)}
            />
          </Badge>
        ))}
      </div>

      {isBelowMin && (
        <span className="text-xs text-red-500">
          Select at least {props.minSelect} option(s).
        </span>
      )}
      {isAboveMax && (
        <span className="text-xs text-red-500">
          Select no more than {props.maxSelect} option(s).
        </span>
      )}
    </div>
  );
};

export default MultipleField;
