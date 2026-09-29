import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getErrorMessage } from '@/lib/api'
import { formService } from '@/services/form.service'
import type { Form } from '@/types/form'

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  form_id: z
    .string()
    .trim()
    .max(120)
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*)?$/, 'Only lowercase letters, numbers and hyphens'),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  form: Form | null
  copying?: Form | null
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function FormFormDialog({ open, form, copying = null, onOpenChange, onSaved }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: form
      ? { name: form.name, form_id: form.form_id }
      : { name: copying ? `${copying.name} (Copy)` : '', form_id: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      if (form) await formService.update(form.id, values.form_id ? values : { ...values, form_id: form.form_id })
      else if (copying) await formService.copy(copying.id, values)
      else await formService.create(values)
      toast.success(form ? 'Form updated' : copying ? 'Form copied' : 'Form created')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{form ? 'Edit Form' : copying ? 'Copy Form' : 'New Form'}</DialogTitle>
          {copying && (
            <DialogDescription>Email setup of {copying.name} will be copied to the new form. Enquiries are not copied.</DialogDescription>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-name">
              Form Name <span className="text-destructive">*</span>
            </Label>
            <Input id="form-name" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-id">Form ID</Label>
            <Input id="form-id" placeholder="Auto-generated from name if empty" {...register('form_id')} />
            {form && <p className="text-xs text-muted-foreground">Changing it breaks website forms using the old ID.</p>}
            {errors.form_id && <p className="text-sm text-destructive">{errors.form_id.message}</p>}
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
