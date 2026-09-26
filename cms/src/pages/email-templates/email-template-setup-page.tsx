import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Send } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { toast } from 'sonner'
import Editor from '@/components/Editor'
import { EmailListInput } from '@/components/email-list-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { getErrorMessage } from '@/lib/api'
import { toEditorData } from '@/lib/editor'
import { formEmailService, type TemplatePayload } from '@/services/form-email.service'
import { TEMPLATE_TYPE_LABELS, TEMPLATE_TYPES, type EmailSetup, type TemplateType } from '@/types/form-email'

const toDraft = (setup: EmailSetup, type: TemplateType): TemplatePayload => {
  const t = setup.templates[type]
  return {
    is_enabled: t?.is_enabled ?? false,
    to_emails: t?.to_emails ?? [],
    recipient_field: t?.recipient_field ?? (type === 'student' && setup.variables.includes('email') ? 'email' : null),
    cc: t?.cc ?? [],
    bcc: t?.bcc ?? [],
    reply_to: t?.reply_to ?? null,
    subject: t?.subject ?? '',
    body: toEditorData(t?.body),
  }
}

function insertVariable(name: string) {
  const token = `{{${name}}}`
  const el = document.activeElement as HTMLElement | null
  const target = el && ((el instanceof HTMLInputElement && 'variables' in el.dataset) || (el.isContentEditable && el.closest('.editor-content')))
  if (target && document.execCommand('insertText', false, token)) return
  navigator.clipboard
    .writeText(token)
    .then(() => toast.success(`${token} copied. Click in subject or body first to insert directly.`))
    .catch(() => toast.error('Click in subject or body first'))
}

function TemplateEditor({ setup }: { setup: EmailSetup }) {
  const qc = useQueryClient()
  const formId = setup.form.id
  const [type, setType] = useState<TemplateType>('admin')
  const [drafts, setDrafts] = useState(() => ({ admin: toDraft(setup, 'admin'), student: toDraft(setup, 'student') }))
  const [testTo, setTestTo] = useState('')
  const draft = drafts[type]

  const patch = (value: Partial<TemplatePayload>) => setDrafts((d) => ({ ...d, [type]: { ...d[type], ...value } }))

  const save = useMutation({
    mutationFn: () => formEmailService.save(formId, type, draft),
    onSuccess: () => {
      toast.success(`${TEMPLATE_TYPE_LABELS[type]} saved`)
      qc.invalidateQueries({ queryKey: ['form-email-templates'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const test = useMutation({
    mutationFn: () => formEmailService.test(formId, type, { ...draft, test_to: testTo.trim() }),
    onSuccess: () => toast.success(`Test email sent to ${testTo.trim()}`),
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {TEMPLATE_TYPES.map((t) => (
          <Button key={t} variant={t === type ? 'default' : 'outline'} onClick={() => setType(t)}>
            {TEMPLATE_TYPE_LABELS[t]}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-md border p-3">
            <Switch id="tpl-enabled" checked={draft.is_enabled} onCheckedChange={(v) => patch({ is_enabled: v })} />
            <Label htmlFor="tpl-enabled">
              Send {type === 'admin' ? 'admin notification' : 'student email'} on every new enquiry
            </Label>
          </div>

          {type === 'admin' ? (
            <div className="space-y-2">
              <Label htmlFor="tpl-to">
                Admin Emails <span className="text-destructive">*</span>
              </Label>
              <EmailListInput id="tpl-to" value={draft.to_emails} onChange={(v) => patch({ to_emails: v })} />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>
                Student Email Field <span className="text-destructive">*</span>
              </Label>
              <Select value={draft.recipient_field ?? undefined} onValueChange={(v) => patch({ recipient_field: v })}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select enquiry field" />
                </SelectTrigger>
                <SelectContent>
                  {setup.variables.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Enquiry field holding the student email. Skipped when an enquiry has no valid email in it.
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tpl-cc">CC</Label>
              <EmailListInput id="tpl-cc" value={draft.cc} onChange={(v) => patch({ cc: v })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tpl-bcc">BCC</Label>
              <EmailListInput id="tpl-bcc" value={draft.bcc} onChange={(v) => patch({ bcc: v })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tpl-reply">Reply-To</Label>
            <Input
              id="tpl-reply"
              data-variables
              placeholder={type === 'admin' ? '{{email}} or support@example.com' : 'support@example.com'}
              value={draft.reply_to ?? ''}
              onChange={(e) => patch({ reply_to: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tpl-subject">
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tpl-subject"
              data-variables
              placeholder="New enquiry from {{name}}"
              value={draft.subject}
              onChange={(e) => patch({ subject: e.target.value })}
            />
          </div>

          <Editor
            key={type}
            label="Body *"
            initData={draft.body ?? undefined}
            onSave={(data) => patch({ body: data.blocks.length ? data : null })}
          />

          <div className="flex justify-end">
            <Button disabled={save.isPending} onClick={() => save.mutate()}>
              {save.isPending ? 'Saving...' : `Save ${TEMPLATE_TYPE_LABELS[type]}`}
            </Button>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-md border">
            <div className="border-b px-3 py-2">
              <p className="font-medium">Variables</p>
              <p className="text-xs text-muted-foreground">Click in subject or body, then click a variable to insert.</p>
            </div>
            <ul className="max-h-[50vh] divide-y overflow-y-auto">
              {setup.variables.map((v) => (
                <li key={v}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-muted"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => insertVariable(v)}
                  >
                    <span className="font-mono text-sm">{`{{${v}}}`}</span>
                    <span className="block truncate text-xs text-muted-foreground" title={setup.sample[v]}>
                      {setup.sample[v] || '-'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 rounded-md border p-3">
            <Label htmlFor="tpl-test">Send Test Email</Label>
            <p className="text-xs text-muted-foreground">Uses current unsaved content filled with the latest enquiry.</p>
            <Input id="tpl-test" type="email" placeholder="you@example.com" value={testTo} onChange={(e) => setTestTo(e.target.value)} />
            <Button className="w-full" variant="outline" disabled={!testTo.trim() || test.isPending} onClick={() => test.mutate()}>
              <Send /> {test.isPending ? 'Sending...' : 'Send Test'}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function EmailTemplateSetupPage() {
  const id = Number(useParams().id)
  const { data, isLoading, error } = useQuery({
    queryKey: ['form-email-templates', id],
    queryFn: () => formEmailService.get(id),
    retry: false,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button size="icon-sm" variant="ghost" title="Back" asChild>
          <Link to="/email-templates">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">{data ? `${data.form.name} Emails` : 'Email Setup'}</h1>
          {data && <p className="text-sm text-muted-foreground">Form ID: {data.form.form_id}</p>}
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="rounded-md border border-destructive/50 p-4 text-destructive">{getErrorMessage(error)}</p>
      ) : data ? (
        <TemplateEditor key={data.form.id} setup={data} />
      ) : null}
    </div>
  )
}
