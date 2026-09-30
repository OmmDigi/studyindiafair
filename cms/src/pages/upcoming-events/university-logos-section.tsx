import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Copy, GripVertical, ImagePlus, Loader2, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { fileUrl, uploadFile } from '@/lib/upload'
import { upcomingEventService } from '@/services/upcoming-event.service'
import type { EventLogo, UpcomingEvent } from '@/types/upcoming-event'
import { ImportLogosDialog } from './import-logos-dialog'

const UPLOAD_FOLDER = 'university-logos'
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
const MAX_SIZE_MB = 2
const MAX_LOGOS = 300

const schema = z.object({
  logos: z
    .array(
      z.object({
        path: z.string(),
        alt_text: z.string().max(250),
        link: z
          .string()
          .trim()
          .max(1000)
          .refine((v) => !v || /^https?:\/\/\S+\.\S+/i.test(v), 'Enter a valid http(s) URL'),
      })
    )
    .max(MAX_LOGOS),
})

type FormValues = z.infer<typeof schema>

const logoKey = (l: { path: string; link: string | null }) => `${l.path}|${(l.link ?? '').trim()}`

type Props = {
  open: boolean
  event: UpcomingEvent
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function UniversityLogosDialog({ open, event, onOpenChange, onSaved }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(0)
  const [importOpen, setImportOpen] = useState(false)
  const [importKey, setImportKey] = useState(0)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const pending = usePendingUploads()

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      logos: event.university_logos.map((l) => ({ path: l.path, alt_text: l.alt_text ?? '', link: l.link ?? '' })),
    },
  })

  const logos = useFieldArray({ control, name: 'logos' })
  const { data: events = [] } = useQuery({
    queryKey: ['upcoming-events', {}],
    queryFn: () => upcomingEventService.list({}),
    enabled: importOpen,
  })
  const sources = events.filter((e) => e.id !== event.id && e.university_logos.length > 0)

  const addFiles = async (files: FileList | null) => {
    const list = Array.from(files ?? [])
    if (inputRef.current) inputRef.current.value = ''
    const room = MAX_LOGOS - logos.fields.length
    if (list.length > room) toast.error(`Only ${MAX_LOGOS} logos allowed`)
    const valid = list.slice(0, Math.max(room, 0)).filter((file) => {
      if (!ACCEPT.includes(file.type)) toast.error(`${file.name}: unsupported type`)
      else if (file.size > MAX_SIZE_MB * 1024 * 1024) toast.error(`${file.name}: larger than ${MAX_SIZE_MB}MB`)
      else return true
      return false
    })
    setUploading((n) => n + valid.length)
    for (const file of valid) {
      try {
        const result = await uploadFile(file, UPLOAD_FOLDER)
        pending.track(result.url)
        logos.append({ path: result.url, alt_text: file.name.replace(/\.[^.]+$/, ''), link: '' })
      } catch (error) {
        toast.error(`${file.name}: ${getErrorMessage(error)}`)
      } finally {
        setUploading((n) => n - 1)
      }
    }
  }

  const importLogos = (incoming: EventLogo[]) => {
    const seen = new Set(getValues('logos').map(logoKey))
    const fresh = incoming.filter((l) => {
      const key = logoKey(l)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    const room = MAX_LOGOS - logos.fields.length
    const added = fresh.slice(0, Math.max(room, 0))
    logos.append(added.map((l) => ({ path: l.path, alt_text: l.alt_text ?? '', link: l.link ?? '' })))
    const skipped = incoming.length - added.length
    toast.success(`${added.length} logo${added.length === 1 ? '' : 's'} imported${skipped ? `, ${skipped} skipped` : ''}`)
    setImportOpen(false)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async ({ logos: values }: FormValues) => {
    try {
      const saved = await upcomingEventService.updateLogos(
        event.id,
        values.map((l) => ({ path: l.path, alt_text: l.alt_text.trim() || null, link: l.link.trim() || null }))
      )
      pending.commit(saved.university_logos.map((l) => l.path))
      toast.success('University logos saved')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>University Logos</DialogTitle>
          <DialogDescription>{event.name}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            {logos.fields.length} logo{logos.fields.length === 1 ? '' : 's'}. Drag rows to reorder.
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setImportKey((k) => k + 1)
                setImportOpen(true)
              }}
            >
              <Copy /> Import from Event
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={logos.fields.length >= MAX_LOGOS}
              onClick={() => inputRef.current?.click()}
            >
              <ImagePlus /> Upload Logos
            </Button>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept={ACCEPT.join(',')}
          onChange={(e) => addFiles(e.target.files)}
        />

        <form id="logos-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {!logos.fields.length && !uploading && (
            <p className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
              No logos yet. Upload logos ({ACCEPT.map((t) => t.split('/')[1].split('+')[0].toUpperCase()).join(', ')}, max{' '}
              {MAX_SIZE_MB}MB each) or import them from another event.
            </p>
          )}
          {logos.fields.map((field, i) => (
            <div
              key={field.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move'
                setDragIndex(i)
              }}
              onDragOver={(e) => {
                if (dragIndex === null) return
                e.preventDefault()
                if (dragIndex !== i) {
                  logos.move(dragIndex, i)
                  setDragIndex(i)
                }
              }}
              onDrop={(e) => e.preventDefault()}
              onDragEnd={() => setDragIndex(null)}
              className={`flex items-start gap-2 rounded-md border p-2 ${dragIndex === i ? 'opacity-40' : ''}`}
            >
              <GripVertical className="mt-5 size-4 shrink-0 cursor-grab text-muted-foreground" />
              <img
                src={fileUrl(field.path)!}
                alt=""
                draggable={false}
                className="size-14 shrink-0 rounded border bg-white object-contain p-1"
              />
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <Input placeholder="Alt text" maxLength={250} {...register(`logos.${i}.alt_text`)} />
                <div className="space-y-1">
                  <Input placeholder="Link, e.g. https://university.edu" {...register(`logos.${i}.link`)} />
                  {errors.logos?.[i]?.link && <p className="text-sm text-destructive">{errors.logos[i].link.message}</p>}
                </div>
              </div>
              <Button type="button" size="icon" variant="ghost" title="Remove" onClick={() => logos.remove(i)}>
                <Trash2 />
              </Button>
            </div>
          ))}
          {uploading > 0 && (
            <div className="flex items-center gap-2 rounded-md border border-dashed p-3 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Uploading {uploading} logo{uploading === 1 ? '' : 's'}...
            </div>
          )}
        </form>

        <DialogFooter>
          <Button type="submit" form="logos-form" disabled={isSubmitting || uploading > 0}>
            {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>

        <ImportLogosDialog
          key={importKey}
          open={importOpen}
          sources={sources}
          onOpenChange={setImportOpen}
          onImport={importLogos}
        />
      </DialogContent>
    </Dialog>
  )
}
