import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CalendarDays, GraduationCap, GripVertical, MapPin, Pencil, Plus, Trash2 } from 'lucide-react'
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
import { useAuth } from '@/context/auth-context'
import { useDragSort } from '@/hooks/use-drag-sort'
import { useRefreshPages } from '@/hooks/use-pages'
import { getErrorMessage } from '@/lib/api'
import { fileUrl } from '@/lib/upload'
import { upcomingEventService } from '@/services/upcoming-event.service'
import type { UpcomingEvent } from '@/types/upcoming-event'
import { EventFormDialog } from './event-form-dialog'
import { UniversityLogosDialog } from './university-logos-dialog'

export function UpcomingEventsPage() {
  const qc = useQueryClient()
  const { can } = useAuth()
  const refreshPages = useRefreshPages()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [editing, setEditing] = useState<UpcomingEvent | null>(null)
  const [deleting, setDeleting] = useState<UpcomingEvent | null>(null)
  const [logosFor, setLogosFor] = useState<UpcomingEvent | null>(null)

  const params = { search: search.trim() || undefined, is_active: status === 'all' ? undefined : status === 'active' }
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['upcoming-events', params],
    queryFn: () => upcomingEventService.list(params),
  })

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['upcoming-events'] })
    refreshPages()
  }

  const reorder = useMutation({
    mutationFn: (ids: number[]) => upcomingEventService.reorder(ids),
    onSuccess: refresh,
    onError: (error) => {
      toast.error(getErrorMessage(error))
      reset()
      refresh()
    },
  })

  const { list, itemProps, reset } = useDragSort(events, reorder.mutate, !reorder.isPending)

  const toggle = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      upcomingEventService.update(id, { is_active }),
    onSuccess: refresh,
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const remove = useMutation({
    mutationFn: (id: number) => upcomingEventService.remove(id),
    onSuccess: () => {
      toast.success('Event deleted')
      setDeleting(null)
      refresh()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const openForm = (event: UpcomingEvent | null) => {
    setEditing(event)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Upcoming Events</h1>
        {can('create') && (
          <Button onClick={() => openForm(null)}>
            <Plus /> New Event
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Search name, slug, location or date"
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
      </div>
      <p className="text-xs text-muted-foreground">Drag rows to reorder.</p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Locations & Dates</TableHead>
              <TableHead>Logos</TableHead>
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
            ) : !list.length ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No upcoming events found
                </TableCell>
              </TableRow>
            ) : (
              list.map((e) => (
                <TableRow key={e.id} {...itemProps(e.id)} className="data-dragging:opacity-40">
                  <TableCell className="cursor-grab text-muted-foreground">
                    <GripVertical className="size-4" />
                  </TableCell>
                  <TableCell>
                    {e.images[0] ? (
                      <div className="relative w-fit">
                        <img
                          src={fileUrl(e.images[0].path)!}
                          alt={e.images[0].alt_text ?? e.name}
                          draggable={false}
                          className="size-12 rounded-md border object-cover"
                        />
                        {e.images.length > 1 && (
                          <span className="absolute -right-2 -bottom-2 rounded-full border bg-background px-1.5 text-xs">
                            +{e.images.length - 1}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="size-12 rounded-md border bg-muted" />
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{e.name}</p>
                    <p className="text-xs text-muted-foreground">/{e.slug}</p>
                  </TableCell>
                  <TableCell className="space-y-1">
                    {e.schedules.map((s, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-x-3 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-muted-foreground" />
                          {s.location}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <CalendarDays className="size-3" />
                          {s.date}
                        </span>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setLogosFor(e)}>
                      <GraduationCap /> {e.university_logos.length}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={e.is_active}
                      disabled={toggle.isPending}
                      onCheckedChange={(is_active) => toggle.mutate({ id: e.id, is_active })}
                    />
                  </TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button size="icon-sm" variant="ghost" title="Edit" onClick={() => openForm(e)}>
                      <Pencil />
                    </Button>
                    {can('delete') && (
                      <Button size="icon-sm" variant="destructive" title="Delete" onClick={() => setDeleting(e)}>
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

      <EventFormDialog key={formKey} open={formOpen} event={editing} onOpenChange={setFormOpen} onSaved={refresh} />
      {logosFor && (
        <UniversityLogosDialog
          key={logosFor.id}
          open
          event={logosFor}
          onOpenChange={(open) => !open && setLogosFor(null)}
          onSaved={refresh}
        />
      )}
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Upcoming Event</DialogTitle>
            <DialogDescription>
              Permanently delete "{deleting?.name}"? Its page, SEO data and images will also be deleted. This cannot be
              undone.
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
