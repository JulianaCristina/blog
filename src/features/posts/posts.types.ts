export interface Post {
  id: string
  title: string
  content: string
  tags: string[]
  slug: string
  authorId: string
  status: string
  likeCount: number
  commentCount: number
  deletedAt: number
}
