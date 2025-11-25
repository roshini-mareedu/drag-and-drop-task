import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select"

interface FieldSettingsProps {
  field: any
  update: (key: string, val: any) => void
}

export default function FixedTimeSettings({ field, update }: FieldSettingsProps) {
  const props = field.properties

  return (
    <div className="bg-pink-100 rounded-sm p-4 space-y-4">

      <div className="space-y-1">
        <Label className="text-md font-medium">Time Format</Label>

        <Select
          value={props.timeFormat}
          onValueChange={(v) => update("timeFormat", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="12">12-hour format (AM/PM)</SelectItem>
            <SelectItem value="24">24-hour format</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-md font-medium">Time Step</Label>

        <Select
          value={props.timeStep}
          onValueChange={(v) => update("timeStep", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">5 minutes</SelectItem>
            <SelectItem value="10">10 minutes</SelectItem>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>      
    </div>
  )
}
