import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'
import { getErrorMessage } from '@/lib/api'
import { authService } from '@/services/auth.service'

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
})

type FormValues = z.infer<typeof schema>

export function ProfilePage() {
  const { user, setUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: { name: user?.name ?? '', email: user?.email ?? '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const updated = await authService.updateProfile(values)
      setUser(updated)
      reset(values)
      toast.success('Profile updated')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          My Profile <Badge variant="secondary" className="capitalize">{user?.role}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
              Change password via email OTP
            </Link>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
