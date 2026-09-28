import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { getErrorMessage } from '@/lib/api'
import { userService } from '@/services/user.service'
import type { ManagedUser } from '@/types/auth'

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  role: z.enum(['admin', 'editor']),
  is_active: z.boolean(),
  password: z.string(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  user: ManagedUser | null
  isSelf: boolean
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function UserFormDialog({ open, user, isSelf, onOpenChange, onSaved }: Props) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: user
      ? { name: user.name, email: user.email, role: user.role, is_active: user.is_active, password: '' }
      : { name: '', email: '', role: 'editor', is_active: true, password: '' },
  })

  const onSubmit = async ({ password, ...values }: FormValues) => {
    if (!user && password.length < 8) {
      return setError('password', { message: 'Password must be at least 8 characters' })
    }
    try {
      if (user) await userService.update(user.id, values)
      else await userService.create({ ...values, password })
      toast.success(user ? 'User updated' : 'User created')
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'New User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          {!user && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
          )}
          <div className="space-y-2">
            <Label>Role</Label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={isSelf}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="is_active">Active</Label>
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => (
                <Switch id="is_active" checked={field.value} onCheckedChange={field.onChange} disabled={isSelf} />
              )}
            />
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
