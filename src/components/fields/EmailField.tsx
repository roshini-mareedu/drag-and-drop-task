import { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
interface Field {
  fieldId: string
  fieldType: string
  properties: any
}

const EmailField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  const [value, setValue] = useState(props.value || '')

  return (
    <div className="flex flex-col w-full">
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
        type="email"
        placeholder={props.placeholder}
        required={props.required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          fontSize: props.fontsize,
          fontFamily: props.fontFamily,
          fontWeight: props.fontWeight,
          fontStyle: props.fontStyle,
          textAlign: props.textAlign,
          color: props.color,
        }}
        className="border border-gray-300 rounded px-2 py-1"
      />
    </div>
  )
}

export default EmailField
