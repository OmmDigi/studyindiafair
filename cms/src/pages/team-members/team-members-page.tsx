import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, UserRound } from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getErrorMessage } from '@/lib/api'
import { editorPlainText } from '@/lib/editor'
import { fileUrl } from '@/lib/upload'
import { teamMemberService } from '@/services/team-member.service'
import type { TeamMember } from '@/types/team-member'
import { TeamMemberFormDialog } from './team-member-form-dialog'

const LIMIT = 20

function Avatar({ m }: { m: TeamMember }) {
  const src = fileUrl(m.image_path)
  if (!src) {
    return (
      <div className="flex size-12 items-center justify-center rounded-md border bg-muted text-muted-foreground">
        <UserRound className="size-4" />
      </div>
    )
  }
  return <img src={src} alt={m.name} className="size-12 rounded-md border object-cover" />
}

export function TeamMembersPage() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [page, setPage] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [deleting, setDeleting] = useState<TeamMember | null>(null)

  const params = {
    search: search || undefined,
    is_active: status === 'all' ? undefined : status === 'active',
    page,
    limit: LIMIT,
  }
  const { data, isLoading } = useQuery({
    queryKey: ['team-members', params],
    queryFn: () => teamMemberService.list(params),
    placeholderData: keepPreviousData,
  })

  const refresh = () => qc.invalidateQueries({ queryKey: ['team-members'] })

  const remove = useMutation({
    mutationFn: (id: number) => teamMemberService.remove(id),
    onSuccess: () => {
      toast.success('Team member deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const toggle = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      teamMemberService.update(id, { is_active }),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const move = useMutation({
    mutationFn: ({ id, direction }: { id: number; direction: 'up' | 'down' }) => teamMemberService.move(id, direction),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (m: TeamMember | null) => {
    setEditing(m)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / LIMIT))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Team Members</h1>
        <Button onClick={() => openForm(null)}>
          <Plus /> New Member
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Search name, designation or details"
          className="max-w-xs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
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
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Position</TableHead>
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
                  No team members found
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((m, i) => {
                const index = (page - 1) * LIMIT + i
                return (
                  <TableRow key={m.id}>
                    <TableCell>
                      <Avatar m={m} />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.designation}</p>
                    </TableCell>
                    <TableCell className="max-w-sm">
                      <p className="line-clamp-2 whitespace-normal text-muted-foreground">
                        {editorPlainText(m.details) || '—'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="w-6 tabular-nums">{m.position}</span>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          title="Move up"
                          disabled={move.isPending || index === 0}
                          onClick={() => move.mutate({ id: m.id, direction: 'up' })}
                        >
                          <ArrowUp />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          title="Move down"
                          disabled={move.isPending || index === total - 1}
                          onClick={() => move.mutate({ id: m.id, direction: 'down' })}
                        >
                          <ArrowDown />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={m.is_active}
                        disabled={toggle.isPending}
                        onCheckedChange={(is_active) => toggle.mutate({ id: m.id, is_active })}
                      />
                    </TableCell>
                    <TableCell className="space-x-1 text-right">
                      <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(m)}>
                        <Pencil />
                      </Button>
                      <Button size="icon-sm" variant="destructive" title="Delete" onClick={() => setDeleting(m)}>
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
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

      <TeamMemberFormDialog
        key={formKey}
        open={formOpen}
        member={editing}
        onOpenChange={setFormOpen}
        onSaved={refresh}
      />
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
            <DialogDescription>Permanently delete "{deleting?.name}"? This cannot be undone.</DialogDescription>
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
