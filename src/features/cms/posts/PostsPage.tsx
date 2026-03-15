import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAppSelector } from '@/app/store/hooks'
import type { ReactNode } from 'react'
import type { Post } from '@/features/cms/posts/posts.types'
import { ActionButtons } from '@/features/cms/components/ActionButtons'
import { selectAllPosts } from '@/features/cms/posts/postsSlices'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

type Column<T> = {
  id: string
  header: string
  cell: (row: T) => ReactNode
  className?: string
}

const columns: Column<Post>[] = [
  { id: 'title', header: 'Título', cell: (post) => post.title },
  { id: 'status', header: 'Status', cell: (post) => post.status },
  { id: 'likeCount', header: 'Likes', cell: (post) => post.likeCount },
  {
    id: 'commentCount',
    header: 'Comments',
    cell: (post) => post.commentCount,
  },
  {
    id: 'updatedAt',
    header: 'Updated',
    cell: (post) =>
      Intl.DateTimeFormat('pt-br', { dateStyle: 'short', timeStyle: 'short' }).format(
        post.updatedAt,
      ),
  },
  {
    id: 'edit',
    header: 'Actions',
    cell: (post) =>
      post.id ? (
        <ActionButtons postId={post.id} status={post.status} postTitle={post.title} />
      ) : null,
  },
]

export const PostsPage = () => {
  const posts = useAppSelector(selectAllPosts)
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex justify-end pb-2">
        <Button onClick={() => navigate('/cms/posts/new')}>New Post</Button>
      </div>
      {posts.length === 0 ? (
        <p>Nenhum post cadastrado</p>
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
            {posts.map((post, index) => (
              <TableRow key={post.id ?? `post-${index}`}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.cell(post)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
