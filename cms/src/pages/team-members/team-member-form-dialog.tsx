import type { OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Editor from '@/components/Editor'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { usePendingUploads } from '@/hooks/use-upload'
import { getErrorMessage } from '@/lib/api'
import { toEditorData } from '@/lib/editor'
import { teamMemberService } from '@/services/team-member.service'
import type { TeamMember } from '@/types/team-member'

const UPLOAD_FOLDER = 'team-members'

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  designation: z.string().trim().min(2, 'Designation must be at least 2 characters').max(160),
  details: z.custom<OutputData>().nullable(),
  image_path: z.string().nullable(),
  position: z.number({ error: 'Enter a number' }).int().min(0).optional(),
  is_active: z.boolean(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  member: TeamMember | null
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function TeamMemberFormDialog({ open, member, onOpenChange, onSaved }: Props) {
  const [uploading, setUploading] = useState(false)
  const pending = usePendingUploads()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: member
      ? {
          name: member.name,
          designation: member.designation,
          details: toEditorData(member.details),
          image_path: member.image_path,
          position: member.position,
          is_active: member.is_active,
        }
      : {
          name: '',
          designation: '',
          details: null,
          image_path: null,
          position: undefined,
          is_active: true,
        },
  })

  const handleOpenChange = (next: boolean) => {
    if (!next) pending.discard()
    onOpenChange(next)
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const saved = member
        ? await teamMemberService.update(member.id, values)
        : await teamMemberService.create(values)
      pending.commit(saved.image_path)
      toast.success(member ? 'Team member updated' : 'Team member created')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{member ? 'Edit Team Member' : 'New Team Member'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Image</Label>
            <Controller
              control={control}
              name="image_path"
              render={({ field }) => (
                <ImageUpload
                  folder={UPLOAD_FOLDER}
                  value={field.value}
                  onChange={(path) => {
                    pending.track(path)
                    field.onChange(path)
                  }}
                  onUploadingChange={setUploading}
                />
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">
                Designation <span className="text-destructive">*</span>
              </Label>
              <Input id="designation" {...register('designation')} />
              {errors.designation && <p className="text-sm text-destructive">{errors.designation.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Details</Label>
            <Controller
              control={control}
              name="details"
              render={({ field }) => (
                <Editor
                  key={member?.id ?? 'new'}
                  initData={toEditorData(member?.details) ?? undefined}
                  onSave={(data) => field.onChange(data.blocks.length ? data : null)}
                />
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                type="number"
                min={0}
                placeholder="Auto (last)"
                {...register('position', { setValueAs: (v) => (v === '' || v == null ? undefined : Number(v)) })}
              />
              {errors.position && <p className="text-sm text-destructive">{errors.position.message}</p>}
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
            <Button type="submit" disabled={isSubmitting || uploading}>
              {uploading ? 'Uploading...' : isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
