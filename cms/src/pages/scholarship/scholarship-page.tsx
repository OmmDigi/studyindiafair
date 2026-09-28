import type { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Controller, useFieldArray, useForm, type Control } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Editor from '@/components/Editor'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useFieldDrag } from '@/hooks/use-field-drag'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { toEditorData } from '@/lib/editor'
import { scholarshipService } from '@/services/scholarship.service'
import type { Scholarship, ScholarshipPayload } from '@/types/scholarship'

const UPLOAD_FOLDER = 'scholarship'
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ICON_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

const heading = z.string().trim().min(1, 'Heading is required').max(200)
const content = z.custom<OutputData>().nullable()
const requiredContent = content.refine((v) => !!v?.blocks?.length, 'Description is required')
const requiredImage = (message: string) => z.string().nullable().refine((v) => !!v, message)

const schema = z.object({
  about_heading: heading,
  about_description: requiredContent,
  about_image_path: requiredImage('Image is required'),
  eligibility_heading: heading,
  eligibility_description: requiredContent,
  eligibility_points: z.array(z.object({ heading, description: requiredContent })).min(1, 'Add at least one point'),
  eligibility_notice: content,
  apply_heading: heading,
  apply_description: requiredContent,
  apply_points: z
    .array(
      z.object({
        heading,
        description: requiredContent,
        icon_path: requiredImage('Icon is required'),
        position: z.enum(['left', 'right']),
      })
    )
    .min(1, 'Add at least one point'),
})

type FormValues = z.infer<typeof schema>

type EditorName =
  | 'about_description'
  | 'eligibility_description'
  | 'eligibility_notice'
  | 'apply_description'
  | `eligibility_points.${number}.description`
  | `apply_points.${number}.description`

const toForm = (s: Scholarship): FormValues => ({
  about_heading: s.about_heading ?? '',
  about_description: toEditorData(s.about_description),
  about_image_path: s.about_image_path,
  eligibility_heading: s.eligibility_heading ?? '',
  eligibility_description: toEditorData(s.eligibility_description),
  eligibility_points: s.eligibility_points.map((p) => ({ heading: p.heading, description: toEditorData(p.description) })),
  eligibility_notice: toEditorData(s.eligibility_notice),
  apply_heading: s.apply_heading ?? '',
  apply_description: toEditorData(s.apply_description),
  apply_points: s.apply_points.map((p) => ({ ...p, description: toEditorData(p.description) })),
})

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-destructive">{message}</p> : null
}

function Section({ title, description, onAdd, children }: { title: string; description?: string; onAdd?: () => void; children: ReactNode }) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="items-center border-b px-6 py-4">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {onAdd && (
          <CardAction>
            <Button type="button" size="sm" variant="outline" onClick={onAdd}>
              <Plus /> Add Point
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="space-y-5 p-6">{children}</CardContent>
    </Card>
  )
}

function EditorField({ control, name, label, editorKey, error }: { control: Control<FormValues>; name: EditorName; label: string; editorKey: string; error?: string }) {
  return (
    <div className="space-y-1.5">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Editor
            key={editorKey}
            label={label}
            initData={(field.value as OutputData | null) ?? undefined}
            onSave={(d) => field.onChange(d.blocks.length ? d : null)}
          />
        )}
      />
      <FieldError message={error} />
    </div>
  )
}

function PointCard({
  index,
  count,
  onMove,
  onRemove,
  itemProps,
  handleProps,
  children,
}: {
  index: number
  count: number
  onMove: (from: number, to: number) => void
  onRemove: () => void
  itemProps: ReturnType<ReturnType<typeof useFieldDrag>['itemProps']>
  handleProps: ReturnType<ReturnType<typeof useFieldDrag>['handleProps']>
  children: ReactNode
}) {
  return (
    <div {...itemProps} className="space-y-4 rounded-lg border bg-muted/30 p-4 data-dragging:opacity-40">
      <div className="flex items-center gap-2">
        <span {...handleProps} title="Drag to reorder" className="cursor-grab touch-none text-muted-foreground">
          <GripVertical className="size-4" />
        </span>
        <span className="text-sm font-medium">Point {index + 1}</span>
        <div className="ml-auto flex gap-1">
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
      </div>
      {children}
    </div>
  )
}

