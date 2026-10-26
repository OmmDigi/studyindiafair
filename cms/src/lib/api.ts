import axios from 'axios'

export const PUBLIC_PATHS = ['/login', '/forgot-password']

// Router paths are relative to the Vite base (e.g. /cms/), window.location is not.
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')

export const isPublicPath = () =>
  PUBLIC_PATHS.includes(window.location.pathname.slice(BASE_PATH.length).replace(/\/$/, ''))

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && !isPublicPath()) {
      window.location.href = import.meta.env.BASE_URL + "login";
    }
    return Promise.reject(error)
  }
)

export const getErrorMessage = (error: unknown) =>
  axios.isAxiosError(error)
    ? error.response?.data?.message ?? error.message
    : error instanceof Error
      ? error.message
      : 'Something went wrong'
