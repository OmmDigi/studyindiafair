import { ImagePlus, Loader2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { useUpload } from '@/hooks/use-upload'
import { fileUrl } from '@/lib/upload'

const DEFAULT_TYPES = ['image/jpeg', 'image/png', 'image/webp']

type Props = {
  value: string | null
  onChange: (path: string | null) => void
  folder: string
  accept?: string[]
  maxSizeMb?: number
  disabled?: boolean
  className?: string
  onUploadingChange?: (uploading: boolean) => void
}

export function ImageUpload({
  value,
  onChange,
  folder,
  accept = DEFAULT_TYPES,
  maxSizeMb = 5,
  disabled,
  className,
  onUploadingChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { upload, progress, isUploading, error, setError } = useUpload(folder)

  useEffect(() => onUploadingChange?.(isUploading), [isUploading, onUploadingChange])

  const pick = async (file?: File) => {
    if (inputRef.current) inputRef.current.value = ''
    if (!file) return
    if (!accept.includes(file.type)) return setError('Unsupported file type')
    if (file.size > maxSizeMb * 1024 * 1024) return setError(`File must be ${maxSizeMb}MB or smaller`)
    const result = await upload(file)
    if (result) onChange(result.url)
  }

  const src = fileUrl(value)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative size-32">
        {src ? (
          <img src={src} alt="Uploaded" className="size-full rounded-md border object-cover" />
        ) : (
          <button
            type="button"
            disabled={disabled || isUploading}
            onClick={() => inputRef.current?.click()}
            className="flex size-full flex-col items-center justify-center gap-1 rounded-md border border-dashed text-xs text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none"
          >
            <ImagePlus className="size-5" />
            Upload image
          </button>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-md bg-background/80 text-xs">
            <Loader2 className="size-5 animate-spin" />
            {progress}%
          </div>
        )}
        {src && !isUploading && !disabled && (
          <Button
            type="button"
            size="icon-xs"
            variant="secondary"
            className="absolute -top-2 -right-2"
            title="Remove image"
            onClick={() => onChange(null)}
          >
            <X />
          </Button>
        )}
      </div>
      {src && !isUploading && !disabled && (
        <Button type="button" size="xs" variant="outline" onClick={() => inputRef.current?.click()}>
          Replace
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept.join(',')}
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <p className="text-xs text-muted-foreground">
        {accept.map((t) => t.split('/')[1].toUpperCase()).join(', ')}, max {maxSizeMb}MB
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
