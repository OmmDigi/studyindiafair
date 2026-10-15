import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Props = {
  file: File
  aspect: number
  outputWidth: number
  title: string
  onCrop: (file: File) => void
  onOriginal: (file: File) => void
  onSkip: () => void
}

type Offset = { x: number; y: number }

export function ImageCropDialog({ file, aspect, outputWidth, title, onCrop, onOriginal, onSkip }: Props) {
  const drag = useRef<{ start: Offset; origin: Offset } | null>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [frame, setFrame] = useState<{ w: number; h: number } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 })
  const [busy, setBusy] = useState(false)

  const observer = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = () => setSrc(reader.result as string)
    reader.readAsDataURL(file)
    return () => reader.abort()
  }, [file])

  const frameRef = useCallback((el: HTMLDivElement | null) => {
    observer.current?.disconnect()
    if (!el) return
    observer.current = new ResizeObserver(() => setFrame({ w: el.clientWidth, h: el.clientHeight }))
    observer.current.observe(el)
  }, [])

  const geometry = (z = zoom) => {
    if (!frame || !natural) return null
    const fw = frame.w
    const fh = frame.h
    const scale = Math.max(fw / natural.w, fh / natural.h) * z
    return { fw, fh, scale, iw: natural.w * scale, ih: natural.h * scale }
  }

  const clamp = (o: Offset, z = zoom): Offset => {
    const g = geometry(z)
    if (!g) return o
    const mx = (g.iw - g.fw) / 2
    const my = (g.ih - g.fh) / 2
    return {
      x: Math.min(mx, Math.max(-mx, o.x)),
      y: Math.min(my, Math.max(-my, o.y)),
    }
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { start: { x: e.clientX, y: e.clientY }, origin: offset }
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const { start, origin } = drag.current
    setOffset(
      clamp({
        x: origin.x + e.clientX - start.x,
        y: origin.y + e.clientY - start.y,
      }),
    )
  }

  const changeZoom = (z: number) => {
    setZoom(z)
    setOffset((o) => clamp(o, z))
  }

  const crop = async () => {
    const g = geometry()
    const img = new Image()
    if (!g || !src) return
    setBusy(true)
    try {
      img.src = src
      await img.decode()
      const sx = ((g.iw - g.fw) / 2 - offset.x) / g.scale
      const sy = ((g.ih - g.fh) / 2 - offset.y) / g.scale
      const sw = g.fw / g.scale
      const sh = g.fh / g.scale
      const width = Math.round(Math.min(sw, outputWidth))
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = Math.round(width / aspect)
      const ctx = canvas.getContext('2d')!
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
      const type = file.type === 'image/png' ? 'image/png' : file.type
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.9))
      if (blob) onCrop(new File([blob], file.name, { type: blob.type }))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onSkip()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          ref={frameRef}
          className="relative w-full cursor-move touch-none overflow-hidden rounded-md border bg-muted select-none"
          style={{ aspectRatio: aspect }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => (drag.current = null)}
        >
          {src && (
            <img
              src={src}
              alt=""
              draggable={false}
              onLoad={(e) =>
                setNatural({
                  w: e.currentTarget.naturalWidth,
                  h: e.currentTarget.naturalHeight,
                })
              }
              className="absolute top-1/2 left-1/2 max-w-none"
              style={(() => {
                const g = geometry()
                return g
                  ? {
                      width: g.iw,
                      height: g.ih,
                      transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                    }
                  : { visibility: 'hidden' as const }
              })()}
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => changeZoom(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground">Drag to reposition. {file.name}</p>
        <DialogFooter>
          <Button type="button" variant="ghost" disabled={busy} onClick={onSkip}>
            Skip
          </Button>
          <Button type="button" variant="outline" disabled={busy} onClick={() => onOriginal(file)}>
            Use Original
          </Button>
          <Button type="button" disabled={busy || !natural} onClick={crop}>
            {busy ? 'Cropping...' : 'Crop & Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
