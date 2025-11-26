import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Label } from "../ui/label";

interface Field {
  fieldId: string;
  fieldType: string;
  properties: any;
}

const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const WeekdaysField = ({ field, update }: { field: Field; update: any }) => {
  const props = field.properties;
  const labelProps = props.fieldLabelProperties;

  const initial = props.value ? props.value.trim() : "";
  const [selected, setSelected] = useState(initial);
  const [open, setOpen] = useState(false);

  const selectDay = (day: string) => {
    setSelected(day);
    update("value", day);
    setOpen(false);     
  };
  return (
    <div className="flex flex-col gap-1 w-full">

      {labelProps?.showFieldLabel && (
        <Label
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign: labelProps.textAlign || "left",
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selected || props.placeholder || "Select Weekday"}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search weekday..." />
            <CommandGroup>
              {WEEKDAYS.map((day) => (
                <CommandItem
                  key={day}
                  value={day}
                  onSelect={() => selectDay(day)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selected === day ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {day}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default WeekdaysField;
