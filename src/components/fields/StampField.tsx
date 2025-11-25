import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '../ui/label'

interface Field {
  fieldId: string
  fieldType: string
  properties: any
}
const StampField = ({ field }: { field: Field }) => {
  const props = field.properties
  const labelProps = props.fieldLabelProperties
  const [stamp, setStamp] = useState(props.value || '')

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setStamp(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-2 w-full">
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

      {/* Stamp Display */}
      <div
        className="border border-dashed rounded flex justify-center items-center bg-muted"
        style={{ height: '140px' }}
      >
        {stamp ? (
          <img src={stamp} alt="Stamp" className="h-full object-contain" />
        ) : (
          <span className="text-muted-foreground text-sm">
            {props.placeholder || 'Upload Stamp'}
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <Input
        id={`stamp-${field.fieldId}`}
        type="file"
        accept="image/*"
        required={props.required}
        className="hidden"
        onChange={handleStampUpload}
      />

      {/* Button to open file picker */}
      <Button
        variant="secondary"
        onClick={() =>
          document.getElementById(`stamp-${field.fieldId}`)?.click()
        }
      >
        {stamp ? 'Replace Stamp' : 'Upload Stamp'}
      </Button>
    </div>
  )
}

export default StampField
