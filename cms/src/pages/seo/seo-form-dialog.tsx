import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { seoService } from '@/services/seo.service'
import type { PageSeo } from '@/types/seo'

const UPLOAD_FOLDER = 'seo'
const SCRIPT_BLOCK = /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi

const isValidSchemaScript = (value: string) => {
  const blocks = [...value.matchAll(SCRIPT_BLOCK)]
  if (!blocks.length || value.replace(SCRIPT_BLOCK, '').trim() !== '') return false
  return blocks.every(([, body]) => {
    try {
      const parsed = JSON.parse(body)
      return typeof parsed === 'object' && parsed !== null
    } catch {
      return false
    }
  })
}

const schema = z.object({
  meta_title: z.string().trim().max(200),
  meta_description: z.string().trim().max(500),
  canonical_url: z.union([
    z.literal(''),
    z.string().trim().pipe(z.url({ protocol: /^https?$/, error: 'Enter a valid URL (http/https)' })),
  ]),
  og_title: z.string().trim().max(200),
  og_description: z.string().trim().max(500),
  og_image_path: z.string().nullable(),
  schema_script: z
    .string()
    .trim()
    .max(50000)
    .refine((v) => !v || isValidSchemaScript(v), 'Paste only <script type="application/ld+json"> blocks with valid JSON'),
  schema_position: z.enum(['head', 'body']),
})

type FormValues = z.infer<typeof schema>

const toForm = (s: PageSeo): FormValues => ({
  meta_title: s.meta_title ?? '',
  meta_description: s.meta_description ?? '',
  canonical_url: s.canonical_url ?? '',
  og_title: s.og_title ?? '',
  og_description: s.og_description ?? '',
  og_image_path: s.og_image_path,
  schema_script: s.schema_script ?? '',
  schema_position: s.schema_position,
})

const nullIfEmpty = (v: string) => v || null

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label>{label}</Label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

type Props = {
  open: boolean
  pageId: number | null
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function SeoFormDialog({ open, pageId, onOpenChange, onSaved }: Props) {
  const [uploading, setUploading] = useState(false)
  const pending = usePendingUploads()

  const { data, isLoading } = useQuery({
    queryKey: ['seo', pageId],
    queryFn: () => seoService.get(pageId!),
    enabled: open && !!pageId,
    gcTime: 0,
  })

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: data ? toForm(data) : undefined,
  })

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = await seoService.save(pageId!, {
        meta_title: nullIfEmpty(values.meta_title),
        meta_description: nullIfEmpty(values.meta_description),
        canonical_url: nullIfEmpty(values.canonical_url),
        og_title: nullIfEmpty(values.og_title),
        og_description: nullIfEmpty(values.og_description),
        og_image_path: values.og_image_path,
        schema_script: nullIfEmpty(values.schema_script),
        schema_position: values.schema_position,
      })
      pending.commit(saved.og_image_path)
      toast.success('SEO saved')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const count = (name: 'meta_title' | 'meta_description' | 'og_title' | 'og_description', max: number) =>
    `${watch(name)?.length ?? 0}/${max}`

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>SEO{data ? ` · ${data.page_name}` : ''}</DialogTitle>
          {data && <DialogDescription>/{data.page_slug}</DialogDescription>}
        </DialogHeader>
        {isLoading || !data ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <section className="space-y-4">
              <h3 className="text-sm font-semibold">Meta</h3>
              <Field label="Meta Title" hint={count('meta_title', 60)} error={errors.meta_title?.message}>
                <Input {...register('meta_title')} />
              </Field>
              <Field label="Meta Description" hint={count('meta_description', 160)} error={errors.meta_description?.message}>
                <Textarea rows={3} {...register('meta_description')} />
              </Field>
              <Field label="Canonical URL" error={errors.canonical_url?.message}>
                <Input placeholder="https://example.com/page" {...register('canonical_url')} />
              </Field>
            </section>

            <section className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Open Graph</h3>
              <Field label="OG Title" hint={count('og_title', 60)} error={errors.og_title?.message}>
                <Input placeholder="Falls back to meta title if empty" {...register('og_title')} />
              </Field>
              <Field label="OG Description" hint={count('og_description', 200)} error={errors.og_description?.message}>
                <Textarea rows={3} placeholder="Falls back to meta description if empty" {...register('og_description')} />
              </Field>
              <Field label="OG Image" hint="Recommended 1200×630">
                <Controller
                  control={control}
                  name="og_image_path"
                  render={({ field }) => (
                    <ImageUpload
                      folder={UPLOAD_FOLDER}
                      previewClassName="h-32 w-60"
                      value={field.value}
                      onChange={(path) => {
                        pending.track(path)
                        field.onChange(path)
                      }}
                      onUploadingChange={setUploading}
                    />
                  )}
                />
              </Field>
            </section>

            <section className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">JSON-LD Schema</h3>
              <Field label="Schema Script" error={errors.schema_script?.message}>
                <Textarea
                  rows={10}
                  className="font-mono text-xs"
                  placeholder={'<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "WebPage"\n}\n</script>'}
                  {...register('schema_script')}
                />
              </Field>
              <Field label="Inject Schema In">
                <Controller
                  control={control}
                  name="schema_position"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="head">&lt;head&gt;</SelectItem>
                        <SelectItem value="body">&lt;body&gt;</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </section>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting || uploading}>
                {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
