import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { TestimonialCategory } from '@/types/testimonial-category'
import { CategoriesManager } from './categories-manager'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: (category: TestimonialCategory) => void
}

export function ManageCategoriesDialog({ open, onOpenChange, onCreated }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Testimonial Categories</DialogTitle>
        </DialogHeader>
        <CategoriesManager onCreated={onCreated} />
      </DialogContent>
    </Dialog>
  )
}
