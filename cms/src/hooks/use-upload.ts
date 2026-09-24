import { useCallback, useEffect, useRef, useState } from 'react'
import { getErrorMessage } from '@/lib/api'
import { deleteFile, uploadFile, type UploadedFile } from '@/lib/upload'

export function useUpload(folder: string) {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(
    async (file: File): Promise<UploadedFile | null> => {
      setError(null)
      setProgress(0)
      setIsUploading(true)
      try {
        return await uploadFile(file, folder, setProgress)
      } catch (err) {
        setError(getErrorMessage(err))
        return null
      } finally {
        setIsUploading(false)
      }
    },
    [folder]
  )

  return { upload, progress, isUploading, error, setError }
}

export function usePendingUploads() {
  const pending = useRef(new Set<string>())

  const discard = useCallback(() => {
    pending.current.forEach((path) => deleteFile(path))
    pending.current.clear()
  }, [])

  const commit = useCallback((keep?: string | null) => {
    pending.current.forEach((path) => path !== keep && deleteFile(path))
    pending.current.clear()
  }, [])

  const track = useCallback((path: string | null) => {
    if (path) pending.current.add(path)
  }, [])

  useEffect(() => discard, [discard])

  return { track, commit, discard }
}
