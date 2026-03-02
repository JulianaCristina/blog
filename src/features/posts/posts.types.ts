export const PostStatus = {
  draft: 'draft',
  published: 'published',
  deleted: 'deleted',
} as const

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]

export interface Post {
  id?: string
  title: string
  content: string
  tags: string[]
  slug?: string
  authorId: string
  status: PostStatus
  likeCount?: number
  commentCount?: number
  deletedAt?: number
}

export type NewPost = Pick<Post, 'id' | 'title' | 'content' | 'tags' | 'authorId' | 'status'>

export type PostUpdated = Pick<
  Post,
  'id' | 'title' | 'content' | 'tags' | 'authorId' | 'slug' | 'status'
>
