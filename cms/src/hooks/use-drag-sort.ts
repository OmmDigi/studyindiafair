import { useState, type DragEvent } from 'react'

type Draft<T> = { source: T[]; order: T[]; dragging: number | null }

export function useDragSort<T extends { id: number }>(items: T[], onReorder: (ids: number[]) => void, enabled = true) {
  const [draft, setDraft] = useState<Draft<T> | null>(null)
  const active = draft && draft.source === items ? draft : null
  const list = active?.order ?? items

  const itemProps = (id: number) => ({
    draggable: enabled,
    'data-dragging': active?.dragging === id || undefined,
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.effectAllowed = 'move'
      setDraft({ source: items, order: list, dragging: id })
    },
    onDragOver: (e: DragEvent) => {
      if (active?.dragging == null) return
      e.preventDefault()
      if (active.dragging === id) return
      setDraft((d) => {
        if (!d || d.dragging == null) return d
        const next = [...d.order]
        const fromIndex = next.findIndex((i) => i.id === d.dragging)
        const toIndex = next.findIndex((i) => i.id === id)
        if (fromIndex < 0 || toIndex < 0) return d
        next.splice(toIndex, 0, next.splice(fromIndex, 1)[0])
        return { ...d, order: next }
      })
    },
    onDrop: (e: DragEvent) => e.preventDefault(),
    onDragEnd: () => {
      const ids = list.map((i) => i.id)
      if (ids.some((v, i) => v !== items[i]?.id)) {
        setDraft((d) => d && { ...d, dragging: null })
        onReorder(ids)
      } else setDraft(null)
    },
  })

  return { list, itemProps, reset: () => setDraft(null) }
}
