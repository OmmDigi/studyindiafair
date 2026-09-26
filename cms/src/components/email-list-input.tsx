import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Props = {
  id?: string
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function EmailListInput({ id, value, onChange, placeholder }: Props) {
  const [text, setText] = useState('')

  const add = (raw: string) => {
    const parts = raw
      .split(/[\s,;]+/)
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean)
    if (!parts.length) return
    const invalid = parts.filter((p) => !EMAIL.test(p))
    const valid = parts.filter((p) => EMAIL.test(p) && !value.includes(p))
    if (invalid.length) toast.error(`Invalid email: ${invalid.join(', ')}`)
    if (valid.length) onChange([...value, ...new Set(valid)])
    setText(invalid.join(', '))
  }

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((email) => (
            <span key={email} className="inline-flex items-center gap-1 rounded-md border bg-muted px-2 py-0.5 text-sm">
              {email}
              <button
                type="button"
                className="text-muted-foreground hover:text-destructive"
                title="Remove"
                onClick={() => onChange(value.filter((e) => e !== email))}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
      <Input
        id={id}
        value={text}
        placeholder={placeholder ?? 'Type email and press Enter'}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => add(text)}
        onPaste={(e) => {
          e.preventDefault()
          add(e.clipboardData.getData('text'))
        }}
        onKeyDown={(e) => {
          if (['Enter', ',', ';', ' '].includes(e.key)) {
            e.preventDefault()
            add(text)
          } else if (e.key === 'Backspace' && !text && value.length) {
            onChange(value.slice(0, -1))
          }
        }}
      />
    </div>
  )
}
