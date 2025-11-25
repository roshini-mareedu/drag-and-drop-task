import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}
const MyInitialField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  const [value, setValue] = useState(props.value || '')

  return (
    <div className="flex flex-col w-full gap-2">
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

      <Input
        maxLength={3}
        value={value}
        required={props.required}
        placeholder={props.placeholder || '___'}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        style={{
          fontSize: props.fontsize,
          fontFamily: props.fontFamily,
          color: props.color,
          textAlign: props.textAlign,
        }}
        className="w-24 text-center tracking-widest"
      />
    </div>
  )
}

export default MyInitialField
