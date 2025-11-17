import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import DraggableItem from './DraggableItem'
import Canvas from './Canvas'


const FormBuilder = ({ fields }: any) => {
  const [canvasFields, setCanvasFields] = useState([])

  const handleDragEnd = (event: any) => {
    if (event.over?.id === 'canvas-dropzone') {
      const field = event.active.data.current.field

      const newField = {
        ...field,
        canvasId: crypto.randomUUID(),
      }

      setCanvasFields((prev) => [...prev, newField])
    }
  }
 
  const handleDelete = (id: any) => {
    setCanvasFields((prev) => prev.filter((f) => f.canvasId !== id))
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6">
        <div className="w-1/3 bg-gray-300 p-4 rounded-xl shadow-sm">
          <h2 className="font-bold text-xl mb-4">Fields</h2>
          <div className="grid grid-cols-2 gap-3">
            {fields.map((field: any) => (
              <DraggableItem key={field.fieldId} field={field} />
            ))}
          </div>
        </div>
        <div className="w-2/3">
          <Canvas droppedFields={canvasFields} onDelete={handleDelete} />
        </div>
      </div>
    </DndContext>
  )
}

export default FormBuilder