export function ScholarshipPage() {
  const qc = useQueryClient()
  const pending = usePendingUploads()
  const [uploads, setUploads] = useState<Record<string, boolean>>({})
  const uploading = Object.values(uploads).some(Boolean)
  const [editorKey, setEditorKey] = useState(0)

  const { data, isLoading } = useQuery({ queryKey: ['scholarship'], queryFn: scholarshipService.get })

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      about_heading: '',
      about_description: null,
      about_image_path: null,
      eligibility_heading: '',
      eligibility_description: null,
      eligibility_points: [],
      eligibility_notice: null,
      apply_heading: '',
      apply_description: null,
      apply_points: [],
    },
  })

  useEffect(() => {
    if (!data) return
    reset(toForm(data))
    setEditorKey((k) => k + 1)
  }, [data, reset])

  const eligibility = useFieldArray({ control, name: 'eligibility_points' })
  const apply = useFieldArray({ control, name: 'apply_points' })
  const eligibilityDrag = useFieldDrag(eligibility.move)
  const applyDrag = useFieldDrag(apply.move)

  const trackUploading = (key: string) => (busy: boolean) =>
    setUploads((prev) => (!!prev[key] === busy ? prev : { ...prev, [key]: busy }))

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = await scholarshipService.update(values as ScholarshipPayload)
      pending.commit([saved.about_image_path, ...saved.apply_points.map((p) => p.icon_path)])
      qc.setQueryData(['scholarship'], saved)
      toast.success('Scholarship page saved')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const imageField = (name: 'about_image_path' | `apply_points.${number}.icon_path`, accept: string[], previewClassName: string) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ImageUpload
          folder={UPLOAD_FOLDER}
          accept={accept}
          maxSizeMb={name === 'about_image_path' ? 5 : 1}
          previewClassName={previewClassName}
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

  const arrayError = (e?: { message?: string; root?: { message?: string } }) => e?.message ?? e?.root?.message

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
        <div>
          <h1 className="text-2xl font-semibold">Scholarship</h1>
          {data && <p className="text-sm text-muted-foreground">Page: /{data.page_slug} · SEO and FAQs are managed from their own sections</p>}
        </div>
        <Button type="submit" disabled={isSubmitting || uploading}>
          {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>

      <Section title="About Scholarship">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label>Heading</Label>
              <Input placeholder="About the scholarship" {...register('about_heading')} />
              <FieldError message={errors.about_heading?.message} />
            </div>
            <EditorField control={control} name="about_description" label="Description" editorKey={`${editorKey}-about`} error={errors.about_description?.message} />
          </div>
          <div className="space-y-1.5">
            <Label>Side Image</Label>
            {imageField('about_image_path', IMAGE_TYPES, 'h-48 w-72')}
            <FieldError message={errors.about_image_path?.message} />
          </div>
        </div>
      </Section>

      <Section title="Eligibility" onAdd={() => eligibility.append({ heading: '', description: null })}>
        <div className="space-y-1.5">
          <Label>Heading</Label>
          <Input placeholder="Eligibility criteria" {...register('eligibility_heading')} />
          <FieldError message={errors.eligibility_heading?.message} />
        </div>
        <EditorField control={control} name="eligibility_description" label="Description" editorKey={`${editorKey}-eligibility`} error={errors.eligibility_description?.message} />

        <div className="space-y-3">
          <Label>Points</Label>
          {!eligibility.fields.length && <p className="text-sm text-muted-foreground">No points added yet.</p>}
          <FieldError message={arrayError(errors.eligibility_points)} />
          {eligibility.fields.map((f, i) => (
            <PointCard
              key={f.id}
              index={i}
              count={eligibility.fields.length}
              onMove={eligibility.move}
              onRemove={() => eligibility.remove(i)}
              itemProps={eligibilityDrag.itemProps(i)}
              handleProps={eligibilityDrag.handleProps(i)}
            >
              <div className="space-y-1.5">
                <Input placeholder="Point heading" {...register(`eligibility_points.${i}.heading`)} />
                <FieldError message={errors.eligibility_points?.[i]?.heading?.message} />
              </div>
              <EditorField
                control={control}
                name={`eligibility_points.${i}.description`}
                label="Description"
                editorKey={`${editorKey}-${f.id}`}
                error={errors.eligibility_points?.[i]?.description?.message}
              />
            </PointCard>
          ))}
        </div>

        <EditorField control={control} name="eligibility_notice" label="Notice (optional)" editorKey={`${editorKey}-notice`} error={errors.eligibility_notice?.message} />
      </Section>

      <Section title="How to Apply" onAdd={() => apply.append({ heading: '', description: null, icon_path: null, position: 'left' })}>
        <div className="space-y-1.5">
          <Label>Heading</Label>
          <Input placeholder="How to apply" {...register('apply_heading')} />
          <FieldError message={errors.apply_heading?.message} />
        </div>
        <EditorField control={control} name="apply_description" label="Description" editorKey={`${editorKey}-apply`} error={errors.apply_description?.message} />

        <div className="space-y-3">
          <Label>Points</Label>
          {!apply.fields.length && <p className="text-sm text-muted-foreground">No points added yet.</p>}
          <FieldError message={arrayError(errors.apply_points)} />
          {apply.fields.map((f, i) => (
            <PointCard
              key={f.id}
              index={i}
              count={apply.fields.length}
              onMove={apply.move}
              onRemove={() => apply.remove(i)}
              itemProps={applyDrag.itemProps(i)}
              handleProps={applyDrag.handleProps(i)}
            >
              <div className="grid items-start gap-4 sm:grid-cols-[auto_1fr]">
                <div className="space-y-1.5">
                  {imageField(`apply_points.${i}.icon_path`, ICON_TYPES, 'size-20')}
                  <FieldError message={errors.apply_points?.[i]?.icon_path?.message} />
                </div>
                <div className="grid items-start gap-4 sm:grid-cols-[1fr_10rem]">
                  <div className="space-y-1.5">
                    <Input placeholder="Point heading" {...register(`apply_points.${i}.heading`)} />
                    <FieldError message={errors.apply_points?.[i]?.heading?.message} />
                  </div>
                  <Controller
                    control={control}
                    name={`apply_points.${i}.position`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <EditorField
                control={control}
                name={`apply_points.${i}.description`}
                label="Description"
                editorKey={`${editorKey}-${f.id}`}
                error={errors.apply_points?.[i]?.description?.message}
              />
            </PointCard>
          ))}
        </div>
      </Section>
    </form>
  )
}
