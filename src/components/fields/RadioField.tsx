import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '../ui/label'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}
const RadioField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  const [selected, setSelected] = useState(props.value || '')

  return (
    <div className="flex flex-col gap-1">
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

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="flex gap-4"
      >
        {props.options?.map((option: string, index: number) => (
          <Label
            key={index}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <RadioGroupItem
              value={option}
              id={`${field.fieldId}-${index}`}
              required={props.required}
            />
            <span>{option}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}

export default RadioField
