import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface Field {
  fieldId: string;
  fieldType: string;
  properties: any;
}

export default function DateSettings({ field, updateDate }: { field: Field; updateDate: any }) {

  const props = field.properties;

  const selectedDate = props.timestamp ? new Date(props.timestamp) : undefined;

  return (
    <div className="bg-pink-100 rounded-lg p-4 space-y-2">

      <Label className="text-sm font-semibold">Selected Date</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-sm">
            {props.displayValue || "Pick date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && updateDate(date)}
          />
        </PopoverContent>
      </Popover>

    </div>
  );
}
