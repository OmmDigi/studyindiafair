import { useMutation } from '@tanstack/react-query'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRefreshTestimonialCategories, useTestimonialCategories } from '@/hooks/use-testimonial-categories'
import { getErrorMessage } from '@/lib/api'
import { testimonialCategoryService } from '@/services/testimonial-category.service'
import type { TestimonialCategory } from '@/types/testimonial-category'
import { CategoryFormDialog } from './category-form-dialog'

type Props = {
  onCreated?: (category: TestimonialCategory) => void
}

export function CategoriesManager({ onCreated }: Props) {
  const { data = [], isLoading } = useTestimonialCategories()
  const refresh = useRefreshTestimonialCategories()
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<TestimonialCategory | null>(null)
  const [deleting, setDeleting] = useState<TestimonialCategory | null>(null)

  const term = search.trim().toLowerCase()
  const rows = term ? data.filter((c) => c.name.toLowerCase().includes(term) || c.slug.includes(term)) : data

  const remove = useMutation({
    mutationFn: (id: number) => testimonialCategoryService.remove(id),
    onSuccess: () => {
      toast.success('Category deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const toggle = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      testimonialCategoryService.update(id, { is_active }),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (category: TestimonialCategory | null) => {
    setEditing(category)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Input
          placeholder="Search name or slug"
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="button" onClick={() => openForm(null)}>
          <Plus /> New Category
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Testimonials</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !rows.length ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                  <TableCell>{c.testimonial_count}</TableCell>
                  <TableCell>{c.sort_order}</TableCell>
                  <TableCell>
                    <Switch
                      checked={c.is_active}
                      disabled={toggle.isPending}
                      onCheckedChange={(is_active) => toggle.mutate({ id: c.id, is_active })}
                    />
                  </TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button type="button" size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(c)}>
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="destructive"
                      title={c.testimonial_count ? 'Move its testimonials first' : 'Delete'}
                      disabled={c.testimonial_count > 0}
                      onClick={() => setDeleting(c)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CategoryFormDialog
        key={formKey}
        open={formOpen}
        category={editing}
        onOpenChange={setFormOpen}
        onSaved={(saved) => {
          refresh()
          if (!editing) onCreated?.(saved)
        }}
      />
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>Permanently delete category {deleting?.name}? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={remove.isPending}
              onClick={() => remove.mutate(deleting!.id)}
            >
              {remove.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
