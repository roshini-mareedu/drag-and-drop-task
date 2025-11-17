import { useState } from 'react'
import FieldRenderer from './FieldRenderer'
import { Trash2 } from 'lucide-react'

const FieldWrapper = ({ field, onDelete }: any) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`relative p-3 rounded-lg bg-white shadow-sm border transition 
                  ${hover ? 'border-gray-800 shadow-md' : 'border-gray-300'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <button
          onClick={onDelete}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
        >
          <Trash2 size={14} />
        </button>
      )}

      <FieldRenderer field={field} />
    </div>
  )
}

export default FieldWrapper
