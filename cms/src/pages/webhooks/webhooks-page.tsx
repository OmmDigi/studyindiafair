import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formWebhookService } from '@/services/form-webhook.service'
import { SetupWebhookButton } from './setup-webhook-button'

export function WebhooksPage() {
  const { data = [], isLoading } = useQuery({ queryKey: ['form-webhooks'], queryFn: formWebhookService.list })
  const [search, setSearch] = useState('')

  const term = search.trim().toLowerCase()
  const rows = term ? data.filter((f) => f.name.toLowerCase().includes(term) || f.form_id.includes(term)) : data

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Webhooks</h1>

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
              <TableHead>Webhooks</TableHead>
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
            ) : !rows.length ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
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
                    {f.webhook_count ? (
                      <Badge variant={f.enabled_count ? 'default' : 'secondary'}>
                        {f.enabled_count} of {f.webhook_count} enabled
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not set</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <SetupWebhookButton form={f} label />
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
