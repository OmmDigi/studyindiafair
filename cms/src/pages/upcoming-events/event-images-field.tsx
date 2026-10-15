import { ImagePlus, Loader2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { toast } from 'sonner'
import { ImageCropDialog } from '@/components/image-crop-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getErrorMessage } from '@/lib/api'
import { fileUrl, uploadFile } from '@/lib/upload'
import type { FormValues } from './event-form-dialog'

const UPLOAD_FOLDER = 'upcoming-events'
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5
export const MAX_IMAGES = 10

type Props = {
  name: 'images' | 'banner_images'
  label: string
  hint: string
  aspect: number
  outputWidth: number
  gridClassName: string
  control: Control<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  onTrack: (path: string) => void
  onUploadingChange: (delta: number) => void
}

export function EventImagesField(props: Props) {
  const { name, label, hint, aspect, outputWidth, gridClassName, control, register, onTrack, onUploadingChange } = props
  const error = props.errors[name]
  const inputRef = useRef<HTMLInputElement>(null)
  const [queue, setQueue] = useState<File[]>([])
  const [uploading, setUploading] = useState(0)
  const images = useFieldArray({ control, name })

  const pick = (files: FileList | null) => {
    const list = Array.from(files ?? [])
    if (inputRef.current) inputRef.current.value = ''
    const room = MAX_IMAGES - images.fields.length - queue.length - uploading
    if (list.length > room) toast.error(`Only ${MAX_IMAGES} images allowed`)
    const valid = list.slice(0, Math.max(room, 0)).filter((file) => {
      if (!ACCEPT.includes(file.type)) toast.error(`${file.name}: unsupported type`)
      else if (file.size > MAX_SIZE_MB * 1024 * 1024) toast.error(`${file.name}: larger than ${MAX_SIZE_MB}MB`)
      else return true
      return false
    })
    setQueue((q) => [...q, ...valid])
  }

  const next = () => setQueue((q) => q.slice(1))

  const upload = async (file: File) => {
    next()
    setUploading((n) => n + 1)
    onUploadingChange(1)
    try {
      const result = await uploadFile(file, UPLOAD_FOLDER)
      onTrack(result.url)
      images.append({ path: result.url, alt_text: '' })
    } catch (err) {
      toast.error(`${file.name}: ${getErrorMessage(err)}`)
    } finally {
      setUploading((n) => n - 1)
      onUploadingChange(-1)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <Label>{label}</Label>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={images.fields.length + queue.length + uploading >= MAX_IMAGES}
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus /> Add Images
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept={ACCEPT.join(',')}
        onChange={(e) => pick(e.target.files)}
      />
      {images.fields.length || uploading ? (
        <div className={`grid gap-3 ${gridClassName}`}>
          {images.fields.map((field, i) => (
            <div key={field.id} className="space-y-1">
              <div className="relative" style={{ aspectRatio: aspect }}>
                <img src={fileUrl(field.path)!} alt="" className="size-full rounded-md border object-cover" />
                <Button
                  type="button"
                  size="icon-xs"
                  variant="secondary"
                  className="absolute -top-2 -right-2"
                  title="Remove image"
                  onClick={() => images.remove(i)}
                >
                  <X />
                </Button>
              </div>
              <Input placeholder="Alt text" maxLength={250} {...register(`${name}.${i}.alt_text`)} />
            </div>
          ))}
          {Array.from({ length: uploading }, (_, i) => (
            <div
              key={`uploading-${i}`}
              className="flex items-center justify-center rounded-md border border-dashed text-muted-foreground"
              style={{ aspectRatio: aspect }}
            >
              <Loader2 className="size-5 animate-spin" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          {ACCEPT.map((t) => t.split('/')[1].toUpperCase()).join(', ')}, max {MAX_SIZE_MB}MB each, up to {MAX_IMAGES}{' '}
          images
        </p>
      )}
      {error && <p className="text-sm text-destructive">{error.message}</p>}
      {queue[0] && (
        <ImageCropDialog
          key={`${queue[0].name}-${queue[0].lastModified}-${queue.length}`}
          file={queue[0]}
          aspect={aspect}
          outputWidth={outputWidth}
          title={`Crop ${label}${queue.length > 1 ? ` (${queue.length} left)` : ''}`}
          onCrop={upload}
          onOriginal={upload}
          onSkip={next}
        />
      )}
    </div>
  )
}
