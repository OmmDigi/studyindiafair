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
import { useAuth } from '@/context/auth-context'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePages, useRefreshPages } from '@/hooks/use-pages'
import { getErrorMessage } from '@/lib/api'
import { pageService } from '@/services/page.service'
import type { Page } from '@/types/page'
import { PageFormDialog } from './page-form-dialog'

export function PagesPage() {
  const { can } = useAuth()
  const { data = [], isLoading } = usePages()
  const refresh = useRefreshPages()
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<Page | null>(null)
  const [deleting, setDeleting] = useState<Page | null>(null)

  const term = search.trim().toLowerCase()
  const rows = term ? data.filter((p) => p.name.toLowerCase().includes(term) || p.slug.includes(term)) : data

  const remove = useMutation({
    mutationFn: (id: number) => pageService.remove(id),
    onSuccess: () => {
      toast.success('Page deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (page: Page | null) => {
    setEditing(page)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pages</h1>
        {can('create') && (
          <Button onClick={() => openForm(null)}>
            <Plus /> New Page
          </Button>
        )}
      </div>

      <Input
        placeholder="Search name or slug"
        className="max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>FAQs</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !rows.length ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No pages found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.slug}</TableCell>
                  <TableCell>{p.faq_count}</TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(p)}>
                      <Pencil />
                    </Button>
                    {can('delete') && (
                      <Button
                        size="icon-sm"
                        variant="destructive"
                        title={p.faq_count ? 'Move or delete its FAQs first' : 'Delete'}
                        disabled={p.faq_count > 0}
                        onClick={() => setDeleting(p)}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PageFormDialog key={formKey} open={formOpen} page={editing} onOpenChange={setFormOpen} onSaved={refresh} />
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>Permanently delete page {deleting?.name}? This cannot be undone.</DialogDescription>
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
