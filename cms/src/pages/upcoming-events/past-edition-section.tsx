import type { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch, type Control } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Editor from '@/components/Editor'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useFieldDrag } from '@/hooks/use-field-drag'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { toEditorData } from '@/lib/editor'
import { fileUrl } from '@/lib/upload'
import { upcomingEventService } from '@/services/upcoming-event.service'
import type { UpcomingEvent } from '@/types/upcoming-event'

const UPLOAD_FOLDER = 'past-editions'
const ICON_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_CARDS = 12
const COLORS = ['#fdeee4', '#e8f2fc', '#eaf7ee', '#f3ecfb']
const HEX = /^#[0-9a-f]{6}$/i

const schema = z.object({
  is_active: z.boolean(),
  heading: z.string().trim().min(1, 'Heading is required').max(200),
  description: z.custom<OutputData>().nullable(),
  cards: z
    .array(
      z.object({
        icon_path: z.string().nullable().refine((v) => !!v, 'Icon is required'),
        value: z.string().trim().min(1, 'Value is required').max(50),
        title: z.string().trim().min(1, 'Title is required').max(150),
        description: z.string().max(500),
        bg_color: z.string().regex(HEX, 'Use a hex color like #fdeee4'),
        bg_image_path: z.string().nullable(),
      })
    )
    .min(1, 'Add at least one card')
    .max(MAX_CARDS),
})

type FormValues = z.infer<typeof schema>
type CardValues = FormValues['cards'][number]

const newCard = (index: number): CardValues => ({
  icon_path: null,
  value: '',
  title: '',
  description: '',
  bg_color: COLORS[index % COLORS.length],
  bg_image_path: null,
})

const toForm = (event: UpcomingEvent): FormValues => {
  const p = event.past_edition
  if (!p) return { is_active: true, heading: 'Past Edition at a Glance', description: null, cards: [newCard(0), newCard(1)] }
  return {
    is_active: p.is_active,
    heading: p.heading,
    description: toEditorData(p.description),
    cards: p.cards.map((c) => ({ ...c, description: c.description ?? '' })),
  }
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-destructive">{message}</p> : null
}

function CardPreview({ control, index }: { control: Control<FormValues>; index: number }) {
  const card = useWatch({ control, name: `cards.${index}` })
  const bg = fileUrl(card.bg_image_path)
  const icon = fileUrl(card.icon_path)
  return (
    <div
      className="relative flex min-h-36 gap-4 overflow-hidden rounded-lg border p-4"
      style={{ backgroundColor: HEX.test(card.bg_color) ? card.bg_color : undefined }}
    >
      {bg && <img src={bg} alt="" className="absolute inset-0 size-full object-cover opacity-40" />}
      <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        {icon && <img src={icon} alt="" className="size-7 object-contain" />}
      </div>
      <div className="relative min-w-0 space-y-1 text-[#0b2a4a]">
        <p className="text-3xl leading-none font-bold">{card.value || '17'}</p>
        <p className="font-semibold">{card.title || 'Card title'}</p>
        <p className="line-clamp-3 text-xs text-slate-700">{card.description || 'Short description'}</p>
      </div>
    </div>
  )
}

type Props = {
  event: UpcomingEvent
  onSaved: (event: UpcomingEvent) => void
}

