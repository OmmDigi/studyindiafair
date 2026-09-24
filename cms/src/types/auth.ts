export type Role = 'admin' | 'editor'
export type Action = 'create' | 'read' | 'update' | 'delete'

export type User = {
  id: number
  name: string
  email: string
  role: Role
  permissions: Action[]
}

export type ManagedUser = {
  id: number
  name: string
  email: string
  role: Role
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Paginated<T> = {
  data: T[]
  page: number
  limit: number
  total: number
}
