import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Plus, Send, Trash2 } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/auth-context'
import { getErrorMessage } from '@/lib/api'
import { cn } from '@/lib/utils'
import { formWebhookService, type WebhookPayload, type WebhookRequestPayload } from '@/services/form-webhook.service'
import { WEBHOOK_METHODS, type Webhook, type WebhookMethod, type WebhookSetup } from '@/types/form-webhook'

type Draft = { name: string; is_enabled: boolean; method: WebhookMethod; url: string; headers: string; body: string }

const DEFAULT_BODY = JSON.stringify({ name: '{{name}}', phone: '{{phone}}', form_id: '{{form_id}}', submitted_at: '{{submitted_at_iso}}' }, null, 2)

const toDraft = (w?: Webhook): Draft => ({
  name: w?.name ?? '',
  is_enabled: w?.is_enabled ?? true,
  method: w?.method ?? 'POST',
  url: w?.url ?? '',
  headers: JSON.stringify(w?.headers ?? {}, null, 2),
  body: !w ? DEFAULT_BODY : w.body === null ? '' : JSON.stringify(w.body, null, 2),
})

function parseJson(label: string, text: string) {
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${(error as Error).message}`)
  }
}

function toRequest(draft: Draft): WebhookRequestPayload {
  if (!draft.url.trim()) throw new Error('URL is required')
  const headers = draft.headers.trim() ? parseJson('Headers', draft.headers) : {}
  if (!headers || typeof headers !== 'object' || Array.isArray(headers) || Object.values(headers).some((v) => typeof v !== 'string')) {
    throw new Error('Headers must be a JSON object with text values, e.g. {"Authorization": "Bearer token"}')
  }
  const body = draft.method !== 'GET' && draft.body.trim() ? parseJson('Body', draft.body) : null
  return { method: draft.method, url: draft.url.trim(), headers, body }
}

const insideString = (text: string) => (text.replace(/\\./g, '').match(/"/g)?.length ?? 0) % 2 === 1

function insertVariable(name: string) {
  const el = document.activeElement
  const isJson = el instanceof HTMLTextAreaElement && 'json' in el.dataset
  const token = isJson && !insideString(el.value.slice(0, el.selectionStart)) ? `"{{${name}}}"` : `{{${name}}}`
  const target = isJson || (el instanceof HTMLInputElement && 'variables' in el.dataset)
  if (target && document.execCommand('insertText', false, token)) return
  navigator.clipboard
    .writeText(token)
    .then(() => toast.success(`${token} copied. Click in URL, headers or body first to insert directly.`))
    .catch(() => toast.error('Click in URL, headers or body first'))
}

function JsonField({ id, label, value, onChange, hint }: { id: string; label: string; value: string; onChange: (v: string) => void; hint: string }) {
  const format = () => {
    try {
      onChange(JSON.stringify(JSON.parse(value), null, 2))
    } catch (error) {
      toast.error(`${label}: ${(error as Error).message}`)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <Button type="button" size="sm" variant="ghost" disabled={!value.trim()} onClick={format}>
          Format
        </Button>
      </div>
      <Textarea
        id={id}
        data-json
        spellCheck={false}
        className="min-h-32 font-mono text-xs md:text-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  )
}

type EditorProps = {
  setup: WebhookSetup
  webhook?: Webhook
  onSaved: (webhook: Webhook) => void
  onDeleted: () => void
}

function WebhookEditor({ setup, webhook, onSaved, onDeleted }: EditorProps) {
  const { can } = useAuth()
  const formId = setup.form.id
  const [draft, setDraft] = useState(() => toDraft(webhook))
  const [deleting, setDeleting] = useState(false)

  const patch = (value: Partial<Draft>) => setDraft((d) => ({ ...d, ...value }))

  const save = useMutation({
    mutationFn: () => {
      const payload: WebhookPayload = { ...toRequest(draft), name: draft.name.trim(), is_enabled: draft.is_enabled }
      if (!payload.name) throw new Error('Name is required')
      return webhook ? formWebhookService.update(formId, webhook.id, payload) : formWebhookService.create(formId, payload)
    },
    onSuccess: (saved) => {
      toast.success(`${saved.name} saved`)
      onSaved(saved)
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const remove = useMutation({
    mutationFn: () => formWebhookService.remove(formId, webhook!.id),
    onSuccess: () => {
      toast.success('Webhook deleted')
      setDeleting(false)
      onDeleted()
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const test = useMutation({
    mutationFn: () => formWebhookService.test(formId, toRequest(draft)),
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const outcome = test.data

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="wh-name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input id="wh-name" placeholder="CRM lead push" value={draft.name} onChange={(e) => patch({ name: e.target.value })} />
        </div>

        <div className="flex items-center gap-3 rounded-md border p-3">
          <Switch id="wh-enabled" checked={draft.is_enabled} onCheckedChange={(v) => patch({ is_enabled: v })} />
          <Label htmlFor="wh-enabled">Trigger this webhook on every new enquiry</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wh-url">
            Request <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Select value={draft.method} onValueChange={(v) => patch({ method: v as WebhookMethod })}>
              <SelectTrigger className="w-28 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WEBHOOK_METHODS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="wh-url"
              data-variables
              placeholder="https://api.example.com/leads"
              value={draft.url}
              onChange={(e) => patch({ url: e.target.value })}
            />
          </div>
          <p className="text-xs text-muted-foreground">Variables in the URL are URL-encoded, e.g. ?phone={'{{phone}}'}</p>
        </div>

        <JsonField
          id="wh-headers"
          label="Headers (JSON)"
          value={draft.headers}
          onChange={(v) => patch({ headers: v })}
          hint='JSON object of text values, e.g. {"Authorization": "Bearer xxx"}. Content-Type defaults to application/json when a body is sent.'
        />

        {draft.method === 'GET' ? (
          <p className="rounded-md border p-3 text-sm text-muted-foreground">
            GET requests send no body. Put variables in the URL query instead.
          </p>
        ) : (
          <JsonField
            id="wh-body"
            label="Body (JSON)"
            value={draft.body}
            onChange={(v) => patch({ body: v })}
            hint='A value of exactly "{{field}}" keeps the submitted type (number, list, object). Inside longer text it is inserted as text. Leave empty to send no body.'
          />
        )}

        <div className="flex justify-between gap-2">
          {webhook && can('delete') ? (
            <Button variant="destructive" onClick={() => setDeleting(true)}>
              <Trash2 /> Delete
            </Button>
          ) : (
            <span />
          )}
          <Button disabled={save.isPending} onClick={() => save.mutate()}>
            {save.isPending ? 'Saving...' : webhook ? 'Save Webhook' : 'Create Webhook'}
          </Button>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
        <div className="rounded-md border">
          <div className="border-b px-3 py-2">
            <p className="font-medium">Variables</p>
            <p className="text-xs text-muted-foreground">Click in URL, headers or body, then click a variable to insert.</p>
          </div>
          <ul className="max-h-[40vh] divide-y overflow-y-auto">
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
          <Label>Send Test Request</Label>
          <p className="text-xs text-muted-foreground">Sends the current unsaved setup once, filled with the latest enquiry.</p>
          <Button className="w-full" variant="outline" disabled={test.isPending} onClick={() => test.mutate()}>
            <Send /> {test.isPending ? 'Sending...' : 'Send Test'}
          </Button>
          {outcome && (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <Badge variant={outcome.result.ok ? 'default' : 'destructive'}>
                  {outcome.result.status_code ?? 'No response'}
                </Badge>
                <span className="text-muted-foreground">{outcome.result.duration_ms} ms</span>
              </div>
              {outcome.result.error && <p className="break-words text-destructive">{outcome.result.error}</p>}
              {outcome.result.response && (
                <pre className="max-h-48 overflow-auto rounded bg-muted p-2 whitespace-pre-wrap break-all">{outcome.result.response}</pre>
              )}
              <details>
                <summary className="cursor-pointer text-muted-foreground">Sent request</summary>
                <pre className="mt-1 max-h-64 overflow-auto rounded bg-muted p-2 whitespace-pre-wrap break-all">
                  {`${outcome.request.method} ${outcome.request.url}\n\n${Object.entries(outcome.request.headers)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join('\n')}${outcome.request.body ? `\n\n${outcome.request.body}` : ''}`}
                </pre>
              </details>
            </div>
          )}
        </div>
      </aside>

      <Dialog open={deleting} onOpenChange={setDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Webhook</DialogTitle>
            <DialogDescription>Delete webhook {webhook?.name}? Its past delivery logs stay on the enquiries.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={remove.isPending} onClick={() => remove.mutate()}>
              {remove.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function WebhookManager({ setup }: { setup: WebhookSetup }) {
  const qc = useQueryClient()
  const key = ['form-webhooks', setup.form.id]
  const [selected, setSelected] = useState<number | 'new'>(setup.webhooks[0]?.id ?? 'new')
  const webhook = setup.webhooks.find((w) => w.id === selected)

  const updateSetup = (fn: (webhooks: Webhook[]) => Webhook[]) => {
    qc.setQueryData<WebhookSetup>(key, (s) => s && { ...s, webhooks: fn(s.webhooks) })
    qc.invalidateQueries({ queryKey: ['form-webhooks'], exact: true })
  }

  const onSaved = (saved: Webhook) => {
    updateSetup((list) => (list.some((w) => w.id === saved.id) ? list.map((w) => (w.id === saved.id ? saved : w)) : [...list, saved]))
    setSelected(saved.id)
  }

  const onDeleted = () => {
    const rest = setup.webhooks.filter((w) => w.id !== selected)
    updateSetup(() => rest)
    setSelected(rest[0]?.id ?? 'new')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {setup.webhooks.map((w) => (
          <Button key={w.id} variant={w.id === selected ? 'default' : 'outline'} onClick={() => setSelected(w.id)}>
            <span className={cn('size-2 rounded-full', w.is_enabled ? 'bg-green-500' : 'bg-muted-foreground/40')} />
            {w.name}
          </Button>
        ))}
        <Button variant={selected === 'new' ? 'default' : 'outline'} onClick={() => setSelected('new')}>
          <Plus /> New Webhook
        </Button>
      </div>

      <WebhookEditor key={selected} setup={setup} webhook={webhook} onSaved={onSaved} onDeleted={onDeleted} />
    </div>
  )
}

export function WebhookSetupPage() {
  const id = Number(useParams().id)
  const { data, isLoading, error } = useQuery({
    queryKey: ['form-webhooks', id],
    queryFn: () => formWebhookService.get(id),
    retry: false,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button size="icon-sm" variant="ghost" title="Back" asChild>
          <Link to="/webhooks">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">{data ? `${data.form.name} Webhooks` : 'Webhook Setup'}</h1>
          {data && <p className="text-sm text-muted-foreground">Form ID: {data.form.form_id}</p>}
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="rounded-md border border-destructive/50 p-4 text-destructive">{getErrorMessage(error)}</p>
      ) : data ? (
        <WebhookManager key={data.form.id} setup={data} />
      ) : null}
    </div>
  )
}
