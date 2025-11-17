import { useDraggable } from "@dnd-kit/core";

const DraggableItem = ({ field } : any) => {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: field.fieldId,
    data: { field },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="
        bg-white 
        border border-gray-300 
        hover:border-gray-800 
        rounded-md 
        px-3 py-2 mb-2 cursor-grab 
        shadow-sm 
        hover:shadow-md 
        transition
      "
    >
      {field.properties.label}
    </div>
  );
};

export default DraggableItem;
