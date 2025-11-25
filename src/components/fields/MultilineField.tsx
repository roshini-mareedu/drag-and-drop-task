import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '../ui/label'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}
const MultilineField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  const [value, setValue] = useState(props.value || '')

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
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

      <Textarea
        placeholder={props.placeholder}
        required={props.required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        className="resize-none"
        style={{
          color: props.color,
          fontSize: props.fontsize,
          fontFamily: props.fontFamily,
          fontWeight: props.fontWeight,
          fontStyle: props.fontStyle,
        }}
      />
    </div>
  )
}

export default MultilineField
