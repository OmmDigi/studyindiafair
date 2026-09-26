import { Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fileUrl } from '@/lib/upload'
import type { EventLogo, UpcomingEvent } from '@/types/upcoming-event'

type Props = {
  open: boolean
  sources: UpcomingEvent[]
  onOpenChange: (open: boolean) => void
  onImport: (logos: EventLogo[]) => void
}

export function ImportLogosDialog({ open, sources, onOpenChange, onImport }: Props) {
  const [sourceId, setSourceId] = useState<number | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const source = sources.find((e) => e.id === sourceId)
  const logos = source?.university_logos ?? []
  const allSelected = logos.length > 0 && selected.size === logos.length

  const pickSource = (id: string) => {
    const next = sources.find((e) => e.id === Number(id))
    setSourceId(Number(id))
    setSelected(new Set(next?.university_logos.map((_, i) => i)))
  }

  const toggle = (i: number) =>
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import University Logos</DialogTitle>
          <DialogDescription>Copy logos from another event. Duplicates are skipped.</DialogDescription>
        </DialogHeader>

        {!sources.length ? (
          <p className="text-sm text-muted-foreground">No other event has university logos yet.</p>
        ) : (
          <Select value={sourceId ? String(sourceId) : ''} onValueChange={pickSource}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {sources.map((e) => (
                <SelectItem key={e.id} value={String(e.id)}>
                  {e.name} ({e.university_logos.length})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {!!logos.length && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {selected.size} of {logos.length} selected
              </span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setSelected(allSelected ? new Set() : new Set(logos.map((_, i) => i)))}
              >
                {allSelected ? 'Clear all' : 'Select all'}
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {logos.map((logo, i) => (
                <button
                  key={`${logo.path}-${i}`}
                  type="button"
                  title={logo.alt_text ?? logo.link ?? undefined}
                  onClick={() => toggle(i)}
                  className={cn(
                    'relative aspect-square rounded-md border bg-white p-2 transition-opacity',
                    selected.has(i) ? 'ring-2 ring-primary' : 'opacity-50'
                  )}
                >
                  <img src={fileUrl(logo.path)!} alt={logo.alt_text ?? ''} className="size-full object-contain" />
                  {selected.has(i) && (
                    <Check className="absolute top-1 right-1 size-4 rounded-full bg-primary p-0.5 text-primary-foreground" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        <DialogFooter>
          <Button
            type="button"
            disabled={!selected.size}
            onClick={() => onImport(logos.filter((_, i) => selected.has(i)))}
          >
            Import {selected.size || ''} logo{selected.size === 1 ? '' : 's'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
