import { Input } from '../ui/input'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}

const InitialField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties

  return (
    <div className="flex flex-col">
      {labelProps?.showFieldLabel && (
        <label
          className="mb-1"
          style={{
            color: labelProps.color,
            fontSize: labelProps.fontsize,
            fontFamily: labelProps.fontFamily,
            textAlign: labelProps.textAlign,
          }}
        >
          {labelProps.fieldLabel}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Input
        type="text"
        maxLength={3}
        placeholder={props.placeholder}
        defaultValue={props.value}
        required={props.required}
        className="border border-gray-300 rounded px-2 py-1 w-24 text-center uppercase"
        onInput={(e) => {
          const input = e.currentTarget
          input.value = input.value.toUpperCase()
        }}
      />
    </div>
  )
}

export default InitialField
