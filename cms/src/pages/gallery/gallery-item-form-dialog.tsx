import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { youtubeId, youtubeThumb, youtubeWatchUrl } from '@/lib/youtube'
import { galleryService } from '@/services/gallery.service'
import type { GalleryCategory, GalleryItem } from '@/types/gallery'
import { UPLOAD_FOLDER } from './bulk-upload-dialog'

const schema = z
  .object({
    media_type: z.enum(['image', 'youtube']),
    image_path: z.string(),
    youtube_url: z.string().trim(),
    alt_text: z.string().trim().max(250),
    category_id: z.number(),
    is_active: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.media_type === 'image' && !v.image_path) {
      ctx.addIssue({ code: 'custom', path: ['image_path'], message: 'Image is required' })
    }
    if (v.media_type === 'youtube' && !youtubeId(v.youtube_url)) {
      ctx.addIssue({ code: 'custom', path: ['youtube_url'], message: 'Enter a valid YouTube URL' })
    }
  })

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  item: GalleryItem
  categories: GalleryCategory[]
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function GalleryItemFormDialog({ open, item, categories, onOpenChange, onSaved }: Props) {
  const [uploading, setUploading] = useState(false)
  const pending = usePendingUploads()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      media_type: item.media_type,
      image_path: item.image_path ?? '',
      youtube_url: item.youtube_id ? youtubeWatchUrl(item.youtube_id) : '',
      alt_text: item.alt_text ?? '',
      category_id: item.category_id,
      is_active: item.is_active,
    },
  })

  const mediaType = useWatch({ control, name: 'media_type' })
  const videoId = youtubeId(useWatch({ control, name: 'youtube_url' }) ?? '')

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const { image_path, youtube_url, ...rest } = values
      const saved = await galleryService.update(item.id, {
        ...rest,
        ...(values.media_type === 'image' ? { image_path } : { youtube_url }),
        alt_text: values.alt_text || null,
      })
      pending.commit(saved.image_path)
      toast.success('Gallery item updated')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Gallery Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Controller
              control={control}
              name="media_type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="youtube">YouTube Video</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {mediaType === 'youtube' ? (
            <div className="space-y-2">
              <Label htmlFor="youtube_url">
                YouTube URL <span className="text-destructive">*</span>
              </Label>
              <Input id="youtube_url" placeholder="https://www.youtube.com/watch?v=..." {...register('youtube_url')} />
              {errors.youtube_url && <p className="text-sm text-destructive">{errors.youtube_url.message}</p>}
              {videoId && (
                <img src={youtubeThumb(videoId)} alt="" className="aspect-video w-full rounded-md border object-cover" />
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Label>
                Image <span className="text-destructive">*</span>
              </Label>
              <Controller
                control={control}
                name="image_path"
                render={({ field }) => (
                  <ImageUpload
                    folder={UPLOAD_FOLDER}
                    value={field.value || null}
                    onChange={(path) => {
                      pending.track(path)
                      field.onChange(path ?? '')
                    }}
                    onUploadingChange={setUploading}
                  />
                )}
              />
              {errors.image_path && <p className="text-sm text-destructive">{errors.image_path.message}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="alt_text">{mediaType === 'youtube' ? 'Title' : 'Alt Text'}</Label>
            <Input id="alt_text" maxLength={250} {...register('alt_text')} />
            {errors.alt_text && <p className="text-sm text-destructive">{errors.alt_text.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Controller
              control={control}
              name="category_id"
              render={({ field }) => (
                <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="is_active">Active</Label>
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => <Switch id="is_active" checked={field.value} onCheckedChange={field.onChange} />}
            />
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
