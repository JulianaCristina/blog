import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useNavigate } from 'react-router'
import type { Column } from '@/shared/table.types'

type TableComponentType = {
  data: any
  columns: Column<any>[]
  action: {
    goTo: string
    label: string
  }
}

export const TableComponent = ({ data, columns, action }: TableComponentType) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex justify-end pb-2">
        <Button onClick={() => navigate(action.goTo)}>{action.label}</Button>
      </div>
      {data.length === 0 ? (
        <p>Nenhum dado cadastrado</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data: unknown, index: any) => (
              <TableRow key={data.id ?? `data-${index}`}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.cell(data)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
