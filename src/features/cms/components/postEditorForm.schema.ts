import { z } from 'zod'
import { PostStatus } from '@/features/cms/posts/posts.types'

const splitTags = (value: string) =>
  value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

export const postEditorSchema = z.object({
  title: z.string().trim().min(3, 'Title must have at least 3 characters.'),
  authorId: z.string().trim().min(1, 'Author is required.'),
  content: z.string().trim().min(20, 'Content must have at least 20 characters.'),
  tags: z
    .string()
    .transform(splitTags)
    .refine((tags) => tags.length > 0, 'Add at least one tag.'),
  status: z.enum([PostStatus.draft, PostStatus.published]),
})

export type PostEditorFormValues = z.input<typeof postEditorSchema>
export type PostEditorFormData = z.output<typeof postEditorSchema>
