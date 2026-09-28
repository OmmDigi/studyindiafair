import { useState, type DragEvent } from 'react'

export function useFieldDrag(move: (from: number, to: number) => void) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [armed, setArmed] = useState<number | null>(null)

  const itemProps = (index: number) => ({
    draggable: armed === index,
    'data-dragging': dragIndex === index || undefined,
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.effectAllowed = 'move'
      setDragIndex(index)
    },
    onDragOver: (e: DragEvent) => {
      if (dragIndex === null) return
      e.preventDefault()
      if (dragIndex === index) return
      move(dragIndex, index)
      setDragIndex(index)
    },
    onDrop: (e: DragEvent) => e.preventDefault(),
    onDragEnd: () => {
      setDragIndex(null)
      setArmed(null)
    },
  })

  const handleProps = (index: number) => ({
    onPointerDown: () => setArmed(index),
    onPointerUp: () => setArmed(null),
  })

  return { itemProps, handleProps }
}
