import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/context/auth-context'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { upcomingEventService } from '@/services/upcoming-event.service'
import type { EventImage, UpcomingEvent } from '@/types/upcoming-event'
import { EventImagesField, MAX_IMAGES } from './event-images-field'

const imageList = z
  .array(z.object({ path: z.string(), alt_text: z.string().max(250) }))
  .max(MAX_IMAGES, `Up to ${MAX_IMAGES} images allowed`)

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  slug: z
    .string()
    .trim()
    .max(120)
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*)?$/, 'Only lowercase letters, numbers and hyphens'),
  images: imageList,
  banner_images: imageList,
  schedules: z
    .array(
      z.object({
        location: z.string().trim().min(1, 'Location is required').max(200),
        date: z.string().trim().min(1, 'Date is required').max(120),
      }),
    )
    .min(1, 'Add at least one location and date'),
  is_active: z.boolean(),
})

export type FormValues = z.infer<typeof schema>

const toField = (i: EventImage) => ({
  path: i.path,
  alt_text: i.alt_text ?? '',
})
const toPayload = (i: { path: string; alt_text: string }) => ({
  path: i.path,
  alt_text: i.alt_text.trim() || null,
})

type Props = {
  open: boolean
  event: UpcomingEvent | null
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function EventFormDialog({ open, event, onOpenChange, onSaved }: Props) {
  const [uploading, setUploading] = useState(0)
  const pending = usePendingUploads()
  const { isAdmin } = useAuth()

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
          images: event.images.map(toField),
          banner_images: (event.banner_images ?? []).map(toField),
          schedules: event.schedules,
          is_active: event.is_active,
        }
      : {
          name: '',
          slug: '',
          images: [],
          banner_images: [],
          schedules: [{ location: '', date: '' }],
          is_active: true,
        },
  })

  const schedules = useFieldArray({ control, name: 'schedules' })
  const imageFieldProps = {
    control,
    register,
    errors,
    onTrack: pending.track,
    onUploadingChange: (delta: number) => setUploading((n) => n + delta),
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      slug: values.slug || undefined,
      images: values.images.map(toPayload),
      banner_images: values.banner_images.map(toPayload),
    }
    try {
      const saved = event
        ? await upcomingEventService.update(event.id, {
            ...payload,
            slug: payload.slug ?? event.slug,
          })
        : await upcomingEventService.create(payload)
      pending.commit([...saved.images, ...saved.banner_images].map((i) => i.path))
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
              <Input
                id="event-slug"
                placeholder="Auto-generated from name if empty"
                readOnly={!isAdmin}
                {...register('slug')}
              />
              <p className="text-xs text-muted-foreground">
                {isAdmin ? 'Also used as the page slug.' : 'Only admins can change the slug.'}
              </p>
              {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
            </div>
          </div>

          <EventImagesField
            name="images"
            label="Square Images (1:1)"
            hint="Recommended 1000 × 1000 px, used on mobile"
            aspect={1}
            outputWidth={1200}
            gridClassName="grid-cols-2 sm:grid-cols-5"
            {...imageFieldProps}
          />

          <EventImagesField
            name="banner_images"
            label="Banner Images (12:5)"
            hint="Recommended 1200 × 500 px, used on large screens"
            aspect={12 / 5}
            outputWidth={1920}
            gridClassName="grid-cols-1 sm:grid-cols-2"
            {...imageFieldProps}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                Locations & Dates <span className="text-destructive">*</span>
              </Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => schedules.append({ location: '', date: '' })}
              >
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
              render={({ field }) => (
                <Switch id="event-active" checked={field.value} onCheckedChange={field.onChange} />
              )}
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
