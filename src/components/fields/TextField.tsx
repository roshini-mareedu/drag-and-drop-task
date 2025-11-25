import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '../ui/label'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}
const TextField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  const [value, setValue] = useState(props.value || '')

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

      {props.splitMode ? (
        <div className="flex gap-2">
          {Array.from({ length: props.splitBoxes.count }).map((_, idx) => (
            <Input
              key={idx}
              maxLength={1}
              value={value[idx] || ''}
              onChange={(e) => {
                const arr = value.split('')
                arr[idx] = e.target.value
                setValue(arr.join(''))
              }}
              className="text-center"
              style={{
                width: props.splitBoxes.width,
                height: props.splitBoxes.height,
                fontFamily: props.fontFamily,
                fontSize: props.fontsize,
              }}
            />
          ))}
        </div>
      ) : (
        <Input
          type={props.maskFieldValue ? 'password' : 'text'}
          placeholder={props.placeholder}
          required={props.required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            color: props.color,
            textAlign: props.textAlign,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            fontStyle: props.fontStyle,
            fontSize: props.fontsize,
          }}
        />
      )}
    </div>
  )
}

export default TextField
