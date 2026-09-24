import axios from 'axios'

export const PUBLIC_PATHS = ['/login', '/forgot-password']

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && !PUBLIC_PATHS.includes(window.location.pathname)) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const getErrorMessage = (error: unknown) =>
  axios.isAxiosError(error) ? error.response?.data?.message ?? error.message : 'Something went wrong'
