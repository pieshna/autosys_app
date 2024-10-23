'use client'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface DraggableProps {
  children: ReactNode
  id: string
}

// Componente para manejar el portal durante el arrastre
const DraggablePortal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.body)
}

function Draggable({ children, id }: DraggableProps) {
  // Estado para controlar si está siendo arrastrado
  const [isDragging, setIsDragging] = useState(false)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  })

  useEffect(() => {
    if (attributes['aria-pressed']) {
      setIsDragging(true)
    } else {
      setIsDragging(false)
    }
  }, [attributes])

  // Estilos del elemento arrastrable
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 9999 : 'auto',
    cursor: 'grab',
    position: isDragging ? 'absolute' : 'relative' // Cambio a 'absolute' durante el arrastre
  }

  // Contenido del draggable que se renderiza en el portal si está arrastrando
  const draggableContent = (
    <div
      ref={setNodeRef}
      id={id}
      className="bg-cyan-200 p-2 rounded border w-full max-w-64 text-center z-50"
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )

  // Si se está arrastrando, renderiza en un portal
  return isDragging ? (
    <DraggablePortal>{draggableContent}</DraggablePortal>
  ) : (
    draggableContent
  )
}

export default Draggable
