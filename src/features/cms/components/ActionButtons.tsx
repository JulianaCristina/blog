import { useNavigate } from 'react-router'
import { Pencil, NotepadTextDashed, Rocket, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/app/store/hooks'
import { postDeleted, postPublished } from '@/features/posts/postsSlices'
import { PostStatus } from '@/features/posts/posts.types'

type ActionButtonsProps = {
  postId: string
  postTitle: string
  status?: PostStatus
}

export const ActionButtons = ({ postId, postTitle, status }: ActionButtonsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(postDeleted({ id: postId }))
    alert(`${postId} deleted`)
  }

  const handlePostPublished = () => {
    dispatch(postPublished({ id: postId }))
    const postStatus = status === PostStatus.draft ? 'published' : 'draft'
    alert(`${postTitle} changed to ${postStatus}`)
  }

  return (
    <div className="flex gap-2">
      <Button size="icon-sm" variant="ghost" onClick={() => navigate(`/cms/update/${postId}`)}>
        <Pencil />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={() => handleDelete()}>
        <Trash2 />
      </Button>
      <Button size="icon-sm" variant="ghost" onClick={() => handlePostPublished()}>
        {status === PostStatus.draft ? <Rocket /> : <NotepadTextDashed />}
      </Button>
    </div>
  )
}
