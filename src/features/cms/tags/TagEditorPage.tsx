import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { selectTagById, tagAdded, tagUpdated } from '@/features/cms/tags/tagsSlice'
import { useEffect, useState } from 'react'

const tagsEditorSchema = z.object({
  name: z.string().trim().min(3, 'Tag name must have at least 3 characters.'),
})
type TagEditorFormValues = z.input<typeof tagsEditorSchema>
type TagEditorFormData = z.output<typeof tagsEditorSchema>

const defaultValues: TagEditorFormValues = {
  name: '',
}

export const TagEditorPage = () => {
  const { tagId } = useParams()
  const navigate = useNavigate()
  const tag = useAppSelector((state) => (tagId ? selectTagById(state, tagId) : undefined))
  const [saveMessage, setSaveMessage] = useState('')
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TagEditorFormValues, undefined, TagEditorFormData>({
    defaultValues,
    resolver: zodResolver(tagsEditorSchema),
  })

  const onSubmit = handleSubmit((values) => {
    if (!!tagId) {
      dispatch(tagUpdated({ id: tagId, ...values }))
    } else {
      dispatch(tagAdded({ ...values, id: crypto.randomUUID() }))
    }

    reset(defaultValues)
    setSaveMessage(`Tag "${values.name}" saved.`)

    navigate('/cms/tags')
  })

  useEffect(() => {
    if (tag) {
      reset({
        name: tag.name,
      })
    } else {
      reset(defaultValues)
    }
  }, [tag, reset])
  return (
    <section>
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              placeholder="react, redux, frontend"
              {...register('name')}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>
        </FieldGroup>
        <div className="mt-6 flex justify-end flex-col ">
          <Button type="submit" disabled={isSubmitting} className="self-end">
            Save Tag
          </Button>
          {saveMessage ? <p className="text-sm text-muted-foreground mt-4">{saveMessage}</p> : null}
        </div>
      </form>
    </section>
  )
}
