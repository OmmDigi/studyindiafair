import type { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Editor from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { getErrorMessage } from '@/lib/api'
import { toEditorData } from '@/lib/editor'
import { PAGES } from '@/lib/pages'
import { faqService } from '@/services/faq.service'
import type { Faq } from '@/types/faq'

const schema = z.object({
  page_slug: z.string().min(1, 'Select a page'),
  question: z.string().trim().min(3, 'Question must be at least 3 characters').max(500),
  answer: z
    .custom<OutputData>()
    .nullable()
    .refine((v) => !!v?.blocks?.length, 'Answer is required'),
  sort_order: z.number({ error: 'Enter a number' }).int().min(0),
  is_active: z.boolean(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  faq: Faq | null
  defaultPage?: string
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function FaqFormDialog({ open, faq, defaultPage, onOpenChange, onSaved }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: faq
      ? {
          page_slug: faq.page_slug,
          question: faq.question,
          answer: toEditorData(faq.answer),
          sort_order: faq.sort_order,
          is_active: faq.is_active,
        }
      : {
          page_slug: defaultPage ?? PAGES[0].slug,
          question: '',
          answer: null,
          sort_order: 0,
          is_active: true,
        },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      if (faq) await faqService.update(faq.id, values)
      else await faqService.create(values)
      toast.success(faq ? 'FAQ updated' : 'FAQ created')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{faq ? 'Edit FAQ' : 'New FAQ'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>
              Page <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="page_slug"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGES.map((p) => (
                      <SelectItem key={p.slug} value={p.slug}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.page_slug && <p className="text-sm text-destructive">{errors.page_slug.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">
              Question <span className="text-destructive">*</span>
            </Label>
            <Input id="question" {...register('question')} />
            {errors.question && <p className="text-sm text-destructive">{errors.question.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>
              Answer <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="answer"
              render={({ field }) => (
                <Editor
                  key={faq?.id ?? 'new'}
                  initData={toEditorData(faq?.answer) ?? undefined}
                  onSave={(data) => field.onChange(data.blocks.length ? data : null)}
                />
              )}
            />
            {errors.answer && <p className="text-sm text-destructive">{errors.answer.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" type="number" min={0} {...register('sort_order', { valueAsNumber: true })} />
              {errors.sort_order && <p className="text-sm text-destructive">{errors.sort_order.message}</p>}
            </div>
            <div className="flex items-center justify-between gap-2 sm:mt-6">
              <Label htmlFor="is_active">Active</Label>
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => <Switch id="is_active" checked={field.value} onCheckedChange={field.onChange} />}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
