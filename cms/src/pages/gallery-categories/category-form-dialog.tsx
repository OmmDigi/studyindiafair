import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { getErrorMessage } from '@/lib/api'
import { galleryCategoryService } from '@/services/gallery-category.service'
import type { GalleryCategory } from '@/types/gallery'

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  slug: z
    .string()
    .trim()
    .max(120)
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*)?$/, 'Only lowercase letters, numbers and hyphens'),
  is_active: z.boolean(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  category: GalleryCategory | null
  onOpenChange: (open: boolean) => void
  onSaved: (category: GalleryCategory) => void
}

export function CategoryFormDialog({ open, category, onOpenChange, onSaved }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: category
      ? { name: category.name, slug: category.slug, is_active: category.is_active }
      : { name: '', slug: '', is_active: true },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = category
        ? await galleryCategoryService.update(category.id, values.slug ? values : { ...values, slug: category.slug })
        : await galleryCategoryService.create(values)
      toast.success(category ? 'Category updated' : 'Category created')
      onSaved(saved)
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'New Category'}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.stopPropagation()
            handleSubmit(onSubmit)(e)
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="gallery-category-name">Name</Label>
            <Input id="gallery-category-name" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery-category-slug">Slug</Label>
            <Input id="gallery-category-slug" placeholder="Auto-generated from name if empty" {...register('slug')} />
            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="gallery-category-active">Active</Label>
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => (
                <Switch id="gallery-category-active" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
