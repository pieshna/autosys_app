'use client'
import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface DroppableProps {
  id: string
  name: string
  children: ReactNode
}

export function Droppable({ id, name, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id
  })
  const style = {
    opacity: isOver ? 1 : 0.75
  }

  return (
    <div
      className="flex flex-col p-4 bg-red-200 rounded w-64 gap-2 h-[70vh] overflow-y-auto"
      ref={setNodeRef}
      style={style}
    >
      <h2 className="text-center font-semibold uppercase pb-2">{name}</h2>
      {children}
    </div>
  )
}
export default Droppable
