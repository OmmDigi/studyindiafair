import type { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Editor from '@/components/Editor'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { toEditorData } from '@/lib/editor'
import { siteSettingsService } from '@/services/site-settings.service'
import type { SiteSettings } from '@/types/site-settings'

const UPLOAD_FOLDER = 'site-settings'
const FAVICON_TYPES = ['image/png', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon']
const LOGO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

const httpUrl = z.string().trim().pipe(z.url({ protocol: /^https?$/, error: 'Enter a valid URL (http/https)' }))

const schema = z.object({
  phones: z.array(
    z.object({
      label: z.string().trim().max(80),
      number: z.string().trim().min(5, 'Enter a valid number').max(30).regex(/^[+\d\s()-]+$/, 'Invalid phone number'),
      is_primary: z.boolean(),
      is_whatsapp: z.boolean(),
    })
  ),
  emails: z.array(
    z.object({
      label: z.string().trim().max(80),
      email: z.string().trim().max(160).pipe(z.email('Enter a valid email')),
      is_primary: z.boolean(),
    })
  ),
  addresses: z.array(
    z.object({
      label: z.string().trim().max(80),
      address: z.string().trim().min(3, 'Address is required').max(1000),
      map_link: z.union([z.literal(''), httpUrl]),
    })
  ),
  social_links: z.array(
    z.object({
      name: z.string().trim().min(1, 'Name is required').max(60),
      url: httpUrl,
      icon_path: z.string().nullable(),
    })
  ),
  logo_path: z.string().nullable(),
  favicon_path: z.string().nullable(),
  notice: z.custom<OutputData>().nullable(),
  notice_active: z.boolean(),
})

type FormValues = z.infer<typeof schema>

const toForm = (s: SiteSettings): FormValues => ({
  phones: s.phones,
  emails: s.emails,
  addresses: s.addresses.map((a) => ({ ...a, map_link: a.map_link ?? '' })),
  social_links: s.social_links,
  logo_path: s.logo_path,
  favicon_path: s.favicon_path,
  notice: toEditorData(s.notice),
  notice_active: s.notice_active,
})

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-destructive">{message}</p> : null
}

function RowActions({ index, count, onMove, onRemove }: { index: number; count: number; onMove: (from: number, to: number) => void; onRemove: () => void }) {
  return (
    <div className="flex gap-1">
      <Button type="button" size="icon-sm" variant="ghost" title="Move up" disabled={index === 0} onClick={() => onMove(index, index - 1)}>
        <ArrowUp />
      </Button>
      <Button type="button" size="icon-sm" variant="ghost" title="Move down" disabled={index === count - 1} onClick={() => onMove(index, index + 1)}>
        <ArrowDown />
      </Button>
      <Button type="button" size="icon-sm" variant="ghost" title="Remove" onClick={onRemove}>
        <Trash2 className="text-destructive" />
      </Button>
    </div>
  )
}

function Section({ title, onAdd, empty, children }: { title: string; onAdd?: () => void; empty?: boolean; children: ReactNode }) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="items-center border-b px-6 py-4">
        <CardTitle>{title}</CardTitle>
        {onAdd && (
          <CardAction>
            <Button type="button" size="sm" variant="outline" onClick={onAdd}>
              <Plus /> Add
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {empty ? <p className="text-sm text-muted-foreground">Nothing added yet.</p> : children}
      </CardContent>
    </Card>
  )
}

export function SiteSettingsPage() {
  const qc = useQueryClient()
  const pending = usePendingUploads()
  const [uploads, setUploads] = useState<Record<string, boolean>>({})
  const uploading = Object.values(uploads).some(Boolean)
  const [editorKey, setEditorKey] = useState(0)

  const { data, isLoading } = useQuery({ queryKey: ['site-settings'], queryFn: siteSettingsService.get })

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phones: [], emails: [], addresses: [], social_links: [], logo_path: null, favicon_path: null, notice: null, notice_active: false },
  })

  useEffect(() => {
    if (!data) return
    reset(toForm(data))
    setEditorKey((k) => k + 1)
  }, [data, reset])

  const phones = useFieldArray({ control, name: 'phones' })
  const emails = useFieldArray({ control, name: 'emails' })
  const addresses = useFieldArray({ control, name: 'addresses' })
  const socials = useFieldArray({ control, name: 'social_links' })

  const trackUploading = (key: string) => (busy: boolean) =>
    setUploads((prev) => (!!prev[key] === busy ? prev : { ...prev, [key]: busy }))

  const setPrimary = (name: 'phones' | 'emails', index: number, checked: boolean) => {
    getValues(name).forEach((_, i) => setValue(`${name}.${i}.is_primary`, checked && i === index, { shouldDirty: true }))
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = await siteSettingsService.update({
        ...values,
        addresses: values.addresses.map((a) => ({ ...a, map_link: a.map_link || null })),
      })
      pending.commit([saved.logo_path, saved.favicon_path, ...saved.social_links.map((l) => l.icon_path)])
      qc.setQueryData(['site-settings'], saved)
      toast.success('Site settings saved')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const imageField = (name: 'logo_path' | 'favicon_path' | `social_links.${number}.icon_path`, accept: string[], maxSizeMb: number) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ImageUpload
          folder={UPLOAD_FOLDER}
          accept={accept}
          maxSizeMb={maxSizeMb}
          previewClassName={name === 'logo_path' ? 'h-24 w-48' : 'size-20'}
          value={field.value as string | null}
          onChange={(path) => {
            pending.track(path)
            field.onChange(path)
          }}
          onUploadingChange={trackUploading(field.name)}
        />
      )}
    />
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Site Settings</h1>
        <Button type="submit" disabled={isSubmitting || uploading}>
          {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>

      <Section title="Branding">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Logo</Label>
            {imageField('logo_path', LOGO_TYPES, 2)}
          </div>
          <div className="space-y-2">
            <Label>Favicon</Label>
            {imageField('favicon_path', FAVICON_TYPES, 1)}
          </div>
        </div>
      </Section>

      <Section
        title="Phone Numbers"
        empty={!phones.fields.length}
        onAdd={() => phones.append({ label: '', number: '', is_primary: !phones.fields.length, is_whatsapp: false })}
      >
        {phones.fields.map((f, i) => (
          <div key={f.id} className="grid items-start gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-[1fr_1.5fr_auto]">
            <Input placeholder="Label (e.g. Admissions)" {...register(`phones.${i}.label`)} />
            <div className="space-y-1.5">
              <Input placeholder="+91 98765 43210" {...register(`phones.${i}.number`)} />
              <FieldError message={errors.phones?.[i]?.number?.message} />
            </div>
            <RowActions index={i} count={phones.fields.length} onMove={phones.move} onRemove={() => phones.remove(i)} />
            <div className="flex flex-wrap gap-6 pt-1 sm:col-span-3">
              <Controller
                control={control}
                name={`phones.${i}.is_primary`}
                render={({ field }) => (
                  <Label className="font-normal">
                    <Switch checked={field.value} onCheckedChange={(c) => setPrimary('phones', i, c)} /> Primary
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`phones.${i}.is_whatsapp`}
                render={({ field }) => (
                  <Label className="font-normal">
                    <Switch checked={field.value} onCheckedChange={field.onChange} /> WhatsApp
                  </Label>
                )}
              />
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Email Addresses"
        empty={!emails.fields.length}
        onAdd={() => emails.append({ label: '', email: '', is_primary: !emails.fields.length })}
      >
        {emails.fields.map((f, i) => (
          <div key={f.id} className="grid items-start gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-[1fr_1.5fr_auto]">
            <Input placeholder="Label (e.g. Support)" {...register(`emails.${i}.label`)} />
            <div className="space-y-1.5">
              <Input type="email" placeholder="info@example.com" {...register(`emails.${i}.email`)} />
              <FieldError message={errors.emails?.[i]?.email?.message} />
            </div>
            <RowActions index={i} count={emails.fields.length} onMove={emails.move} onRemove={() => emails.remove(i)} />
            <Controller
              control={control}
              name={`emails.${i}.is_primary`}
              render={({ field }) => (
                <Label className="pt-1 font-normal sm:col-span-3">
                  <Switch checked={field.value} onCheckedChange={(c) => setPrimary('emails', i, c)} /> Primary
                </Label>
              )}
            />
          </div>
        ))}
      </Section>

      <Section
        title="Addresses"
        empty={!addresses.fields.length}
        onAdd={() => addresses.append({ label: '', address: '', map_link: '' })}
      >
        {addresses.fields.map((f, i) => (
          <div key={f.id} className="grid items-start gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-[1fr_auto]">
            <Input placeholder="Label (e.g. Head Office)" {...register(`addresses.${i}.label`)} />
            <RowActions index={i} count={addresses.fields.length} onMove={addresses.move} onRemove={() => addresses.remove(i)} />
            <div className="space-y-1.5 sm:col-span-2">
              <Textarea rows={3} placeholder="Full address" {...register(`addresses.${i}.address`)} />
              <FieldError message={errors.addresses?.[i]?.address?.message} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Input placeholder="Google Maps link (https://maps.app.goo.gl/...)" {...register(`addresses.${i}.map_link`)} />
              <FieldError message={errors.addresses?.[i]?.map_link?.message} />
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Social Media Links"
        empty={!socials.fields.length}
        onAdd={() => socials.append({ name: '', url: '', icon_path: null })}
      >
        {socials.fields.map((f, i) => (
          <div key={f.id} className="grid items-start gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-[auto_1fr_auto]">
            {imageField(`social_links.${i}.icon_path`, LOGO_TYPES, 1)}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Input placeholder="Name (e.g. Facebook)" {...register(`social_links.${i}.name`)} />
                <FieldError message={errors.social_links?.[i]?.name?.message} />
              </div>
              <div className="space-y-1.5">
                <Input placeholder="https://facebook.com/yourpage" {...register(`social_links.${i}.url`)} />
                <FieldError message={errors.social_links?.[i]?.url?.message} />
              </div>
            </div>
            <RowActions index={i} count={socials.fields.length} onMove={socials.move} onRemove={() => socials.remove(i)} />
          </div>
        ))}
      </Section>

      <Section title="Notice">
        <Controller
          control={control}
          name="notice_active"
          render={({ field }) => (
            <Label className="font-normal">
              <Switch checked={field.value} onCheckedChange={field.onChange} /> Show notice on website
            </Label>
          )}
        />
        <Controller
          control={control}
          name="notice"
          render={({ field }) => (
            <Editor
              key={editorKey}
              initData={toEditorData(data?.notice) ?? undefined}
              onSave={(d) => field.onChange(d.blocks.length ? d : null)}
            />
          )}
        />
      </Section>
    </form>
  )
}
