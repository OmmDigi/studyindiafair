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
import { testimonialCategoryService } from '@/services/testimonial-category.service'
import type { TestimonialCategory } from '@/types/testimonial-category'

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  slug: z
    .string()
    .trim()
    .max(120)
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*)?$/, 'Only lowercase letters, numbers and hyphens'),
  sort_order: z.number({ error: 'Enter a number' }).int().min(0),
  is_active: z.boolean(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  category: TestimonialCategory | null
  onOpenChange: (open: boolean) => void
  onSaved: (category: TestimonialCategory) => void
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
      ? { name: category.name, slug: category.slug, sort_order: category.sort_order, is_active: category.is_active }
      : { name: '', slug: '', sort_order: 0, is_active: true },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = category
        ? await testimonialCategoryService.update(category.id, values.slug ? values : { ...values, slug: category.slug })
        : await testimonialCategoryService.create(values)
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
            <Label htmlFor="category-name">Name</Label>
            <Input id="category-name" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-slug">Slug</Label>
            <Input id="category-slug" placeholder="Auto-generated from name if empty" {...register('slug')} />
            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category-sort">Sort Order</Label>
              <Input id="category-sort" type="number" min={0} {...register('sort_order', { valueAsNumber: true })} />
              {errors.sort_order && <p className="text-sm text-destructive">{errors.sort_order.message}</p>}
            </div>
            <div className="flex items-center justify-between gap-2 sm:mt-6">
              <Label htmlFor="category-active">Active</Label>
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <Switch id="category-active" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
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
