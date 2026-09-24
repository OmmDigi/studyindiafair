import { useMutation, useQuery } from '@tanstack/react-query'
import { FolderCog, GripVertical, ImageIcon, Pencil, Trash2, Upload } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useDragSort } from '@/hooks/use-drag-sort'
import { useGalleryCategories, useRefreshGallery } from '@/hooks/use-gallery-categories'
import { getErrorMessage } from '@/lib/api'
import { fileUrl } from '@/lib/upload'
import { ManageCategoriesDialog } from '@/pages/gallery-categories/manage-categories-dialog'
import { galleryService } from '@/services/gallery.service'
import type { GalleryItem } from '@/types/gallery'
import { BulkUploadDialog } from './bulk-upload-dialog'
import { GalleryItemFormDialog } from './gallery-item-form-dialog'

export function GalleryPage() {
  const refresh = useRefreshGallery()
  const { data: categories = [], isLoading: categoriesLoading } = useGalleryCategories()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [manageOpen, setManageOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadKey, setUploadKey] = useState(0)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [deleting, setDeleting] = useState<GalleryItem | null>(null)

  const category = categories.find((c) => c.id === selectedId) ?? categories[0]

  const params = { category_id: category?.id ?? 0, is_active: status === 'all' ? undefined : status === 'active' }
  const { data: items = [], isLoading } = useQuery({
    queryKey: ['gallery', params],
    queryFn: () => galleryService.list(params),
    enabled: !!category,
  })

  const reorder = useMutation({
    mutationFn: (ids: number[]) => galleryService.reorder(category!.id, ids),
    onSuccess: refresh,
    onError: (error) => {
      toast.error(getErrorMessage(error))
      reset()
      refresh()
    },
  })

  const { list, itemProps, reset } = useDragSort(items, reorder.mutate, !reorder.isPending)

  const remove = useMutation({
    mutationFn: (id: number) => galleryService.remove(id),
    onSuccess: () => {
      toast.success('Image deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const toggle = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) => galleryService.update(id, { is_active }),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openUpload = () => {
    setUploadKey((k) => k + 1)
    setUploadOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <Button variant="outline" onClick={() => setManageOpen(true)}>
          <FolderCog /> Manage Categories
        </Button>
      </div>

      {categoriesLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : !category ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          <p>No gallery categories yet.</p>
          <Button className="mt-4" onClick={() => setManageOpen(true)}>
            Create a category
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  'flex shrink-0 items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                  c.id === category.id && 'bg-muted font-medium'
                )}
              >
                <span className={cn('truncate', !c.is_active && 'text-muted-foreground line-through')}>{c.name}</span>
                <Badge variant="secondary">{c.item_count}</Badge>
              </button>
            ))}
          </nav>

          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                {!category.is_active && <Badge variant="outline">Inactive</Badge>}
              </div>
              <div className="flex gap-2">
                <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={openUpload}>
                  <Upload /> Upload Images
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Drag images to reorder.</p>

            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : !list.length ? (
              <div className="flex flex-col items-center gap-2 rounded-md border border-dashed p-10 text-muted-foreground">
                <ImageIcon className="size-6" />
                No images found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {list.map((item) => (
                  <div
                    key={item.id}
                    {...itemProps(item.id)}
                    className="group overflow-hidden rounded-md border bg-card data-dragging:opacity-40"
                  >
                    <div className="relative aspect-square cursor-grab bg-muted">
                      <img
                        src={fileUrl(item.image_path)!}
                        alt={item.alt_text ?? ''}
                        draggable={false}
                        className={cn('size-full object-cover', !item.is_active && 'opacity-50')}
                      />
                      <GripVertical className="absolute top-2 left-2 size-5 rounded bg-background/80 p-0.5 text-muted-foreground" />
                    </div>
                    <div className="space-y-2 p-2">
                      <p
                        className={cn('truncate text-xs', !item.alt_text && 'text-muted-foreground italic')}
                        title={item.alt_text ?? undefined}
                      >
                        {item.alt_text || 'No alt text'}
                      </p>
                      <div className="flex items-center justify-between">
                        <Switch
                          checked={item.is_active}
                          disabled={toggle.isPending}
                          title={item.is_active ? 'Active' : 'Inactive'}
                          onCheckedChange={(is_active) => toggle.mutate({ id: item.id, is_active })}
                        />
                        <div className="space-x-1">
                          <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => setEditing(item)}>
                            <Pencil />
                          </Button>
                          <Button size="icon-sm" variant="destructive" title="Delete" onClick={() => setDeleting(item)}>
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <ManageCategoriesDialog
        open={manageOpen}
        onOpenChange={setManageOpen}
        onCreated={(c) => setSelectedId(c.id)}
      />
      {category && (
        <BulkUploadDialog
          key={uploadKey}
          open={uploadOpen}
          category={category}
          onOpenChange={setUploadOpen}
          onSaved={refresh}
        />
      )}
      {editing && (
        <GalleryItemFormDialog
          key={editing.id}
          open
          item={editing}
          categories={categories}
          onOpenChange={(open) => !open && setEditing(null)}
          onSaved={refresh}
        />
      )}
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>Permanently delete this image? This cannot be undone.</DialogDescription>
          </DialogHeader>
          {deleting && (
            <img
              src={fileUrl(deleting.image_path)!}
              alt={deleting.alt_text ?? ''}
              className="max-h-48 rounded-md border object-contain"
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={remove.isPending} onClick={() => remove.mutate(deleting!.id)}>
              {remove.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