export function PastEditionSection({ event, onSaved }: Props) {
  const pending = usePendingUploads()
  const [uploads, setUploads] = useState<Record<string, boolean>>({})
  const uploading = Object.values(uploads).some(Boolean)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: toForm(event) })

  const cards = useFieldArray({ control, name: 'cards' })
  const drag = useFieldDrag(cards.move)

  const trackUploading = (key: string) => (busy: boolean) =>
    setUploads((prev) => (!!prev[key] === busy ? prev : { ...prev, [key]: busy }))

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = await upcomingEventService.updatePastEdition(event.id, {
        ...values,
        cards: values.cards.map((c) => ({
          ...c,
          icon_path: c.icon_path!,
          description: c.description.trim() || null,
        })),
      })
      pending.commit(saved.past_edition?.cards.flatMap((c) => [c.icon_path, c.bg_image_path]) ?? [])
      toast.success('Past edition saved')
      onSaved(saved)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const imageField = (name: `cards.${number}.icon_path` | `cards.${number}.bg_image_path`, isIcon: boolean) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ImageUpload
          folder={UPLOAD_FOLDER}
          accept={isIcon ? ICON_TYPES : IMAGE_TYPES}
          maxSizeMb={isIcon ? 1 : 3}
          previewClassName={isIcon ? 'size-20' : 'h-20 w-32'}
          value={field.value}
          onChange={(path) => {
            pending.track(path)
            field.onChange(path)
          }}
          onUploadingChange={trackUploading(field.name)}
        />
      )}
    />
  )

  const cardsError = errors.cards?.message ?? errors.cards?.root?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="gap-0 py-0">
        <CardHeader className="items-center border-b px-6 py-4">
          <CardTitle>Past Edition at a Glance</CardTitle>
          <CardDescription>Stats section shown on this event page.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-4">
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <Label className="gap-2">
                    <Switch checked={field.value} onCheckedChange={field.onChange} /> Show on page
                  </Label>
                )}
              />
              <Button type="submit" size="sm" disabled={isSubmitting || uploading}>
                {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-1.5">
            <Label>Heading</Label>
            <Input placeholder="Past Edition at a Glance" {...register('heading')} />
            <FieldError message={errors.heading?.message} />
          </div>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Editor
                label="Description"
                initData={field.value ?? undefined}
                onSave={(d) => field.onChange(d.blocks.length ? d : null)}
              />
            )}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Cards</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={cards.fields.length >= MAX_CARDS}
                onClick={() => cards.append(newCard(cards.fields.length))}
              >
                <Plus /> Add Card
              </Button>
            </div>
            <FieldError message={cardsError} />
            {cards.fields.map((f, i) => (
              <div key={f.id} {...drag.itemProps(i)} className="space-y-4 rounded-lg border bg-muted/30 p-4 data-dragging:opacity-40">
                <div className="flex items-center gap-2">
                  <span {...drag.handleProps(i)} title="Drag to reorder" className="cursor-grab touch-none text-muted-foreground">
                    <GripVertical className="size-4" />
                  </span>
                  <span className="text-sm font-medium">Card {i + 1}</span>
                  <div className="ml-auto flex gap-1">
                    <Button type="button" size="icon-sm" variant="ghost" title="Move up" disabled={i === 0} onClick={() => cards.move(i, i - 1)}>
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      title="Move down"
                      disabled={i === cards.fields.length - 1}
                      onClick={() => cards.move(i, i + 1)}
                    >
                      <ArrowDown />
                    </Button>
                    <Button type="button" size="icon-sm" variant="ghost" title="Remove" onClick={() => cards.remove(i)}>
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
                      <div className="space-y-1.5">
                        <Label>Value</Label>
                        <Input placeholder="1200+" {...register(`cards.${i}.value`)} />
                        <FieldError message={errors.cards?.[i]?.value?.message} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Title</Label>
                        <Input placeholder="Students Visited" {...register(`cards.${i}.title`)} />
                        <FieldError message={errors.cards?.[i]?.title?.message} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Short Description</Label>
                      <Textarea rows={3} maxLength={500} {...register(`cards.${i}.description`)} />
                      <FieldError message={errors.cards?.[i]?.description?.message} />
                    </div>
                    <div className="flex flex-wrap items-start gap-6">
                      <div className="space-y-1.5">
                        <Label>Icon</Label>
                        {imageField(`cards.${i}.icon_path`, true)}
                        <FieldError message={errors.cards?.[i]?.icon_path?.message} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Background Image (optional)</Label>
                        {imageField(`cards.${i}.bg_image_path`, false)}
                      </div>
                      <div className="space-y-1.5">
                        <Label>Background Color</Label>
                        <Controller
                          control={control}
                          name={`cards.${i}.bg_color`}
                          render={({ field }) => (
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={HEX.test(field.value) ? field.value : '#ffffff'}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="size-9 cursor-pointer rounded-md border bg-transparent p-0.5"
                              />
                              <Input className="w-28" value={field.value} onChange={field.onChange} />
                            </div>
                          )}
                        />
                        <FieldError message={errors.cards?.[i]?.bg_color?.message} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Preview</Label>
                    <CardPreview control={control} index={i} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
