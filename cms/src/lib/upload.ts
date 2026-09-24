import axios from 'axios'

export const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL as string

export type UploadedFile = {
  url: string
  pathname: string
  contentType?: string
  width?: number
  height?: number
}

const uploadApi = axios.create({ baseURL: `${UPLOAD_URL}/api/v1` })

export const fileUrl = (path?: string | null) => (path ? `${UPLOAD_URL}${path}` : null)

export async function uploadFile(file: File, folder: string, onProgress?: (percent: number) => void) {
  const form = new FormData()
  form.append('folder', folder)
  form.append('file', file)
  const { data } = await uploadApi.post<{ data: UploadedFile }>('/upload/single', form, {
    onUploadProgress: (e) => onProgress?.(e.total ? Math.round((e.loaded / e.total) * 100) : 0),
  })
  return data.data
}

export const deleteFile = (path: string) =>
  uploadApi.delete('/manage/delete', { params: { url: path } }).catch(() => undefined)
