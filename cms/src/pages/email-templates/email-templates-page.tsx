import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formEmailService } from '@/services/form-email.service'
import type { TemplateStatus } from '@/types/form-email'
import { SetupEmailButton } from './setup-email-button'

function StatusBadge({ status }: { status: TemplateStatus }) {
  if (!status) return <Badge variant="outline">Not set</Badge>
  return <Badge variant={status.is_enabled ? 'default' : 'secondary'}>{status.is_enabled ? 'Enabled' : 'Disabled'}</Badge>
}

export function EmailTemplatesPage() {
  const { data = [], isLoading } = useQuery({ queryKey: ['form-email-templates'], queryFn: formEmailService.list })
  const [search, setSearch] = useState('')

  const term = search.trim().toLowerCase()
  const rows = term ? data.filter((f) => f.name.toLowerCase().includes(term) || f.form_id.includes(term)) : data

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Email Templates</h1>

      <Input
        placeholder="Search form name or form ID"
        className="max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Form</TableHead>
              <TableHead>Form ID</TableHead>
              <TableHead>Enquiries</TableHead>
              <TableHead>Admin Email</TableHead>
              <TableHead>Student Email</TableHead>
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
            ) : !rows.length ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No forms found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell className="text-muted-foreground">{f.form_id}</TableCell>
                  <TableCell>{f.enquiry_count}</TableCell>
                  <TableCell>
                    <StatusBadge status={f.admin} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={f.student} />
                  </TableCell>
                  <TableCell className="text-right">
                    <SetupEmailButton form={f} label />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
