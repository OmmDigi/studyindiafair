import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Plus, Quote, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
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
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getErrorMessage } from '@/lib/api'
import { fileUrl } from '@/lib/upload'
import { testimonialService } from '@/services/testimonial.service'
import { editorPlainText, TESTIMONIAL_TYPE_LABELS, TESTIMONIAL_TYPES, type Testimonial, type TestimonialType } from '@/types/testimonial'
import { TestimonialFormDialog } from './testimonial-form-dialog'

const LIMIT = 20

function Preview({ t }: { t: Testimonial }) {
  const src = t.type === 'video' ? `https://img.youtube.com/vi/${t.youtube_id}/default.jpg` : fileUrl(t.image_path)
  if (!src) {
    return (
      <div className="flex size-12 items-center justify-center rounded-md border bg-muted text-muted-foreground">
        <Quote className="size-4" />
      </div>
    )
  }
  const img = <img src={src} alt={t.name} className="size-12 rounded-md border object-cover" />
  return t.youtube_url ? (
    <a href={t.youtube_url} target="_blank" rel="noreferrer">
      {img}
    </a>
  ) : (
    img
  )
}

export function TestimonialsPage() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [type, setType] = useState<TestimonialType | 'all'>('all')
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [page, setPage] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState<Testimonial | null>(null)

  const params = {
    search: search || undefined,
    type: type === 'all' ? undefined : type,
    is_active: status === 'all' ? undefined : status === 'active',
    page,
    limit: LIMIT,
  }
  const { data, isLoading } = useQuery({
    queryKey: ['testimonials', params],
    queryFn: () => testimonialService.list(params),
    placeholderData: keepPreviousData,
  })

  const refresh = () => qc.invalidateQueries({ queryKey: ['testimonials'] })

  const remove = useMutation({
    mutationFn: (id: number) => testimonialService.remove(id),
    onSuccess: () => {
      toast.success('Testimonial deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const toggle = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) => testimonialService.update(id, { is_active }),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (t: Testimonial | null) => {
    setEditing(t)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <Button onClick={() => openForm(null)}>
          <Plus /> New Testimonial
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Search name, designation or content"
          className="max-w-xs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
        <Select
          value={type}
          onValueChange={(v) => {
            setType(v as TestimonialType | 'all')
            setPage(1)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {TESTIMONIAL_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {TESTIMONIAL_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v as typeof status)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Preview</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Order</TableHead>
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
            ) : !data?.data.length ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No testimonials found
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <Preview t={t} />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{t.name}</div>
                    {t.designation && <div className="text-xs text-muted-foreground">{t.designation}</div>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{TESTIMONIAL_TYPE_LABELS[t.type]}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2 whitespace-normal text-muted-foreground">{editorPlainText(t.content) || '—'}</p>
                  </TableCell>
                  <TableCell>{t.sort_order}</TableCell>
                  <TableCell>
                    <Switch
                      checked={t.is_active}
                      disabled={toggle.isPending}
                      onCheckedChange={(is_active) => toggle.mutate({ id: t.id, is_active })}
                    />
                  </TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(t)}>
                      <Pencil />
                    </Button>
                    <Button size="icon-sm" variant="destructive" title="Delete" onClick={() => setDeleting(t)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
        <span>
          Page {page} of {totalPages}
        </span>
        <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>

      <TestimonialFormDialog key={formKey} open={formOpen} testimonial={editing} onOpenChange={setFormOpen} onSaved={refresh} />
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>Permanently delete testimonial from {deleting?.name}? This cannot be undone.</DialogDescription>
          </DialogHeader>
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
