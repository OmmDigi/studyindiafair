import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { KeyRound, Pencil, Plus, Trash2 } from 'lucide-react'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/auth-context'
import { getErrorMessage } from '@/lib/api'
import { userService } from '@/services/user.service'
import type { ManagedUser, Role } from '@/types/auth'
import { ResetPasswordDialog } from './reset-password-dialog'
import { UserFormDialog } from './user-form-dialog'

const LIMIT = 20

export function UsersPage() {
  const { user: me } = useAuth()
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<Role | 'all'>('all')
  const [page, setPage] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<ManagedUser | null>(null)
  const [resetting, setResetting] = useState<ManagedUser | null>(null)
  const [deleting, setDeleting] = useState<ManagedUser | null>(null)

  const params = { search: search || undefined, role: role === 'all' ? undefined : role, page, limit: LIMIT }
  const { data, isLoading } = useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.list(params),
    placeholderData: keepPreviousData,
  })

  const refresh = () => qc.invalidateQueries({ queryKey: ['users'] })

  const remove = useMutation({
    mutationFn: (id: number) => userService.remove(id),
    onSuccess: () => {
      toast.success('User deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (user: ManagedUser | null) => {
    setEditing(user)
    setFormOpen(true)
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button onClick={() => openForm(null)}>
          <Plus /> New User
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search name or email"
          className="max-w-xs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
        <Select
          value={role}
          onValueChange={(v) => {
            setRole(v as Role | 'all')
            setPage(1)
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !data?.data.length ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">
                    {u.name} {u.id === me?.id && <span className="text-muted-foreground">(you)</span>}
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.is_active ? 'outline' : 'destructive'}>{u.is_active ? 'Active' : 'Inactive'}</Badge>
                  </TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(u)}>
                      <Pencil />
                    </Button>
                    <Button size="icon-sm" variant="ghost" title="Reset password" onClick={() => setResetting(u)}>
                      <KeyRound />
                    </Button>
                    {u.id !== me?.id && (
                      <Button size="icon-sm" variant="destructive" title="Delete" onClick={() => setDeleting(u)}>
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

      <UserFormDialog
        open={formOpen}
        user={editing}
        isSelf={editing?.id === me?.id}
        onOpenChange={setFormOpen}
        onSaved={refresh}
      />
      <ResetPasswordDialog user={resetting} onClose={() => setResetting(null)} />
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Permanently delete {deleting?.name} ({deleting?.email})? This cannot be undone.
            </DialogDescription>
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
