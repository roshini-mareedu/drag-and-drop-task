// import { useDroppable } from "@dnd-kit/core";
// import FieldRenderer from "./FieldRenderer";

// const Canvas = ({ droppedFields }: any) => {
//   const { setNodeRef } = useDroppable({ id: "canvas-dropzone" });

//   return (
//     <div
//       ref={setNodeRef}
//       className="w-full min-h-[500px] border-2 border-dashed rounded p-4"
//     >
//       {droppedFields.length === 0 && (
//         <p className="text-gray-400">Drag fields here...</p>
//       )}

//       {droppedFields.map((f : any) => (
//         <div key={f.fieldId} className="mb-3">
//           <FieldRenderer field={f} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Canvas;

// import { useDroppable } from "@dnd-kit/core";
// import FieldWrapper from "./FieldWrapper";

// const Canvas = ({ droppedFields, onDelete }) => {
//   const { setNodeRef, isOver } = useDroppable({ id: "canvas-dropzone" });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`
//         min-h-[600px]
//         p-6
//         border-2
//         rounded-xl
//         transition
//         ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}
//       `}
//     >
//       {droppedFields.length === 0 && (
//         <p className="text-gray-400 text-center mt-20">
//           Drag fields here to start building your form
//         </p>
//       )}

//       {droppedFields.map((field) => (
//         <FieldWrapper
//           key={field.canvasId}
//           field={field}
//           onDelete={() => onDelete(field.canvasId)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Canvas;

import { useDroppable } from '@dnd-kit/core'
import FieldWrapper from './FieldWrapper'

const Canvas = ({ droppedFields, onDelete }: any) => {
  const { setNodeRef } = useDroppable({ id: 'canvas-dropzone' })

  return (
    <div
      ref={setNodeRef}
      className="min-h-[600px] p-6 border-2 border-gray-300 rounded-xl bg-gray-50"
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
