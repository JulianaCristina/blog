import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useNavigate, useParams } from 'react-router'
import { type NewPost, PostStatus } from '@/features/cms/posts/posts.types'
import { postAdded, postUpdated, selectPostById } from '@/features/cms/posts/postsSlices'
import {
  type PostEditorFormData,
  type PostEditorFormValues,
  postEditorSchema,
} from '@/features/cms/components/postEditorForm.schema'

const defaultValues: PostEditorFormValues = {
  title: '',
  authorId: '',
  content: '',
  tags: '',
  status: PostStatus.draft,
}

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const PostEditorPage = () => {
  const dispatch = useAppDispatch()
  const { postId } = useParams()
  const post = useAppSelector((state) => (postId ? selectPostById(state, postId) : undefined))
  const [saveMessage, setSaveMessage] = useState('')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostEditorFormValues, undefined, PostEditorFormData>({
    defaultValues,
    resolver: zodResolver(postEditorSchema),
  })

  const title = watch('title')
  const slugPreview = slugify(title)

  const onSubmit = handleSubmit((values) => {
    const payload: Omit<NewPost, 'id'> = {
      title: values.title,
      authorId: values.authorId,
      content: values.content,
      tags: values.tags,
      slug: slugify(values.title),
      status: values.status,
    }
    if (!!postId) {
      dispatch(postUpdated({ id: postId, ...payload }))
    } else {
      dispatch(postAdded({ ...payload, id: crypto.randomUUID() }))
    }

    reset(defaultValues)
    setSaveMessage(`Post "${payload.title}" saved.`)
    navigate('/cms/posts')
  })

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        authorId: post.authorId,
        content: post.content,
        tags: post.tags.join(','),
        status: post.status === PostStatus.published ? PostStatus.published : PostStatus.draft,
      })
    } else {
      reset(defaultValues)
    }
  }, [post, reset])

  return (
    <section className="mx-auto flex w-full flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Create a post</h1>
        <p className="text-sm text-muted-foreground">
          Draft the content here and save it to the local store.
        </p>
      </header>

      <form className="space-y-6 rounded-xl border bg-card p-6 shadow-sm" onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="A short title for the post"
              aria-invalid={Boolean(errors.title)}
              {...register('title')}
            />
            <FieldDescription>
              Slug preview:{' '}
              <span className="font-medium text-foreground">{slugPreview || 'post-title'}</span>
            </FieldDescription>
            <FieldError errors={[errors.title]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="authorId">Author</FieldLabel>
            <Input
              id="authorId"
              placeholder="author-123"
              aria-invalid={Boolean(errors.authorId)}
              {...register('authorId')}
            />
            <FieldError errors={[errors.authorId]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <select
              id="status"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              {...register('status')}
            >
              <option value={PostStatus.draft}>Draft</option>
              <option value={PostStatus.published}>Published</option>
            </select>
          </Field>

          <Field>
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <Input
              id="tags"
              placeholder="react, redux, frontend"
              aria-invalid={Boolean(errors.tags)}
              {...register('tags')}
            />
            <FieldDescription>Separate tags with commas.</FieldDescription>
            <FieldError errors={[errors.tags]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <Textarea
              id="content"
              className="min-h-48"
              placeholder="Write the post content"
              aria-invalid={Boolean(errors.content)}
              {...register('content')}
            />
            <FieldError errors={[errors.content]} />
          </Field>
        </FieldGroup>

        <div className="flex items-center justify-between gap-4">
          <Button type="submit" disabled={isSubmitting}>
            Save post
          </Button>
          {saveMessage ? <p className="text-sm text-muted-foreground">{saveMessage}</p> : null}
        </div>
      </form>
    </section>
  )
}
