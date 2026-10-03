import { Webhook } from 'lucide-react'
import { FormSetupButton, type FormSetupButtonProps } from '@/components/form-setup-button'

export function SetupWebhookButton(props: FormSetupButtonProps) {
  return <FormSetupButton {...props} to={`/webhooks/${props.form.id}`} icon={Webhook} text="Setup Webhooks" purpose="webhook" />
}
