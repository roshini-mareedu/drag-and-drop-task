import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Field {
  fieldId: string;
  fieldType: string;
  properties: any;
}

export default function CurrencySettings({ field, update }: { field: Field; update: any }) {

  const props = field.properties;

  return (
    <div className="flex flex-col gap-4 p-3 bg-pink-50 rounded-md">

      {/* Currency symbol */}
      <div className="flex flex-col gap-1">
        <Label>Currency Symbol</Label>
        <Select
          value={props.currencySymbol}
          onValueChange={(v) => update("currencySymbol", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="$">$ – US Dollar (USD)</SelectItem>
            <SelectItem value="₹">₹ – Indian Rupee (INR)</SelectItem>
            <SelectItem value="€">€ – Euro (EUR)</SelectItem>
            <SelectItem value="£">£ – Pound (GBP)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Symbol position */}
      <div className="flex flex-col gap-1">
        <Label>Symbol Position</Label>
        <Select
          value={props.position}
          onValueChange={(v) => update("position", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="before">Before amount ($100)</SelectItem>
            <SelectItem value="after">After amount (100$)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Decimal places */}
      <div className="flex flex-col gap-1">
        <Label>Decimal Places</Label>
        <Select
          value={props.decimals + ""}
          onValueChange={(v) => update("decimals", +v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0 (whole numbers only)</SelectItem>
            <SelectItem value="2">2 decimals (0.00)</SelectItem>
            <SelectItem value="3">3 decimals (0.000)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Thousands separator check */}
      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          checked={props.useThousandsSeparator}
          onCheckedChange={(v) => update("useThousandsSeparator", v)}
        />
        <Label>Use thousands separator (1,000 vs 1000)</Label>
      </div>
    </div>
  );
}
