import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Label } from '../ui/label'
import clsx from 'clsx'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}

const DropdownField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(props.value || '')

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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full">
          <button className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm">
            {selected || props.placeholder}
            <ChevronsUpDown size={18} />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={props.placeholder} />

            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {props.options?.map((option: string, index: number) => (
                <CommandItem
                  key={index}
                  value={option}
                  onSelect={() => {
                    setSelected(option)
                    setOpen(false)
                  }}
                >
                  {option}

                  <Check
                    className={clsx(
                      'ml-auto h-4 w-4',
                      selected === option ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DropdownField
