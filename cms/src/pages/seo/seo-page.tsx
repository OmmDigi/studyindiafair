import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { seoService } from '@/services/seo.service'
import { SeoFormDialog } from './seo-form-dialog'

const SEO_KEY = ['seo']

function Status({ ok }: { ok: boolean }) {
  return <Badge variant={ok ? 'default' : 'outline'}>{ok ? 'Set' : 'Missing'}</Badge>
}

export function SeoPage() {
  const qc = useQueryClient()
  const { data = [], isLoading } = useQuery({ queryKey: SEO_KEY, queryFn: seoService.list })
  const [search, setSearch] = useState('')
  const [pageId, setPageId] = useState<number | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const term = search.trim().toLowerCase()
  const rows = term ? data.filter((p) => p.name.toLowerCase().includes(term) || p.slug.includes(term)) : data

  const openForm = (id: number) => {
    setPageId(id)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">SEO</h1>

      <Input
        placeholder="Search page name or slug"
        className="max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>Meta Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>OG Image</TableHead>
              <TableHead>Canonical</TableHead>
              <TableHead>Schema</TableHead>
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
            ) : !rows.length ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No pages found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((p) => (
                <TableRow key={p.page_id}>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </TableCell>
                  <TableCell className="max-w-64 truncate" title={p.meta_title ?? ''}>
                    {p.meta_title ?? <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell><Status ok={!!p.meta_description} /></TableCell>
                  <TableCell><Status ok={!!p.og_image_path} /></TableCell>
                  <TableCell><Status ok={!!p.canonical_url} /></TableCell>
                  <TableCell><Status ok={p.has_schema} /></TableCell>
                  <TableCell className="text-right">
                    <Button size="icon-sm" variant="ghost" title="Edit SEO" onClick={() => openForm(p.page_id)}>
                      <Pencil />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SeoFormDialog
        key={formKey}
        open={formOpen}
        pageId={pageId}
        onOpenChange={setFormOpen}
        onSaved={() => qc.invalidateQueries({ queryKey: SEO_KEY })}
      />
    </div>
  )
}
