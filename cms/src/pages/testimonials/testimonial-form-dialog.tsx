import type { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Editor from '@/components/Editor'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { youtubeId } from '@/lib/youtube'
import { testimonialService } from '@/services/testimonial.service'
import { toEditorData, TESTIMONIAL_TYPE_LABELS, TESTIMONIAL_TYPES, type Testimonial } from '@/types/testimonial'

const UPLOAD_FOLDER = 'testimonials'

const schema = z
  .object({
    type: z.enum(TESTIMONIAL_TYPES),
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
    designation: z.string().trim().max(5000),
    content: z.custom<OutputData>().nullable(),
    image_path: z.string().nullable(),
    youtube_url: z.string().trim(),
    sort_order: z.number({ error: 'Enter a number' }).int().min(0),
    is_active: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.type !== 'video' && !v.content?.blocks?.length) ctx.addIssue({ code: 'custom', path: ['content'], message: 'Content is required' })
    if (v.type === 'text_image' && !v.image_path) {
      ctx.addIssue({ code: 'custom', path: ['image_path'], message: 'Image is required' })
    }
    if (v.type === 'video' && !youtubeId(v.youtube_url)) {
      ctx.addIssue({ code: 'custom', path: ['youtube_url'], message: 'Enter a valid YouTube URL' })
    }
  })

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  testimonial: Testimonial | null
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function TestimonialFormDialog({ open, testimonial, onOpenChange, onSaved }: Props) {
  const [uploading, setUploading] = useState(false)
  const pending = usePendingUploads()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: testimonial
      ? {
          type: testimonial.type,
          name: testimonial.name,
          designation: testimonial.designation ?? '',
          content: toEditorData(testimonial.content),
          image_path: testimonial.image_path,
          youtube_url: testimonial.youtube_url ?? '',
          sort_order: testimonial.sort_order,
          is_active: testimonial.is_active,
        }
      : {
          type: 'text',
          name: '',
          designation: '',
          content: null,
          image_path: null,
          youtube_url: '',
          sort_order: 0,
          is_active: true,
        },
  })

  const type = useWatch({ control, name: 'type' })
  const videoId = youtubeId(useWatch({ control, name: 'youtube_url' }) ?? '')

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      image_path: values.type === 'text_image' ? values.image_path : null,
      youtube_url: values.type === 'video' ? values.youtube_url : '',
    }
    try {
      const saved = testimonial
        ? await testimonialService.update(testimonial.id, payload)
        : await testimonialService.create(payload)
      pending.commit(saved.image_path)
      toast.success(testimonial ? 'Testimonial updated' : 'Testimonial created')
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
          <DialogTitle>{testimonial ? 'Edit Testimonial' : 'New Testimonial'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TESTIMONIAL_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {TESTIMONIAL_TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" placeholder="e.g. Student, Nepal" {...register('designation')} />
            </div>
          </div>

          {type === 'video' && (
            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input id="youtube_url" placeholder="https://www.youtube.com/watch?v=..." {...register('youtube_url')} />
              {errors.youtube_url && <p className="text-sm text-destructive">{errors.youtube_url.message}</p>}
              {videoId && (
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="Video thumbnail"
                  className="aspect-video w-full rounded-md border object-cover"
                />
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label>{type === 'video' ? 'Caption (optional)' : 'Testimonial'}</Label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <Editor
                  key={testimonial?.id ?? 'new'}
                  initData={toEditorData(testimonial?.content) ?? undefined}
                  onSave={(data) => field.onChange(data.blocks.length ? data : null)}
                />
              )}
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
          </div>

          {type === 'text_image' && (
            <div className="space-y-2">
              <Label>Image</Label>
              <Controller
                control={control}
                name="image_path"
                render={({ field }) => (
                  <ImageUpload
                    folder={UPLOAD_FOLDER}
                    value={field.value}
                    onChange={(path) => {
                      pending.track(path)
                      field.onChange(path)
                    }}
                    onUploadingChange={setUploading}
                  />
                )}
              />
              {errors.image_path && <p className="text-sm text-destructive">{errors.image_path.message}</p>}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" type="number" min={0} {...register('sort_order', { valueAsNumber: true })} />
              {errors.sort_order && <p className="text-sm text-destructive">{errors.sort_order.message}</p>}
            </div>
            <div className="flex items-center justify-between gap-2 sm:mt-6">
              <Label htmlFor="is_active">Active</Label>
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => <Switch id="is_active" checked={field.value} onCheckedChange={field.onChange} />}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting || uploading}>
              {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
