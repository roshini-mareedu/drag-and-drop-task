import { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { ChevronsUpDown, Check } from 'lucide-react'
import { Label } from '../ui/label'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}

const WeekdaysField = ({ field, update }: { field: Field; update: any }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const initial = props.value
    ? props.value.split(',').map((v: string) => v.trim())
    : []

  const [selected, setSelected] = useState<string[]>(initial)
  const [open, setOpen] = useState(false)

  const toggleDay = (day: string) => {
    let updated = [...selected]

    if (updated.includes(day)) {
      updated = updated.filter((d) => d !== day)
    } else {
      updated.push(day)
    }

    setSelected(updated)
    update('value', updated.join(',')) 
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {labelProps?.showFieldLabel && (
        <Label
          className="text-sm font-medium block w-full"
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign:
              (labelProps.textAlign as 'left' | 'center' | 'right') || 'left',
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {/* Dropdown */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selected.length > 0
              ? selected.join(', ')
              : props.placeholder || 'Select Weekday'}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search weekday..." />

            <CommandGroup>
              {WEEKDAYS.map((day) => {
                const isSelected = selected.includes(day)

                return (
                  <CommandItem
                    key={day}
                    value={day}
                    onSelect={() => toggleDay(day)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {day}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default WeekdaysField
