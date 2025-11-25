import { Input } from '@/components/ui/input'
import { Label } from '../ui/label'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}
const TimeField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

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
      <Input
        type="time"
        step={props.timeFormat === '24' ? 60 : undefined}
        placeholder={props.placeholder || 'Select Time'}
        defaultValue={props.value}
        required={props.required}
      />
    </div>
  )
}

export default TimeField
