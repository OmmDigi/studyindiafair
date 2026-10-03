import { Mail } from 'lucide-react'
import { FormSetupButton, type FormSetupButtonProps } from '@/components/form-setup-button'

export function SetupEmailButton(props: FormSetupButtonProps) {
  return <FormSetupButton {...props} to={`/email-templates/${props.form.id}`} icon={Mail} text="Setup Email" purpose="email" />
}
