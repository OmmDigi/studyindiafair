import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, Loader2, Plus, Trash2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { fileUrl, uploadFile } from '@/lib/upload'
import { upcomingEventService } from '@/services/upcoming-event.service'
import type { UpcomingEvent } from '@/types/upcoming-event'

const UPLOAD_FOLDER = 'upcoming-events'
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5
const MAX_IMAGES = 30

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  slug: z
    .string()
    .trim()
    .max(120)
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*)?$/, 'Only lowercase letters, numbers and hyphens'),
  images: z.array(z.object({ path: z.string(), alt_text: z.string().max(250) })).max(MAX_IMAGES),
  schedules: z
    .array(
      z.object({
        location: z.string().trim().min(1, 'Location is required').max(200),
        date: z.string().trim().min(1, 'Date is required').max(120),
      })
    )
    .min(1, 'Add at least one location and date'),
  is_active: z.boolean(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  event: UpcomingEvent | null
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function EventFormDialog({ open, event, onOpenChange, onSaved }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(0)
  const pending = usePendingUploads()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: event
      ? {
          name: event.name,
          slug: event.slug,
          images: event.images.map((i) => ({ path: i.path, alt_text: i.alt_text ?? '' })),
          schedules: event.schedules,
          is_active: event.is_active,
        }
      : { name: '', slug: '', images: [], schedules: [{ location: '', date: '' }], is_active: true },
  })

  const images = useFieldArray({ control, name: 'images' })
  const schedules = useFieldArray({ control, name: 'schedules' })

  const addImages = async (files: FileList | null) => {
    const list = Array.from(files ?? [])
    if (inputRef.current) inputRef.current.value = ''
    if (!list.length) return
    const room = MAX_IMAGES - images.fields.length
    if (list.length > room) toast.error(`Only ${MAX_IMAGES} images allowed`)
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
        images.append({ path: result.url, alt_text: '' })
      } catch (error) {
        toast.error(`${file.name}: ${getErrorMessage(error)}`)
      } finally {
        setUploading((n) => n - 1)
      }
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      slug: values.slug || undefined,
      images: values.images.map((i) => ({ path: i.path, alt_text: i.alt_text.trim() || null })),
    }
    try {
      const saved = event
        ? await upcomingEventService.update(event.id, { ...payload, slug: payload.slug ?? event.slug })
        : await upcomingEventService.create(payload)
      pending.commit(saved.images.map((i) => i.path))
      toast.success(event ? 'Event updated' : 'Event created')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Upcoming Event' : 'New Upcoming Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="event-name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input id="event-name" {...register('name')} />
              <p className="text-xs text-muted-foreground">Also used as the page name.</p>
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-slug">Slug</Label>
              <Input id="event-slug" placeholder="Auto-generated from name if empty" {...register('slug')} />
              <p className="text-xs text-muted-foreground">Also used as the page slug.</p>
              {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Images</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={images.fields.length >= MAX_IMAGES}
                onClick={() => inputRef.current?.click()}
              >
                <ImagePlus /> Add Images
              </Button>
            </div>
            <input
              ref={inputRef}
              type="file"
              hidden
              multiple
              accept={ACCEPT.join(',')}
              onChange={(e) => addImages(e.target.files)}
            />
            {images.fields.length || uploading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.fields.map((field, i) => (
                  <div key={field.id} className="space-y-1">
                    <div className="relative aspect-square">
                      <img src={fileUrl(field.path)!} alt="" className="size-full rounded-md border object-cover" />
                      <Button
                        type="button"
                        size="icon-xs"
                        variant="secondary"
                        className="absolute -top-2 -right-2"
                        title="Remove image"
                        onClick={() => images.remove(i)}
                      >
                        <X />
                      </Button>
                    </div>
                    <Input placeholder="Alt text" maxLength={250} {...register(`images.${i}.alt_text`)} />
                  </div>
                ))}
                {Array.from({ length: uploading }, (_, i) => (
                  <div
                    key={`uploading-${i}`}
                    className="flex aspect-square items-center justify-center rounded-md border border-dashed text-muted-foreground"
                  >
                    <Loader2 className="size-5 animate-spin" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                {ACCEPT.map((t) => t.split('/')[1].toUpperCase()).join(', ')}, max {MAX_SIZE_MB}MB each, up to{' '}
                {MAX_IMAGES} images
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                Locations & Dates <span className="text-destructive">*</span>
              </Label>
              <Button type="button" size="sm" variant="outline" onClick={() => schedules.append({ location: '', date: '' })}>
                <Plus /> Add Row
              </Button>
            </div>
            {schedules.fields.map((field, i) => (
              <div key={field.id} className="flex items-start gap-2">
                <div className="flex-1 space-y-1">
                  <Input placeholder="Location, e.g. New Delhi" {...register(`schedules.${i}.location`)} />
                  {errors.schedules?.[i]?.location && (
                    <p className="text-sm text-destructive">{errors.schedules[i].location.message}</p>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <Input placeholder="Date, e.g. 12-13 Oct 2026" {...register(`schedules.${i}.date`)} />
                  {errors.schedules?.[i]?.date && (
                    <p className="text-sm text-destructive">{errors.schedules[i].date.message}</p>
                  )}
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  title="Remove row"
                  disabled={schedules.fields.length <= 1}
                  onClick={() => schedules.remove(i)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            {errors.schedules?.root && <p className="text-sm text-destructive">{errors.schedules.root.message}</p>}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="event-active">Active</Label>
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => <Switch id="event-active" checked={field.value} onCheckedChange={field.onChange} />}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting || uploading > 0}>
              {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
