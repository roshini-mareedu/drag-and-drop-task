import { useDroppable } from '@dnd-kit/core'
import FieldWrapper from './FieldWrapper'

const Canvas = ({ droppedFields, onDelete }: any) => {
  const { setNodeRef } = useDroppable({ id: 'canvas-dropzone' })

  return (
    <div
      ref={setNodeRef}
      className="min-h-[1200px] p-6 border-2 border-gray-300 rounded-xl bg-gray-50"
    >
      {droppedFields.length === 0 && (
        <p className="text-gray-400 text-center mt-20">
          Drag fields here to begin
        </p>
      )}
      <div className='grid grid-cols-2 gap-4'>
        {droppedFields.map((field: any) => (
          <FieldWrapper
            key={field.canvasId}
            field={field}
            onDelete={() => onDelete(field.canvasId)}
          />
        ))}
      </div>
    </div>
  )
}

export default Canvas
