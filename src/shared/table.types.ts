import type { ReactNode } from 'react'

export type Column<T> = {
  id: string
  header: string
  cell: (row: T) => ReactNode
  className?: string
}
