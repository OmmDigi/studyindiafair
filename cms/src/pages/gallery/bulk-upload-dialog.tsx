import { CirclePlay, ImagePlus, Loader2, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getErrorMessage } from '@/lib/api'
import { deleteFile, uploadFile } from '@/lib/upload'
import { youtubeId, youtubeThumb, youtubeWatchUrl } from '@/lib/youtube'
import { galleryService, type GalleryCreatePayload } from '@/services/gallery.service'
import type { GalleryCategory } from '@/types/gallery'

export const UPLOAD_FOLDER = 'gallery'
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5
const MAX_FILES = 50
const CONCURRENCY = 3

type Entry = {
  key: string
  alt: string
  progress: number
  error?: string
} & ({ kind: 'image'; file: File; preview: string } | { kind: 'youtube'; videoId: string })

type Props = {
  open: boolean
  category: GalleryCategory
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function BulkUploadDialog({ open, category, onOpenChange, onSaved }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [busy, setBusy] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const previews = useRef(new Set<string>())

  useEffect(() => {
    const urls = previews.current
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [])

  const patch = (key: string, data: Partial<Entry>) =>
    setEntries((list) => list.map((e) => (e.key === key ? ({ ...e, ...data } as Entry) : e)))

  const append = (next: Entry[]) =>
    setEntries((list) => {
      const room = MAX_FILES - list.length
      if (next.length > room) toast.error(`Only ${MAX_FILES} items per upload`)
      return [...list, ...next.slice(0, Math.max(room, 0))]
    })

  const add = (files: FileList | File[]) => {
    const rejected: string[] = []
    const next: Entry[] = []
    for (const file of Array.from(files)) {
      if (!ACCEPT.includes(file.type)) rejected.push(`${file.name}: unsupported type`)
      else if (file.size > MAX_SIZE_MB * 1024 * 1024) rejected.push(`${file.name}: larger than ${MAX_SIZE_MB}MB`)
      else {
        const preview = URL.createObjectURL(file)
        previews.current.add(preview)
        next.push({
          kind: 'image',
          key: `${file.name}-${file.size}-${crypto.randomUUID()}`,
          file,
          preview,
          alt: '',
          progress: 0,
        })
      }
    }
    if (rejected.length) toast.error(rejected.join('\n'))
    append(next)
    if (inputRef.current) inputRef.current.value = ''
  }

  const addVideo = () => {
    const id = youtubeId(videoUrl)
    if (!id) {
      toast.error('Enter a valid YouTube URL')
      return
    }
    append([{ kind: 'youtube', key: `yt-${id}-${crypto.randomUUID()}`, videoId: id, alt: '', progress: 0 }])
    setVideoUrl('')
  }

  const removeEntry = (key: string) => setEntries((list) => list.filter((e) => e.key !== key))

  const submit = async () => {
    setBusy(true)
    const queue = entries.filter((e) => e.kind === 'image')
    const ready: { key: string; item: GalleryCreatePayload['items'][number] }[] = entries
      .filter((e) => e.kind === 'youtube')
      .map((e) => ({
        key: e.key,
        item: { media_type: 'youtube', youtube_url: youtubeWatchUrl(e.videoId), alt_text: e.alt.trim() || null },
      }))
    const uploaded: string[] = []
    const worker = async () => {
      for (let entry = queue.shift(); entry; entry = queue.shift()) {
        const current = entry
        patch(current.key, { error: undefined, progress: 0 })
        try {
          const result = await uploadFile(current.file, UPLOAD_FOLDER, (progress) => patch(current.key, { progress }))
          uploaded.push(result.url)
          ready.push({
            key: current.key,
            item: { media_type: 'image', image_path: result.url, alt_text: current.alt.trim() || null },
          })
        } catch (error) {
          patch(current.key, { error: getErrorMessage(error) })
        }
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker))

    if (ready.length) {
      const order = new Map(entries.map((e, i) => [e.key, i]))
      ready.sort((a, b) => order.get(a.key)! - order.get(b.key)!)
      try {
        await galleryService.create({
          category_id: category.id,
          is_active: true,
          items: ready.map((r) => r.item),
        })
        const done = new Set(ready.map((r) => r.key))
        setEntries((list) => list.filter((e) => !done.has(e.key)))
        toast.success(`${ready.length} item${ready.length === 1 ? '' : 's'} added to ${category.name}`)
        onSaved()
        if (ready.length === entries.length) onOpenChange(false)
      } catch (error) {
        uploaded.forEach((url) => deleteFile(url))
        toast.error(getErrorMessage(error))
      }
    }
    setBusy(false)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !busy && onOpenChange(next)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Media</DialogTitle>
          <DialogDescription>Add images or YouTube videos to {category.name}.</DialogDescription>
        </DialogHeader>

        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            if (!busy) add(e.dataTransfer.files)
          }}
          className={`flex w-full flex-col items-center justify-center gap-1 rounded-md border border-dashed p-6 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none ${dragOver ? 'bg-muted' : ''}`}
        >
          <ImagePlus className="size-6" />
          Click or drop images here
          <span className="text-xs">
            {ACCEPT.map((t) => t.split('/')[1].toUpperCase()).join(', ')}, max {MAX_SIZE_MB}MB each, up to {MAX_FILES}{' '}
            at once
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept={ACCEPT.join(',')}
          onChange={(e) => e.target.files && add(e.target.files)}
        />

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            addVideo()
          }}
        >
          <Input
            placeholder="Paste YouTube URL, e.g. https://www.youtube.com/watch?v=..."
            value={videoUrl}
            disabled={busy}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button type="submit" variant="outline" disabled={busy || !videoUrl.trim()}>
            <Plus /> Add Video
          </Button>
        </form>

        {!!entries.length && (
          <div className="grid gap-3 sm:grid-cols-2">
            {entries.map((e) => (
              <div key={e.key} className="flex gap-3 rounded-md border p-2">
                <div className="relative size-20 shrink-0">
                  <img
                    src={e.kind === 'image' ? e.preview : youtubeThumb(e.videoId, 'default')}
                    alt=""
                    className="size-full rounded object-cover"
                  />
                  {e.kind === 'youtube' && (
                    <CirclePlay className="absolute right-1 bottom-1 size-5 rounded bg-background/80 p-0.5 text-red-600" />
                  )}
                  {busy && e.kind === 'image' && !e.error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded bg-background/80 text-xs">
                      <Loader2 className="size-4 animate-spin" />
                      {e.progress}%
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <p
                      className="truncate text-xs text-muted-foreground"
                      title={e.kind === 'image' ? e.file.name : youtubeWatchUrl(e.videoId)}
                    >
                      {e.kind === 'image' ? e.file.name : `YouTube: ${e.videoId}`}
                    </p>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="ghost"
                      title="Remove"
                      disabled={busy}
                      onClick={() => removeEntry(e.key)}
                    >
                      <X />
                    </Button>
                  </div>
                  <Input
                    placeholder={e.kind === 'image' ? 'Alt text' : 'Title'}
                    maxLength={250}
                    value={e.alt}
                    disabled={busy}
                    onChange={(ev) => patch(e.key, { alt: ev.target.value })}
                  />
                  {e.error && <p className="text-xs text-destructive">{e.error}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button type="button" disabled={busy || !entries.length} onClick={submit}>
            {busy ? 'Uploading...' : `Add ${entries.length || ''} item${entries.length === 1 ? '' : 's'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
