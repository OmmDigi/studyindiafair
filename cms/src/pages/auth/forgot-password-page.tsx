import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getErrorMessage } from '@/lib/api'
import { authService } from '@/services/auth.service'

const emailSchema = z.object({ email: z.string().email() })
const resetSchema = z
  .object({
    otp: z.string().regex(/^\d{6}$/, 'OTP must be 6 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { message: 'Passwords do not match', path: ['confirm'] })

type ResetValues = z.infer<typeof resetSchema>

export function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  const emailForm = useForm<{ email: string }>({ resolver: zodResolver(emailSchema) })
  const resetForm = useForm<ResetValues>({ resolver: zodResolver(resetSchema) })

  const sendOtp = async ({ email }: { email: string }) => {
    try {
      const { message } = await authService.forgotPassword(email)
      toast.success(message)
      setEmail(email)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const reset = async ({ otp, password }: ResetValues) => {
    try {
      const { message } = await authService.resetPassword({ email: email!, otp, password })
      toast.success(message)
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-muted p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {!email ? (
            <form onSubmit={emailForm.handleSubmit(sendOtp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Registered Email</Label>
                <Input id="email" type="email" {...emailForm.register('email')} />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={emailForm.formState.isSubmitting}>
                {emailForm.formState.isSubmitting ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={resetForm.handleSubmit(reset)} className="space-y-4">
              <p className="text-sm text-muted-foreground">OTP sent to {email}</p>
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input id="otp" inputMode="numeric" maxLength={6} {...resetForm.register('otp')} />
                {resetForm.formState.errors.otp && (
                  <p className="text-sm text-destructive">{resetForm.formState.errors.otp.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" {...resetForm.register('password')} />
                {resetForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{resetForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" {...resetForm.register('confirm')} />
                {resetForm.formState.errors.confirm && (
                  <p className="text-sm text-destructive">{resetForm.formState.errors.confirm.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={resetForm.formState.isSubmitting}>
                {resetForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => sendOtp({ email })}>
                Resend OTP
              </Button>
            </form>
          )}
          <Link to="/login" className="mt-4 block text-center text-sm text-muted-foreground hover:underline">
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
