import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Plus, Trash2 } from 'lucide-react'
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
import { usePages } from '@/hooks/use-pages'
import { getErrorMessage } from '@/lib/api'
import { editorPlainText } from '@/lib/editor'
import { faqService } from '@/services/faq.service'
import type { Faq } from '@/types/faq'
import { FaqFormDialog } from './faq-form-dialog'

const LIMIT = 20

export function FaqsPage() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const { data: pages = [] } = usePages()
  const [pageSlug, setPageSlug] = useState('all')
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [page, setPage] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<Faq | null>(null)
  const [deleting, setDeleting] = useState<Faq | null>(null)

  const params = {
    search: search || undefined,
    page_slug: pageSlug === 'all' ? undefined : pageSlug,
    is_active: status === 'all' ? undefined : status === 'active',
    page,
    limit: LIMIT,
  }
  const { data, isLoading } = useQuery({
    queryKey: ['faqs', params],
    queryFn: () => faqService.list(params),
    placeholderData: keepPreviousData,
  })

  const refresh = () => qc.invalidateQueries({ queryKey: ['faqs'] })

  const remove = useMutation({
    mutationFn: (id: number) => faqService.remove(id),
    onSuccess: () => {
      toast.success('FAQ deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const toggle = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) => faqService.update(id, { is_active }),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (f: Faq | null) => {
    setEditing(f)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">FAQs</h1>
        <Button onClick={() => openForm(null)}>
          <Plus /> New FAQ
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Search question or answer"
          className="max-w-xs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
        <Select
          value={pageSlug}
          onValueChange={(v) => {
            setPageSlug(v)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All pages</SelectItem>
            {pages.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>
                {p.name}
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
              <TableHead>Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Page</TableHead>
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
            ) : !data?.data.length ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No FAQs found
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="max-w-xs">
                    <p className="whitespace-normal font-medium">{f.question}</p>
                  </TableCell>
                  <TableCell className="max-w-sm">
                    <p className="line-clamp-2 whitespace-normal text-muted-foreground">{editorPlainText(f.answer) || '—'}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{pages.find((p) => p.slug === f.page_slug)?.name ?? f.page_slug}</Badge>
                  </TableCell>
                  <TableCell>{f.sort_order}</TableCell>
                  <TableCell>
                    <Switch
                      checked={f.is_active}
                      disabled={toggle.isPending}
                      onCheckedChange={(is_active) => toggle.mutate({ id: f.id, is_active })}
                    />
                  </TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(f)}>
                      <Pencil />
                    </Button>
                    <Button size="icon-sm" variant="destructive" title="Delete" onClick={() => setDeleting(f)}>
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

      <FaqFormDialog
        key={formKey}
        open={formOpen}
        faq={editing}
        defaultPage={pageSlug === 'all' ? undefined : pageSlug}
        onOpenChange={setFormOpen}
        onSaved={refresh}
      />
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete FAQ</DialogTitle>
            <DialogDescription>Permanently delete "{deleting?.question}"? This cannot be undone.</DialogDescription>
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
