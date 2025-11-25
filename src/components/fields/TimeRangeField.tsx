import { Label } from '../ui/label'
import TimeRangePopup from '../popups/TimeRangePopup'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}

const TimeRangeField = ({ field }: { field: Field }) => {
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

      <TimeRangePopup
        value={props.value}
        is24hr={props.timeFormat === '24'}
        onChange={(v) =>
          props.onExternalChange ? props.onExternalChange(v) : (props.value = v)
        }
      />
    </div>
  )
}

export default TimeRangeField
