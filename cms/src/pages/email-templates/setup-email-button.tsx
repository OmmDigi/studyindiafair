import { Mail } from 'lucide-react'
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

type Props = {
  form: { id: number; name: string; form_id: string; enquiry_count: number }
  label?: boolean
}

export function SetupEmailButton({ form, label }: Props) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const onClick = () => (form.enquiry_count ? navigate(`/email-templates/${form.id}`) : setOpen(true))

  return (
    <>
      {label ? (
        <Button size="sm" variant="outline" onClick={onClick}>
          <Mail /> Setup Email
        </Button>
      ) : (
        <Button size="icon-sm" variant="ghost" title="Setup email" onClick={onClick}>
          <Mail />
        </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No enquiries yet</DialogTitle>
            <DialogDescription>
              Form {form.name} has no enquiries. Submit at least one enquiry from the website using form ID{' '}
              <span className="font-mono font-medium text-foreground">{form.form_id}</span> so its fields can be used as
              email variables, then set up the emails.
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
