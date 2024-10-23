'use client'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Draggable from './Draggable'
import Droppable from './Droppable'

interface WrapperDnDProps {
  contents: string[]
  submit: (data: any) => void
  data: any[]
  keyShow: string[]
  textSlotDisponible?: string
}

function WrapperDnD({
  contents,
  submit,
  data,
  keyShow = [],
  textSlotDisponible = 'Disponible'
}: WrapperDnDProps) {
  const [items, setItems] = useState(data ?? [])
  const [droppableCount, setDroppableCount] = useState<string[]>(contents)

  useEffect(() => {
    setDroppableCount(contents)
  }, [contents])

  useEffect(() => {
    setItems(data ?? [])
  }, [data])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === active.id
          ? { ...item, parent: over ? over.id : null }
          : item
      )
    )
  }

  const showKeys = (item: any) => {
    //unir y mostrar datos de la lista
    if (keyShow.length === 0) return 'No se han definido keys'
    return keyShow.map((key) => item[key]).join(' ')
  }

  return (
    <>
      <div className="flex w-full flex-grow">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col m-auto p-4 bg-gray-400 gap-2 rounded shadow-xl w-80 max-w-96 h-[70vh] overflow-y-auto">
            <h2 className="text-center font-semibold uppercase pb-2">
              {textSlotDisponible}
            </h2>
            <div className="flex flex-col gap-4 items-center w-full justify-center my-auto px-2">
              {items.map((item: any) =>
                !item['parent'] ? (
                  <Draggable key={item.id} id={item.id}>
                    {showKeys(item)}
                  </Draggable>
                ) : null
              )}
            </div>
          </div>

          <div className="m-auto flex gap-4 justify-center">
            {droppableCount.map((name, index) => (
              <Droppable key={index} id={name} name={name}>
                {items
                  .filter((item: any) => item['parent'] === name)
                  .map((item) => (
                    <div className="flex" key={item.id}>
                      <Draggable id={item.id}>{showKeys(item)}</Draggable>
                    </div>
                  )) ?? 'No items'}
              </Droppable>
            ))}
          </div>
        </DndContext>
      </div>
      <div className="flex justify-between">
        <Button href="/trabajos" as={Link}>
          Volver
        </Button>
        <Button color="success" onClick={() => submit && submit(items)}>
          Guardar
        </Button>
      </div>
    </>
  )
}

export default WrapperDnD
