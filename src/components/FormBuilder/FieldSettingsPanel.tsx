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
import DateSettings from '../settings/DateSettings'
import ListSettings from '../settings/ListSettings'
import FixedTimeSettings from '../settings/FixedTimeSettings'
import Left from '@/assets/Left'
import Center from '@/assets/Center'
import Right from '@/assets/Right'

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

  const updateDateProp = (newDate: Date) => {
    const formatted = newDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })

    onUpdateField({
      ...selectedField,
      properties: {
        ...props,
        value: formatted,
        displayValue: formatted,
        timestamp: newDate.getTime(),
      },
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

  const updateNestedProp = (parentKey: string, key: string, value: any) => {
    onUpdateField({
      ...selectedField,
      properties: {
        ...props,
        [parentKey]: {
          ...props[parentKey as keyof typeof props],
          [key]: value,
        },
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

          {selectedField.fieldType === 'currency' && (
            <CurrencySettings
              field={selectedField}
              update={updateCurrencyProp}
            />
          )}
          {selectedField.fieldType === 'date' && (
            <DateSettings field={selectedField} updateDate={updateDateProp} />
          )}
          {selectedField.fieldType === 'list' && (
            <ListSettings field={selectedField} update={updateProp} />
          )}
          {selectedField.fieldType === 'fixed_time' && (
            <FixedTimeSettings field={selectedField} update={updateProp} />
          )}
          {selectedField.fieldType === 'time_range' && (
            <div className="bg-pink-50 p-4 rounded-lg space-y-2 text-sm">
              <Label>Time Format</Label>

              <Select
                value={props.timeFormat}
                onValueChange={(val) => updateProp('timeFormat', val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12-hour format (AM/PM)</SelectItem>
                  <SelectItem value="24">24-hour format</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {'maskFieldValue' in props && (
            <div className="bg-pink-100 rounded-lg p-4 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.maskFieldValue}
                  onChange={(e) =>
                    updateProp('maskFieldValue', e.target.checked)
                  }
                />
                <span className="text-sm font-medium">Mask Field Value</span>
              </label>
            </div>
          )}
          {'splitMode' in props && (
            <div className="bg-pink-100 rounded-lg p-4 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.splitMode}
                  onChange={(e) => updateProp('splitMode', e.target.checked)}
                />
                <span className="text-sm font-medium">Enable Split Mode</span>
              </label>
              {props.splitMode && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Box Count</Label>
                    <input
                      type="number"
                      value={props.splitBoxes.count}
                      onChange={(e) =>
                        updateNestedProp('splitBoxes', 'count', +e.target.value)
                      }
                      className="border px-2 py-1 text-xs rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* <TabsContent value="formatting" className="mt-4 space-y-4">
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
          </div>
        </TabsContent> */}
        <TabsContent value="formatting" className="mt-4 space-y-4">
          <div className="bg-pink-100 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-base text-black">
              Field Label Styling
            </h3>

            {/* top row - COLOR + FONT SIZE */}
            <div className="grid grid-cols-2 gap-4">
              {/* COLOR */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Color</Label>

                <Popover>
                  <PopoverTrigger className="w-full h-10 border bg-white rounded px-2 flex items-center justify-between">
                    {labelProps.color}
                    <div
                      className="w-6 h-6 border rounded"
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

              {/* FONT SIZE */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Font Size</Label>

                <Select
                  value={labelProps.fontsize}
                  onValueChange={(val) => updateLabelProp('fontsize', val)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {[10, 11, 12, 13, 14, 16, 18, 20, 22, 24].map((size) => (
                      <SelectItem key={size} value={`${size}px`}>
                        {size}px
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* second row FONT FAMILY + LABEL ALIGN*/}
            <div className="grid grid-cols-2 gap-4">
              {/* font family */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Font Family</Label>

                <Select
                  value={labelProps.fontFamily}
                  onValueChange={(val) => updateLabelProp('fontFamily', val)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {[
                      'Arial',
                      'Roboto',
                      'Inter',
                      'Poppins',
                      'Montserrat',
                      'Georgia',
                      'Times New Roman',
                    ].map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Label Alignment</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`h-7 w-7 rounded-md border flex items-center justify-center
            ${
              labelProps.textAlign === 'left'
                ? 'bg-pink-600 text-white border-pink-600'
                : 'bg-white'
            }`}
                    onClick={() => updateLabelProp('textAlign', 'left')}
                  >
                    <Left />
                  </button>
                  <button
                    type="button"
                    className={`h-7 w-7 rounded-md border flex items-center justify-center
            ${
              labelProps.textAlign === 'center'
                ? 'bg-pink-600 text-white border-pink-600'
                : 'bg-white'
            }`}
                    onClick={() => updateLabelProp('textAlign', 'center')}
                  >
                    <Center />
                  </button>
                  <button
                    type="button"
                    className={`h-7 w-7 rounded-md border flex items-center justify-center 
            ${
              labelProps.textAlign === 'right'
                ? 'bg-pink-600 text-white border-pink-600'
                : 'bg-white'
            }`}
                    onClick={() => updateLabelProp('textAlign', 'right')}
                  >
                    <Right />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FieldSettingsPanel
