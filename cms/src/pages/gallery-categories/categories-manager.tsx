import { useMutation } from '@tanstack/react-query'
import { GripVertical, ImageIcon, Pencil, Plus, Trash2 } from 'lucide-react'
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
import { useDragSort } from '@/hooks/use-drag-sort'
import { useGalleryCategories, useRefreshGallery } from '@/hooks/use-gallery-categories'
import { getErrorMessage } from '@/lib/api'
import { fileUrl } from '@/lib/upload'
import { galleryCategoryService } from '@/services/gallery-category.service'
import type { GalleryCategory } from '@/types/gallery'
import { CategoryFormDialog } from './category-form-dialog'

type Props = {
  onCreated?: (category: GalleryCategory) => void
}

function Cover({ c }: { c: GalleryCategory }) {
  const src = fileUrl(c.cover_image)
  if (!src) {
    return (
      <div className="flex size-10 items-center justify-center rounded-md border bg-muted text-muted-foreground">
        <ImageIcon className="size-4" />
      </div>
    )
  }
  return <img src={src} alt={c.name} className="size-10 rounded-md border object-cover" />
}

export function CategoriesManager({ onCreated }: Props) {
  const { data = [], isLoading } = useGalleryCategories()
  const refresh = useRefreshGallery()
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<GalleryCategory | null>(null)
  const [deleting, setDeleting] = useState<GalleryCategory | null>(null)

  const term = search.trim().toLowerCase()

  const reorder = useMutation({
    mutationFn: (ids: number[]) => galleryCategoryService.reorder(ids),
    onSuccess: refresh,
    onError: (error) => {
      toast.error(getErrorMessage(error))
      reset()
      refresh()
    },
  })

  const { list, itemProps, reset } = useDragSort(data, reorder.mutate, !term && !reorder.isPending)
  const rows = term ? list.filter((c) => c.name.toLowerCase().includes(term) || c.slug.includes(term)) : list

  const remove = useMutation({
    mutationFn: (id: number) => galleryCategoryService.remove(id),
    onSuccess: () => {
      toast.success('Category deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const toggle = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      galleryCategoryService.update(id, { is_active }),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (category: GalleryCategory | null) => {
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
      <p className="text-xs text-muted-foreground">
        {term ? 'Clear the search to reorder by dragging.' : 'Drag rows to reorder.'}
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Cover</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !rows.length ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((c) => (
                <TableRow key={c.id} {...itemProps(c.id)} className="data-dragging:opacity-40">
                  <TableCell className="text-muted-foreground">
                    <GripVertical className={term ? 'size-4 opacity-30' : 'size-4 cursor-grab'} />
                  </TableCell>
                  <TableCell>
                    <Cover c={c} />
                  </TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                  <TableCell>{c.item_count}</TableCell>
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
                      title={c.item_count ? 'Move or delete its images first' : 'Delete'}
                      disabled={c.item_count > 0}
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
