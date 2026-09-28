import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/auth-context'
import { getErrorMessage } from '@/lib/api'
import { formService } from '@/services/form.service'
import type { Form } from '@/types/form'
import { SetupEmailButton } from '../email-templates/setup-email-button'
import { FormFormDialog } from './form-form-dialog'

export function FormsPage() {
  const { can } = useAuth()
  const qc = useQueryClient()
  const { data = [], isLoading } = useQuery({ queryKey: ['forms'], queryFn: () => formService.list() })
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<Form | null>(null)
  const [deleting, setDeleting] = useState<Form | null>(null)

  const refresh = () => qc.invalidateQueries({ queryKey: ['forms'] })

  const term = search.trim().toLowerCase()
  const rows = term ? data.filter((f) => f.name.toLowerCase().includes(term) || f.form_id.includes(term)) : data

  const remove = useMutation({
    mutationFn: (id: number) => formService.remove(id),
    onSuccess: () => {
      toast.success('Form deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (form: Form | null) => {
    setEditing(form)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Forms</h1>
        {can('create') && (
          <Button onClick={() => openForm(null)}>
            <Plus /> New Form
          </Button>
        )}
      </div>

      <Input
        placeholder="Search name or form ID"
        className="max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Form ID</TableHead>
              <TableHead>Enquiries</TableHead>
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
                  No forms found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell className="text-muted-foreground">{f.form_id}</TableCell>
                  <TableCell>{f.enquiry_count}</TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button size="icon-sm" variant="ghost" title="View enquiries" asChild>
                      <Link to={`/forms/${f.id}`}>
                        <Eye />
                      </Link>
                    </Button>
                    <SetupEmailButton form={f} />
                    <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(f)}>
                      <Pencil />
                    </Button>
                    {can('delete') && (
                      <Button
                        size="icon-sm"
                        variant="destructive"
                        title={f.enquiry_count ? 'Delete its enquiries first' : 'Delete'}
                        disabled={f.enquiry_count > 0}
                        onClick={() => setDeleting(f)}
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

      <FormFormDialog key={formKey} open={formOpen} form={editing} onOpenChange={setFormOpen} onSaved={refresh} />
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Form</DialogTitle>
            <DialogDescription>Permanently delete form {deleting?.name}? This cannot be undone.</DialogDescription>
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
