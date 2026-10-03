import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export type FormSetupButtonProps = {
  form: { id: number; name: string; form_id: string; enquiry_count: number }
  label?: boolean
}

type Props = FormSetupButtonProps & { to: string; icon: LucideIcon; text: string; purpose: string }

export function FormSetupButton({ form, label, to, icon: Icon, text, purpose }: Props) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const onClick = () => (form.enquiry_count ? navigate(to) : setOpen(true))

  return (
    <>
      {label ? (
        <Button size="sm" variant="outline" onClick={onClick}>
          <Icon /> {text}
        </Button>
      ) : (
        <Button size="icon-sm" variant="ghost" title={text} onClick={onClick}>
          <Icon />
        </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No enquiries yet</DialogTitle>
            <DialogDescription>
              Form {form.name} has no enquiries. Submit at least one enquiry from the website using form ID{' '}
              <span className="font-mono font-medium text-foreground">{form.form_id}</span> so its fields can be used as
              {' '}{purpose} variables, then set them up.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
