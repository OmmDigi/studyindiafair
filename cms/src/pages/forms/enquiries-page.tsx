import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Download, Eye, RefreshCw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/auth-context'
import { getErrorMessage } from '@/lib/api'
import { formService } from '@/services/form.service'
import { formWebhookService } from '@/services/form-webhook.service'
import type { Enquiry } from '@/types/form'
import { TEMPLATE_TYPE_LABELS } from '@/types/form-email'

const LIMIT = 20

const formatValue = (value: unknown) =>
  value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value)

export function EnquiriesPage() {
  const id = Number(useParams().id)
  const { can } = useAuth()
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [page, setPage] = useState(1)
  const [deleting, setDeleting] = useState<Enquiry | null>(null)
  const [viewing, setViewing] = useState<Enquiry | null>(null)
  const [exporting, setExporting] = useState(false)

  const filter = { search: search.trim() || undefined, from: from || undefined, to: to || undefined }
  const params = { ...filter, page, limit: LIMIT }

  const { data: form } = useQuery({ queryKey: ['forms', id], queryFn: () => formService.get(id) })
  const { data, isLoading } = useQuery({
    queryKey: ['forms', id, 'enquiries', params],
    queryFn: () => formService.enquiries(id, params),
    placeholderData: keepPreviousData,
    refetchInterval: (q) =>
      viewing && q.state.data?.data.some((e) => e.id === viewing.id && e.webhooks.some((w) => w.status === 'pending')) ? 4000 : false,
  })

  const viewed = viewing && (data?.data.find((e) => e.id === viewing.id) ?? viewing)

  const resend = useMutation({
    mutationFn: ({ enquiryId, webhookId }: { enquiryId: number; webhookId?: number }) =>
      formWebhookService.resend(enquiryId, webhookId),
    onSuccess: ({ queued }) => {
      toast.success(`${queued} webhook${queued === 1 ? '' : 's'} triggered`)
      qc.invalidateQueries({ queryKey: ['forms', id, 'enquiries'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const remove = useMutation({
    mutationFn: (enquiryId: number) => formService.removeEnquiry(id, enquiryId),
    onSuccess: () => {
      toast.success('Enquiry deleted')
      setDeleting(null)
      qc.invalidateQueries({ queryKey: ['forms'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const exportCsv = async () => {
    setExporting(true)
    try {
      const blob = await formService.exportEnquiries(id, filter)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${form?.form_id ?? 'form'}-enquiries.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setExporting(false)
    }
  }

  const updateFilter = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
    setPage(1)
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button size="icon-sm" variant="ghost" title="Back" asChild>
            <Link to="/forms">
              <ArrowLeft />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{form?.name ?? 'Enquiries'}</h1>
            {form && <p className="text-sm text-muted-foreground">Form ID: {form.form_id}</p>}
          </div>
        </div>
        <Button variant="outline" disabled={exporting || !data?.total} onClick={exportCsv}>
          <Download /> {exporting ? 'Exporting...' : 'Export CSV'}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Search name or phone" className="max-w-xs" value={search} onChange={updateFilter(setSearch)} />
        <Input type="date" className="w-40" title="From" value={from} max={to || undefined} onChange={updateFilter(setFrom)} />
        <span className="text-sm text-muted-foreground">to</span>
        <Input type="date" className="w-40" title="To" value={to} min={from || undefined} onChange={updateFilter(setTo)} />
        {(search || from || to) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch('')
              setFrom('')
              setTo('')
              setPage(1)
            }}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Submitted</TableHead>
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
                  No enquiries found
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium align-top">{e.name}</TableCell>
                  <TableCell className="align-top">{e.phone}</TableCell>
                  <TableCell className="max-w-md whitespace-normal align-top">
                    {Object.keys(e.details).length ? (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {Object.entries(e.details)
                          .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${formatValue(value)}`)
                          .join(' · ')}
                      </p>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap align-top text-muted-foreground">
                    {new Date(e.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="space-x-1 whitespace-nowrap text-right align-top">
                    <Button size="icon-sm" variant="ghost" title="View details" onClick={() => setViewing(e)}>
                      <Eye />
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

      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
        <span>
          {data?.total ?? 0} total · Page {page} of {totalPages}
        </span>
        <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>Submitted {viewed && new Date(viewed.created_at).toLocaleString()}</DialogDescription>
          </DialogHeader>
          {viewed && (
            <dl className="max-h-[60vh] divide-y overflow-y-auto rounded-md border text-sm">
              {[
                ['Name', viewed.name] as const,
                ['Phone', viewed.phone] as const,
                ...Object.entries(viewed.details).map(([key, value]) => [key.replace(/_/g, ' '), value] as const),
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-3 gap-2 px-3 py-2">
                  <dt className="font-medium capitalize">{label}</dt>
                  <dd className="col-span-2 whitespace-pre-wrap break-words text-muted-foreground">
                    {typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : formatValue(value) || '-'}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {viewed && viewed.emails.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Emails</p>
              <ul className="divide-y rounded-md border text-sm">
                {viewed.emails.map((m) => (
                  <li key={m.id} className="space-y-0.5 px-3 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{TEMPLATE_TYPE_LABELS[m.type]}</span>
                      <Badge variant={m.status === 'sent' ? 'default' : m.status === 'failed' ? 'destructive' : 'secondary'} className="capitalize">
                        {m.status}
                      </Badge>
                    </div>
                    {m.recipients && <p className="break-all text-muted-foreground">To: {m.recipients}</p>}
                    {m.error && <p className="break-words text-destructive">{m.error}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {viewed && (viewed.webhooks.length > 0 || can('update')) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">Webhooks</p>
                {can('update') && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={resend.isPending}
                    onClick={() => resend.mutate({ enquiryId: viewed.id })}
                  >
                    <RefreshCw /> Trigger Enabled
                  </Button>
                )}
              </div>
              {viewed.webhooks.length > 0 ? (
                <ul className="max-h-[30vh] divide-y overflow-y-auto rounded-md border text-sm">
                  {viewed.webhooks.map((w) => (
                    <li key={w.id} className="space-y-0.5 px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{w.webhook_name}</span>
                        <div className="flex items-center gap-1">
                          <Badge
                            variant={w.status === 'success' ? 'default' : w.status === 'failed' ? 'destructive' : 'secondary'}
                            className="capitalize"
                          >
                            {w.status_code ? `${w.status} · ${w.status_code}` : w.status}
                          </Badge>
                          {can('update') && w.webhook_id && w.status !== 'pending' && (
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              title="Resend"
                              disabled={resend.isPending}
                              onClick={() => resend.mutate({ enquiryId: viewed.id, webhookId: w.webhook_id! })}
                            >
                              <RefreshCw />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="break-all text-muted-foreground">
                        {w.method} {w.url}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {w.attempts} attempt{w.attempts === 1 ? '' : 's'} · {new Date(w.updated_at).toLocaleString()}
                      </p>
                      {w.error && <p className="break-words text-destructive">{w.error}</p>}
                      {(w.request_body || w.response) && (
                        <details className="text-xs">
                          <summary className="cursor-pointer text-muted-foreground">Request / response</summary>
                          {w.request_body && (
                            <pre className="mt-1 max-h-40 overflow-auto rounded bg-muted p-2 whitespace-pre-wrap break-all">
                              {w.request_body}
                            </pre>
                          )}
                          {w.response && (
                            <pre className="mt-1 max-h-40 overflow-auto rounded bg-muted p-2 whitespace-pre-wrap break-all">
                              {w.response}
                            </pre>
                          )}
                        </details>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No webhook calls yet</p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewing(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Enquiry</DialogTitle>
            <DialogDescription>
              Permanently delete enquiry from {deleting?.name} ({deleting?.phone})? This cannot be undone.
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
