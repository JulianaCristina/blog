import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { selectAllTags, tagDeleted } from '@/features/cms/tags/tagsSlice'
import { TableComponent } from '@/features/cms/components/TableComponent'
import type { Column } from '@/shared/table.types'
import type { Tag } from '@/features/cms/tags/tags.types'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router'

export const TagPage = () => {
  const tags = useAppSelector(selectAllTags)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const action = {
    goTo: '/cms/tags/new',
    label: 'New Tag',
  }

  const handleDelete = (id: string) => {
    dispatch(tagDeleted({ id }))
  }
  const columns: Column<Tag>[] = [
    { id: 'name', header: 'Name', cell: (tag) => tag.name },
    {
      id: 'edit',
      header: 'Actions',
      cell: (tag) =>
        tag.id ? (
          <div className="flex gap-2">
            <Button size="icon-sm" variant="ghost" onClick={() => navigate(`/cms/tags/${tag.id}`)}>
              <Pencil />
            </Button>
            <Button size="icon-sm" variant="ghost" onClick={() => handleDelete(tag.id)}>
              <Trash2 />
            </Button>
          </div>
        ) : null,
    },
  ]
  return <TableComponent data={tags} columns={columns} action={action} />
}
