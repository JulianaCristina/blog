import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Tag } from '@/features/cms/tags/tags.types'
import type { RootState } from '@/app/store/store'

const initialState: Tag[] = []

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    tagAdded: (state, action: PayloadAction<Tag>) => {
      state.push(action.payload)
    },
    tagUpdated: (state, action) => {
      const tag = state.find((tag) => tag.id === action.payload.id)
      if (tag) {
        tag.name = action.payload.name
      }
    },
  },
})

export const { tagAdded, tagUpdated } = tagsSlice.actions
export const tagsReducer = tagsSlice.reducer

export const selectAllTags = (state: RootState) => state.tags

export const selectTagById = (state: RootState, tagId: string) => {
  return state.tags.find((tag) => tag.id === tagId)
}
