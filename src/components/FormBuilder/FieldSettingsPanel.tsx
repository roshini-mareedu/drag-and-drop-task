import React from 'react'
import type { CanvasField } from './FormBuilder'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
} from '@/components/ui/command'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import CurrencySettings from '../settings/CurrencySettings'

interface FieldSettingsPanelProps {
  selectedField: CanvasField | null
  allFields: CanvasField[]
  onUpdateField: (updated: CanvasField) => void
  onSelectFieldById: (canvasId: string) => void
}

const FieldSettingsPanel: React.FC<FieldSettingsPanelProps> = ({
  selectedField,
  allFields,
  onUpdateField,
  onSelectFieldById,
}) => {
  if (!selectedField) {
    return (
      <div className="p-4 h-full">
        <h2 className="font-semibold text-base">Field Settings</h2>
      </div>
    )
  }

  const props = selectedField.properties
  const labelProps = props.fieldLabelProperties

  const updateProp = (key: string, value: any) => {
    onUpdateField({
      ...selectedField,
      properties: { ...props, [key]: value },
    })
  }

  const updateLabelProp = (key: string, value: any) => {
    onUpdateField({
      ...selectedField,
      properties: {
        ...props,
        fieldLabelProperties: { ...labelProps, [key]: value },
      },
    })
  }
  const updateCurrencyProp = (key: string, value: any) => {
    onUpdateField({
      ...selectedField,
      properties: {
        ...props,
        [key]: value,
      },
    })
  }

  return (
    <div className="p-4 h-full text-sm overflow-y-auto">
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="properties" className="flex-1">
            Properties
          </TabsTrigger>

          <TabsTrigger value="formatting" className="flex-1">
            Formatting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="mt-4 space-y-4">
          <div className="bg-pink-100 rounded-lg p-4 space-y-2">
            <Label className="text-sm font-semibold">
              Field Label Properties
            </Label>
            <input
              className=" border rounded px-3 py-2 text-sm w-full  bg-white text-gray-800 focus:outline-none focus:ring-0"
              style={{ height: '38px' }}
              value={labelProps.fieldLabel || ''}
              onChange={(e) => updateLabelProp('fieldLabel', e.target.value)}
              placeholder="Enter field label"
            />
          </div>

          {'placeholder' in props && (
            <div className="bg-pink-100 rounded-lg p-4 space-y-2">
              <Label className="text-sm font-semibold">Placeholder</Label>

              <input
                className="border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-0 bg-white text-gray-800"
                style={{ height: '38px' }}
                value={props.placeholder || ''}
                onChange={(e) => updateProp('placeholder', e.target.value)}
                placeholder="Enter placeholder"
              />
            </div>
          )}

          {selectedField.fieldType === 'currency' && (
            <CurrencySettings
              field={selectedField}
              update={updateCurrencyProp}
            />
          )}

          <div className="bg-pink-100 rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-semibold text-black">Settings</h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={props.required || false}
                onChange={(e) => updateProp('required', e.target.checked)}
                className="h-5 w-5 accent-pink-500"
                style={{ cursor: 'pointer' }}
              />

              <span className="text-sm font-medium">Required Field</span>
            </label>
          </div>
        </TabsContent>

        <TabsContent value="formatting" className="mt-4 space-y-4">
          <div className="border rounded-xl p-4 space-y-4 bg-pink-50">
            <h3 className="text-xs font-semibold uppercase text-gray-500">
              Field Label Styling
            </h3>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Color</Label>

              <Popover>
                <PopoverTrigger className="w-full h-8 border rounded-md p-1 flex items-center justify-between text-xs">
                  {labelProps.color}
                  <div
                    className="w-5 h-5 rounded-md border"
                    style={{ background: labelProps.color }}
                  />
                </PopoverTrigger>

                <PopoverContent className="w-64 p-0">
                  <Command>
                    <CommandInput placeholder="Search color..." />
                    <CommandGroup>
                      {[
                        '#000000',
                        '#333333',
                        '#555555',
                        '#888888',
                        '#ffffff',
                        '#e91e63',
                        '#ff9800',
                        '#4caf50',
                        '#2196f3',
                        '#9c27b0',
                      ].map((clr) => (
                        <CommandItem
                          key={clr}
                          value={clr}
                          onSelect={() => updateLabelProp('color', clr)}
                        >
                          <div
                            className="w-4 h-4 rounded-full border mr-2"
                            style={{ background: clr }}
                          />
                          {clr}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-xs">Font Size</Label>

              <Select
                value={labelProps.fontsize}
                onValueChange={(val) => updateLabelProp('fontsize', val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28].map(
                    (size) => (
                      <SelectItem key={size} value={`${size}px`}>
                        {size}px
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-xs">Font Family</Label>

              <Select
                value={labelProps.fontFamily}
                onValueChange={(val) => updateLabelProp('fontFamily', val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Arial',
                    'Inter',
                    'Roboto',
                    'Poppins',
                    'Montserrat',
                    'Georgia',
                    'Times New Roman',
                  ].map((font) => (
                    <SelectItem value={font} key={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-xs">Alignment</Label>

              <div className="flex gap-2">
                <button
                  onClick={() => updateLabelProp('textAlign', 'left')}
                  className={`border rounded-md p-2 ${labelProps.textAlign === 'left' ? 'bg-pink-300' : ''}`}
                >
                  L
                </button>
                <button
                  onClick={() => updateLabelProp('textAlign', 'center')}
                  className={`border rounded-md p-2 ${labelProps.textAlign === 'center' ? 'bg-pink-300' : ''}`}
                >
                  C
                </button>

                <button
                  onClick={() => updateLabelProp('textAlign', 'right')}
                  className={`border rounded-md p-2 ${labelProps.textAlign === 'right' ? 'bg-pink-300' : ''}`}
                >
                  R
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FieldSettingsPanel
