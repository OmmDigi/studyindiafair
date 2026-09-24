import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
import { galleryService } from '@/services/gallery.service'
import type { GalleryCategory, GalleryItem } from '@/types/gallery'
import { UPLOAD_FOLDER } from './bulk-upload-dialog'

const schema = z.object({
  image_path: z.string({ error: 'Image is required' }).min(1, 'Image is required'),
  alt_text: z.string().trim().max(250),
  category_id: z.number(),
  is_active: z.boolean(),
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
      image_path: item.image_path,
      alt_text: item.alt_text ?? '',
      category_id: item.category_id,
      is_active: item.is_active,
    },
  })

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = await galleryService.update(item.id, { ...values, alt_text: values.alt_text || null })
      pending.commit(saved.image_path)
      toast.success('Image updated')
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
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="alt_text">Alt Text</Label>
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
